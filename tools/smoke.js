// เล่นสุ่มหลายเกมเพื่อหาบั๊กของ engine — รัน: node tools/smoke.js [จำนวนเกม]
const G = require('../src/game.js');

const N = Number(process.argv[2]) || 2000;
let rng = 12345;
const r = () => ((rng = (rng * 1103515245 + 12345) >>> 0) / 4294967296);
const pick = a => a[Math.floor(r() * a.length)];

function invariants(s, where) {
  const bad = [];
  if (s.cash < 0) bad.push('cash < 0');
  if (s.energy < 0) bad.push('energy < 0');
  if (s.time < 0) bad.push('time < 0');
  for (const k of ['health', 'rel', 'skills', 'stress']) if (s[k] < 0 || s[k] > 10) bad.push(`${k} = ${s[k]}`);
  if (s.debt < 0 || s.portfolio < 0) bad.push('debt/portfolio < 0');
  if (bad.length) throw new Error(`${where}: ${bad.join(', ')}`);
}

const stats = { complete: 0, crisis: 0, totals: [], burnouts: 0, regrets: 0, echoes: 0, completedProjects: 0, goalFull: 0 };
for (let g = 0; g < N; g++) {
  const s = G.newGame(1000 + g);
  G.chooseSetup(s, pick(s.goalChoices), pick(s.careerChoices));
  let steps = 0;
  while (s.phase !== 'end') {
    if (++steps > 500) throw new Error(`เกม ${g} ค้าง phase=${s.phase} round=${s.round}`);
    if (s.phase === 'event') {
      const { card } = G.currentCard(s);
      const ok = card.options.map((o, i) => i).filter(i => !G.blocker(s, card.options[i].cost || {}, card.options[i].require));
      if (!ok.length) throw new Error(`เกม ${g}: ${card.id} ไม่มีทางเลือกที่เลือกได้`);
      const err = G.chooseOption(s, pick(ok)); if (err) throw new Error(err);
    } else if (s.phase === 'opportunity') {
      const ok = s.oppChoices.filter(id => !G.blocker(s, G.OPP[id].cost || {}, G.OPP[id].require));
      const err = G.takeOpportunity(s, r() < 0.6 && ok.length ? pick(ok) : null); if (err) throw new Error(err);
    } else if (s.phase === 'actions') {
      const moves = [];
      for (const a of G.D.ACTIONS) if (a.id !== 'project' && !G.actionStatus(s, a.id)) moves.push(['a', a.id]);
      for (const pid of [...s.market, ...Object.keys(s.projects)]) for (const o of [0, 1]) if (!G.projectStatus(s, pid, o)) moves.push(['p', pid, o]);
      if (!moves.length || r() < 0.08) { G.endRound(s); continue; }
      const m = pick(moves);
      const err = m[0] === 'p' ? G.doAction(s, 'project', { id: m[1], outcome: m[2] })
        : G.doAction(s, m[1], { amount: m[1] === 'repay' ? Math.min(s.cash, s.debt) : 2 });
      if (err) throw new Error(`เกม ${g}: ${m.join(' ')} → ${err}`);
    }
    invariants(s, `เกม ${g} รอบ ${s.round}`);
  }
  stats[s.gameOver] += 1;
  stats.totals.push(s.final.total);
  stats.burnouts += s.burnouts; stats.regrets += s.final.regrets; stats.echoes += s.echoesPlanted;
  stats.completedProjects += s.completed.length; stats.goalFull += s.final.goal === 'full' ? 1 : 0;
}

const t = stats.totals.sort((a, b) => a - b);
const avg = x => (x / N).toFixed(2);
console.log(`ผ่าน ${N} เกม ไม่มี error หรือเกมค้าง`);
console.log(`จบครบ 8 รอบ ${stats.complete} · จบด้วยวิกฤต ${stats.crisis}`);
console.log(`คะแนน (ผู้เล่นสุ่ม) min ${t[0]} · median ${t[Math.floor(N / 2)]} · max ${t[N - 1]}`);
console.log(`เฉลี่ยต่อเกม: Burnout ${avg(stats.burnouts)} · Regret ${avg(stats.regrets)} · Echo ${avg(stats.echoes)} · โปรเจกต์ครบ ${avg(stats.completedProjects)} · บรรลุเป้าหมาย ${(stats.goalFull / N * 100).toFixed(1)}%`);
