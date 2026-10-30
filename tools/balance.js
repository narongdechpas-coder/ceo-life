// Simulator สำหรับปรับสมดุล: bot 6 แบบเล่นด้วยกลยุทธ์ ไม่ใช่กดสุ่ม — รัน: node tools/balance.js [เกมต่ออาชีพ×เป้าหมาย] [ไฟล์รายงาน]
// ทุก bot เล่นชุด seed เดียวกัน และครบทุกคู่ อาชีพ × เป้าหมาย (8×8) จึงเทียบกันได้ตรงๆ
// bot มองล่วงหน้า 1 ก้าว: ลองทุกทางบนสำเนา state (engine เป็น JSON ล้วน) แล้วเลือกทางที่ค่าประเมินสูงสุด
const fs = require('fs');
const path = require('path');
const G = require('../src/game.js');

const K = Number(process.argv[2]) || 4;
const OUT = process.argv[3] || path.resolve(__dirname, '../docs/balance-report.md');
const clone = s => JSON.parse(JSON.stringify(s));

// ---------------------------------------------------------------- สุ่มแบบกำหนด seed ได้ (แยกจาก RNG ของเกม)
const mkRng = seed => () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);

// ---------------------------------------------------------------- ค่าประเมิน state
// ฐาน = คะแนนถ้าเกมจบตอนนี้ (G.score) + ส่วนเสริมที่มองอนาคต ให้ bot ไม่สายตาสั้นเกินไป
const has = (s, tag) => s.completed.some(c => c.tags.includes(tag));
function features(s) {
  const left = Math.max(0, G.ROUNDS - s.round + (s.phase === 'end' ? 0 : 1));
  const sc = G.score(s);
  const goalPts = sc.rows.find(r => r[0].startsWith('เป้าหมาย'))[1];
  const prog = Object.entries(s.projects).reduce((t, [, p]) => t + (p.level < 3 ? p.level : 0), 0);
  const fam = Object.entries(s.projects).filter(([id]) => G.PROJECT[id].tags.includes('Family')).reduce((t, [, p]) => t + p.level, 0);
  // ความคืบหน้าไปหาเป้าหมายที่เลือก (คนเล่นเก่งมองเห็นเส้นชัย bot ก็ควรเห็น)
  const lv = tag => Math.max(0, ...Object.entries(s.projects).filter(([id]) => G.PROJECT[id].tags.includes(tag)).map(([, p]) => p.level));
  const top2 = Object.values(s.projects).map(p => p.level).sort((a, b) => b - a).slice(0, 2).reduce((t, x) => t + x, 0);
  const goalProg = {
    G01: G.passive(s) * 2 - G.livingCost(s), G02: s.careerTier * 3 + s.skills, G03: s.health + s.rel - s.stress * 1.5,
    G04: top2 * 2, G05: s.rel + lv('Family') * 2, G06: Math.min(3, s.oppAccepted) * 3 + lv('Travel') * 2,
    G07: s.impactLp * 1.5, G08: s.health * 1.5 - s.burnouts * 10,
  }[s.goalId] || 0;
  return {
    left, total: sc.total, goalPts, base: sc.total - goalPts, goalProg,
    flow: (G.salary(s) + G.passive(s) - G.livingCost(s) - G.interest(s)) * left,
    passive: G.passive(s) * left, cash: s.cash, debt: s.debt, portfolio: s.portfolio,
    health: s.health, rel: s.rel, skills: s.skills, stress: s.stress, tier: s.careerTier, lp: s.lp, prog, fam,
    burnRisk: Math.max(0, s.stress - 4) ** 2, low: Math.max(0, 4 - s.health) ** 2 + Math.max(0, 3 - s.rel) ** 2,
  };
}
// น้ำหนักของแต่ละกลยุทธ์ (ทุกตัวสนใจคะแนนจริงเป็นหลัก ต่างกันที่สิ่งที่ให้ค่าเพิ่ม)
const BOTS = {
  random: null,
  workaholic: { total: .5, goalPts: 0, flow: .35, cash: .15, tier: 4, skills: .6, burnRisk: -.3, low: -.5 },
  balanced: { total: .8, goalPts: .2, flow: .12, health: 1.2, rel: 1.2, stress: -.8, burnRisk: -1.5, low: -2, prog: .4 },
  family: { total: .8, goalPts: .2, flow: .12, rel: 1.8, fam: 1.5, health: .4, burnRisk: -1, low: -2, prog: .3 },
  investor: { total: .7, goalPts: .2, flow: .3, passive: .5, portfolio: .25, cash: .05, burnRisk: -1, low: -1.5 },
  goalSeeker: { total: 1, goalPts: 1.2, goalProg: 1, flow: .15, prog: .9, skills: .3, burnRisk: -1, low: -1.5 },
};
const value = (s, w) => { const f = features(s); return Object.entries(w).reduce((t, [k, v]) => t + v * f[k], 0); };

// ---------------------------------------------------------------- ทางเลือกที่ทำได้ ณ ตอนนี้
function moves(s) {
  if (s.phase === 'event') {
    const card = G.currentCard(s).card;
    return card.options.map((o, i) => i).filter(i => !G.blocker(s, card.options[i].cost || {}, card.options[i].require))
      .map(i => ({ key: `opt:${i}`, run: x => G.chooseOption(x, i) }));
  }
  if (s.phase === 'opportunity') {
    const ok = s.oppChoices.filter(id => !G.blocker(s, G.OPP[id].cost || {}, G.OPP[id].require));
    return [...ok.map(id => ({ key: `opp:${id}`, run: x => G.takeOpportunity(x, id) })), { key: 'opp:skip', run: x => G.takeOpportunity(x, null) }];
  }
  const out = [{ key: 'end', run: x => G.endRound(x) }];
  for (const a of G.D.ACTIONS) {
    if (a.id === 'project' || G.actionStatus(s, a.id)) continue;
    if (a.id === 'invest') {
      for (const amt of new Set([2, Math.max(2, s.cash - 3), s.cash])) if (amt >= 2 && amt <= s.cash) out.push({ key: `act:invest`, run: x => G.doAction(x, 'invest', { amount: amt }) });
    } else if (a.id === 'repay') out.push({ key: 'act:repay', run: x => G.doAction(x, 'repay', { amount: Math.min(s.cash, s.debt) }) });
    else out.push({ key: `act:${a.id}`, run: x => G.doAction(x, a.id) });
  }
  for (const pid of [...s.market, ...Object.keys(s.projects)]) for (const o of [0, 1]) {
    if (!G.projectStatus(s, pid, o)) out.push({ key: `proj:${pid}:${(s.projects[pid] || { level: 0 }).level + 1}:${'AB'[o]}`, run: x => G.doAction(x, 'project', { id: pid, outcome: o }) });
  }
  return out;
}

// ประเมินหนึ่งทาง: ช่วงใช้เวลา ให้ดูผลหลังจบรอบด้วย (ค่าเสื่อม ความเครียด Burnout) ทางอื่นดูผลทันที
// ทุกทางต้องถูกวัดที่จุดเดียวกัน (หลังจบรอบ) ไม่งั้นทางที่พาไปหน้าเลือกโอกาสจะได้เปรียบเพราะยังไม่โดนค่าเสื่อม
function evaluate(s, m, w) {
  const x = clone(s);
  if (m.run(x)) return -Infinity;
  if (s.phase === 'actions' && x.phase === 'opportunity') {
    // สำรวจโอกาส: เลือกการ์ดที่ดีที่สุดให้เลย แล้วค่อยวัด
    const best = moves(x).map(o => ({ o, v: (() => { const y = clone(x); return o.run(y) ? -Infinity : value(y, w); })() })).sort((a, b) => b.v - a.v)[0];
    best.o.run(x);
  }
  if (s.phase === 'actions' && m.key !== 'end' && x.phase === 'actions') G.endRound(x);
  return value(x, w);
}

// ---------------------------------------------------------------- เล่นหนึ่งเกม
function play(bot, goalId, careerId, seed) {
  const s = G.newGame(seed);
  s.goalChoices = [goalId]; s.careerChoices = [careerId];
  G.chooseSetup(s, goalId, careerId);
  const rnd = mkRng(seed ^ 0x9e3779b9);
  const w = BOTS[bot];
  const log = { picks: [], acts: {}, maxDebt: 0, stuck: 0 };
  for (let step = 0; s.phase !== 'end'; step++) {
    if (step > 400) throw new Error(`${bot} ${goalId} ${careerId} ${seed}: ค้าง`);
    const ms = moves(s);
    if (s.phase === 'actions' && s.time > 0 && !ms.some(m => m.key !== 'end' && m.key !== 'act:rest')) log.stuck++;
    let pick;
    if (!w) pick = ms[Math.floor(rnd() * ms.length)];
    else {
      const scored = ms.map(m => ({ m, v: evaluate(s, m, w) })).sort((a, b) => b.v - a.v);
      // สุ่มเล็กน้อย: 10% เลือกอันดับสองถ้าห่างจากที่หนึ่งไม่มาก
      pick = scored.length > 1 && rnd() < .1 && scored[0].v - scored[1].v < 2 ? scored[1].m : scored[0].m;
    }
    const where = s.phase === 'event' ? `ev:${G.currentCard(s).card.id}` : '';
    const err = pick.run(s);
    if (err) throw new Error(`${bot}: ${pick.key} → ${err}`);
    if (where) log.picks.push(`${where}:${pick.key.split(':')[1]}`);
    if (pick.key.startsWith('proj:')) log.picks.push(pick.key);
    if (pick.key.startsWith('act:')) log.acts[pick.key.slice(4)] = (log.acts[pick.key.slice(4)] || 0) + 1;
    log.maxDebt = Math.max(log.maxDebt, s.debt);
  }
  return {
    bot, goalId, careerId, seed, total: s.final.total, tier: s.final.tier, goal: s.final.goal, crisis: s.gameOver === 'crisis',
    burnouts: s.burnouts, regrets: s.final.regrets, completed: s.completed.map(c => c.id), opp: s.oppAccepted,
    echoes: s.echoesPlanted, ...log,
  };
}

// ---------------------------------------------------------------- รัน
const t0 = Date.now();
const games = [];
for (const bot of Object.keys(BOTS)) {
  for (const g of G.D.GOALS) for (const c of G.D.CAREERS) for (let k = 0; k < K; k++) games.push(play(bot, g.id, c.id, 1000 + k * 7919));
  process.stderr.write(`${bot} ✓ `);
}
process.stderr.write(`\n${games.length} เกม ใน ${((Date.now() - t0) / 1000).toFixed(0)} วินาที\n`);

// ---------------------------------------------------------------- สรุป
const by = (list, key) => list.reduce((m, x) => ((m[x[key]] = m[x[key]] || []).push(x), m), {});
const q = (arr, p) => { const a = [...arr].sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.floor(p * a.length))]; };
const pct = (n, d) => `${d ? Math.round(n / d * 100) : 0}%`;
const mean = a => a.length ? a.reduce((t, x) => t + x, 0) / a.length : 0;
const f1 = x => x.toFixed(1);
const row = cells => `| ${cells.join(' | ')} |`;
const head = cols => [row(cols), row(cols.map(() => '---'))].join('\n');
const md = [];
const T = (title, cols, rows) => md.push(`\n### ${title}\n\n${head(cols)}\n${rows.map(row).join('\n')}`);

md.push(`# LIFE CEO — Balance report\n\nสร้างโดย \`node tools/balance.js ${K}\` · ${games.length} เกม (bot ${Object.keys(BOTS).length} แบบ × เป้าหมาย 8 × อาชีพ 8 × ${K} seed)\n\nbot ไม่ใช่คน: ตัวเลขนี้ใช้หาจุดที่ง่าย/ยากผิดปกติ และทางเลือกที่ดีกว่าทางอื่นทุกกรณี ส่วนความสนุกต้องวัดจากการเล่นจริง`);

const bots = by(games, 'bot');
T('1. ภาพรวมต่อกลยุทธ์', ['bot', 'คะแนน p10', 'p50', 'p90', 'เป้าหมายเต็ม', 'บางส่วน', 'Burnout/เกม', 'จบวิกฤต', 'Regret/เกม', 'หนี้สูงสุดเฉลี่ย', 'บทที่ไม่มีอะไรทำ/เกม'],
  Object.entries(bots).map(([b, l]) => [b, q(l.map(x => x.total), .1), q(l.map(x => x.total), .5), q(l.map(x => x.total), .9),
    pct(l.filter(x => x.goal === 'full').length, l.length), pct(l.filter(x => x.goal === 'partial').length, l.length),
    f1(mean(l.map(x => x.burnouts))), pct(l.filter(x => x.crisis).length, l.length), f1(mean(l.map(x => x.regrets))), f1(mean(l.map(x => x.maxDebt))), f1(mean(l.map(x => x.stuck)))]));

const smart = games.filter(x => x.bot !== 'random');
const seeker = bots.goalSeeker;
T('2. เป้าหมายชีวิต (bot ไล่เป้าหมาย / ทุก bot ที่มีกลยุทธ์)', ['เป้าหมาย', 'เต็ม (ไล่เป้า)', 'บางส่วน (ไล่เป้า)', 'เต็ม (ทุก bot)', 'คะแนน p50 (ไล่เป้า)'],
  G.D.GOALS.map(g => { const a = seeker.filter(x => x.goalId === g.id), b = smart.filter(x => x.goalId === g.id);
    return [`${g.id} ${g.name}`, pct(a.filter(x => x.goal === 'full').length, a.length), pct(a.filter(x => x.goal === 'partial').length, a.length), pct(b.filter(x => x.goal === 'full').length, b.length), q(a.map(x => x.total), .5)]; }));

const allMed = q(smart.map(x => x.total), .5);
T(`3. อาชีพ (ทุก bot ที่มีกลยุทธ์ · คะแนนกลางรวม ${allMed})`, ['อาชีพ', 'คะแนน p50', 'ต่างจากกลาง', 'เป้าหมายเต็ม', 'Burnout/เกม'],
  G.D.CAREERS.map(c => { const l = smart.filter(x => x.careerId === c.id); const m = q(l.map(x => x.total), .5);
    return [`${c.id} ${c.name}`, m, `${m - allMed >= 0 ? '+' : ''}${m - allMed}`, pct(l.filter(x => x.goal === 'full').length, l.length), f1(mean(l.map(x => x.burnouts)))]; }));

T('4. Life Project (ทุก bot ที่มีกลยุทธ์)', ['Project', 'เริ่ม', 'ทำครบ L3', 'อัตราจบ'],
  Object.values(G.PROJECT).map(p => { const started = smart.filter(x => x.picks.some(k => k.startsWith(`proj:${p.id}:1`))).length;
    const done = smart.filter(x => x.completed.includes(p.id)).length;
    return [`${p.id} ${p.name}`, pct(started, smart.length), pct(done, smart.length), pct(done, started)]; }));

// ทาง A/B ที่ bot มีกลยุทธ์เลือกข้างเดียวเกือบตลอด (≥90% จากอย่างน้อย 20 ครั้ง) = อาจเป็นทางที่ดีกว่าอีกทางทุกกรณี
const tally = {};
for (const x of smart) for (const k of x.picks) {
  const parts = k.split(':');
  const id = parts[0] === 'ev' ? parts[1] : `${parts[1]} L${parts[2]}`;
  const opt = parts[0] === 'ev' ? parts[2] : parts[3];
  (tally[id] = tally[id] || {})[opt] = (tally[id][opt] || 0) + 1;
}
const lopsided = Object.entries(tally).map(([id, c]) => { const n = Object.values(c).reduce((t, v) => t + v, 0); const [top, cnt] = Object.entries(c).sort((a, b) => b[1] - a[1])[0];
  return { id, n, top, share: cnt / n }; }).filter(x => x.n >= 20 && x.share >= .9).sort((a, b) => b.share - a.share);
const label = (id, opt) => {
  if (G.EVENT[id] || G.ECHO[id]) { const c = G.EVENT[id] || G.ECHO[id]; return `${id} ${c.title} → ${(c.options[opt] || {}).label}`; }
  const [pid, lv] = id.split(' L'); const p = G.PROJECT[pid]; return `${pid} ${p.name} L${lv} → ${opt} ${p.levels[lv - 1].outcomes['AB'.indexOf(opt)].label}`;
};
T('5. ทางเลือกที่ bot เลือกข้างเดียว ≥90% (ผู้สมัครเป็นทางที่ดีกว่าทุกกรณี)', ['ทางเลือก', 'ครั้ง', 'สัดส่วน'], lopsided.map(x => [label(x.id, x.top), x.n, pct(x.share * 100, 100)]));

const actKeys = [...new Set(smart.flatMap(x => Object.keys(x.acts)))];
T('6. กิจกรรมที่ใช้ต่อเกม (ค่าเฉลี่ย)', ['bot', ...actKeys], Object.entries(bots).filter(([b]) => b !== 'random').map(([b, l]) => [b, ...actKeys.map(k => f1(mean(l.map(x => x.acts[k] || 0))))]));

// ช่วงคะแนนที่เสนอ: percentile ของ bot ไล่เป้าหมาย
const st = seeker.map(x => x.total);
const tiers = [['Life CEO', q(st, .9)], ['Strategic Life', q(st, .65)], ['In Transition', q(st, .35)], ['Overextended', q(st, .1)]];
md.push(`\n### 7. ช่วงคะแนนที่เสนอ (จาก percentile ของ bot ไล่เป้าหมาย)\n\n${head(['ระดับ', 'คะแนนตั้งแต่', 'ปัจจุบัน'])}\n${tiers.map((t, i) => row([t[0], t[1], [45, 35, 25, 15][i]])).join('\n')}\n| Reset & Rebuild | ต่ำกว่า ${tiers[3][1]} | ต่ำกว่า 15 |`);
md.push(`\nการกระจายระดับตอนนี้ (bot ไล่เป้าหมาย): ${Object.entries(by(seeker, 'tier')).map(([k, l]) => `${k} ${pct(l.length, seeker.length)}`).join(' · ')}`);

fs.writeFileSync(OUT, md.join('\n') + '\n');
console.log(md.slice(1, 4).join('\n'));
console.log(`\nรายงานเต็ม: ${OUT}`);
