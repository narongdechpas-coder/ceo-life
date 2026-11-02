// ทดสอบกลไกของโหมดเสริม (กะลาแลนด์) ทีละข้อ — รัน: node tools/mode-test.js
const G = require('../src/game.js');
const results = [];
const check = (name, ok, detail) => results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail != null ? ' — ' + detail : ''}`);
const clone = s => JSON.parse(JSON.stringify(s));

// เริ่มเกมโหมดกะลาแบบกำหนดเหตุการณ์และปิดการ์ดเคราะห์ได้ เพื่อทดสอบทีละเรื่อง
function start(seed = 1, setup) {
  const s = G.newGame(seed, 'kala');
  G.chooseSetup(s, s.goalChoices[0], s.careerChoices[0], 'ทดสอบ');
  if (setup) setup(s);
  return s;
}
// เล่นการ์ดที่ค้างอยู่ด้วยทางแรกที่เลือกได้ แล้วจบรอบ
function finishRound(s) {
  while (s.phase === 'event') { const c = G.currentCard(s).card; G.chooseOption(s, c.options.findIndex(o => !G.blocker(s, o.cost || {}, o.require))); }
  if (s.phase === 'actions') G.endRound(s);
}
const pendingIds = s => s.pending.map(p => `${p.kind}:${p.id}`);

// 1) โหมดถูกเก็บใน state และกองเหตุการณ์เป็นของกะลาแลนด์
{
  const s = start(3);
  check('mode stored', s.mode === 'kala');
  check('event decks use Kalaland events', Object.values(s.eventDecks).flat().concat(s.pending.map(p => p.id)).filter(id => id.startsWith('K-E')).length >= 8);
  check('base game still base', G.newGame(3).mode === 'base' && G.newGame(3, 'nope').mode === 'base');
}

// 2) การ์ดเคราะห์: มาก่อนทุกใบ มีทางเดียว ทำอย่างอื่นก่อนไม่ได้
{
  let found = null;
  for (let seed = 1; seed < 200 && !found; seed++) { const s = start(seed); if (s.pending[0].kind === 'incident') found = s; }
  check('incident drawn at start of a round', !!found);
  if (found) {
    const { kind, card } = G.currentCard(found);
    check('incident is the first card', kind === 'incident');
    check('incident has exactly one option', card.options.length === 1 && card.options[0].label === 'รับกรรม');
    check('cannot act before accepting fate', !!G.doAction(found, 'rest'));
    check('cannot end round before accepting fate', !!G.endRound(found));
    check('accept works', G.chooseOption(found, 0) === null && found.story.some(e => e.kind === 'incident'));
  }
  // อัตราเกิดใกล้ 50%
  let n = 0, hit = 0;
  for (let seed = 1; seed <= 400; seed++) { const s = start(seed); n++; if (s.pending[0].kind === 'incident') hit++; }
  check('incident rate about 50%', hit / n > 0.4 && hit / n < 0.6, `${Math.round(hit / n * 100)}%`);
}

// 3) โซ่ซวยซ้ำซ้อน: เลือกพรรคไฮโซ → K-X03 บทถัดไป → K-X03b บทถัดไปอีก
{
  const s = start(5, x => { x.pending = [{ kind: 'event', id: 'K-E05' }]; });
  G.chooseOption(s, 1);
  G.endRound(s);
  check('chain step 1 arrives next round', pendingIds(s).includes('echo:K-X03'), pendingIds(s).join(' '));
  while (G.currentCard(s).card.id !== 'K-X03') G.chooseOption(s, 0);
  G.chooseOption(s, 0);
  finishRound(s);
  check('chain step 2 arrives the round after', pendingIds(s).includes('echo:K-X03b'), pendingIds(s).join(' '));
}
// วิจารณ์รัฐ → โดนฟ้องบทถัดไป
{
  const s = start(7, x => { x.round = 5; x.pending = [{ kind: 'event', id: 'K-E12' }]; });
  G.chooseOption(s, 1);
  G.endRound(s);
  check('criticize → lawsuit next round', pendingIds(s).includes('echo:K-X08'), pendingIds(s).join(' '));
}
// Echo ที่ฝังในบทสุดท้ายและไม่ได้แก้ นับเป็น Regret
{
  const s = start(8, x => { x.round = 8; x.pending = [{ kind: 'event', id: 'K-E12' }]; });
  G.chooseOption(s, 1);
  const before = G.score(s).regrets;
  check('unresolved delayed bad echo counts as regret', before >= 1, before);
}

// 4) กติกาเสริม
{
  const s = start(9);
  s.pending = [];
  s.phase = 'actions';
  const e1 = s.expenses;
  G.endRound(s); finishRound(s); // ไปบท 3 = ยุค II
  check('inflation +1 entering era II', s.round === 3 && s.expenses === e1 + 1, `${e1} → ${s.expenses}`);
  check('parents support counted in living cost from era II', G.livingCost(s) === s.expenses + 1, `${G.livingCost(s)} vs ${s.expenses}`);
  const t = clone(s); t.debt = 6;
  check('interest every 3 in Kalaland', G.interest(t) === 2);
  const b = G.newGame(9); b.debt = 6;
  check('interest every 4 in base', G.interest(b) === 2 && (b.debt = 5, G.interest(b) === 2) && (b.debt = 4, G.interest(b) === 1));
}

// 5) ทางรอด: มีประกันแล้วเคราะห์เบาลง
{
  const s = start(11, x => { x.pending = [{ kind: 'incident', id: 'K-I02' }]; x.cash = 10; });
  const a = clone(s);
  G.chooseOption(a, 0);
  const b = clone(s); b.marks.insured = true;
  G.chooseOption(b, 0);
  check('insurance softens hit-and-run', 10 - a.cash === 3 && 10 - b.cash === 1, `ไม่มีประกัน −${10 - a.cash} · มีประกัน −${10 - b.cash}`);
  check('soft result noted in story', b.story.some(e => e.kind === 'incident' && e.soft));
  // ซื้อประกันจากเหตุการณ์ได้ป้าย insured และจ่ายรายบท 3 บทแล้วหยุด
  const c = start(12, x => { x.pending = [{ kind: 'event', id: 'K-E04' }]; });
  G.chooseOption(c, 0);
  check('buying insurance sets mark', !!c.marks.insured);
  const cost0 = G.livingCost(c);
  let rounds = 0;
  while (c.ongoing.some(o => o.gain.rounds != null) && rounds < 6) { finishRound(c); rounds++; }
  check('timed ongoing expires after 3 rounds', rounds === 3, `${rounds} บท (ค่าใช้จ่ายตอนซื้อ ${cost0})`);
}

// 6) เสียเวลา / เลื่อนตำแหน่งทันที / ค่าครองชีพถาวร
{
  const s = start(13, x => { x.pending = [{ kind: 'incident', id: 'K-I05' }]; });
  G.chooseOption(s, 0);
  check('lost time slot', s.time === 3);
  const p = start(14, x => { x.pending = [{ kind: 'event', id: 'K-E13' }]; x.cash = 10; });
  const tier0 = p.careerTier;
  G.chooseOption(p, 0);
  check('bought chair promotes immediately', p.careerTier === tier0 + 1);
  const q = start(15, x => { x.pending = [{ kind: 'event', id: 'K-E09' }]; });
  const e0 = q.expenses;
  G.chooseOption(q, 1);
  check('handout policy raises cost of living', q.expenses === e0 + 1);
}

// 7) Echo แบบมีโอกาส (ถูกหวย) เกิดประมาณ 10%
{
  let hit = 0;
  for (let seed = 1; seed <= 600; seed++) {
    const s = start(seed, x => { x.pending = [{ kind: 'event', id: 'K-E01' }]; x.cash = 5; });
    G.chooseOption(s, 2);
    if (Object.values(s.echoQueue).flat().includes('K-X09')) hit++;
  }
  check('lottery echo about 10%', hit > 30 && hit < 90, `${hit}/600`);
}

// 8) เซฟเก่า (ไม่มี mode / marks) เล่นต่อได้เป็นโหมดปกติ
{
  const s = G.newGame(21);
  delete s.mode; delete s.marks; delete s.incidentDeck;
  G.migrate(s);
  check('old save migrates to base', s.mode === 'base' && typeof s.marks === 'object');
  G.chooseSetup(s, s.goalChoices[0], s.careerChoices[0]);
  check('old save plays a round', (finishRound(s), s.round === 2));
}

// 9) quip ถูกเก็บไว้เล่าเรื่อง
{
  const s = start(31, x => { x.pending = [{ kind: 'event', id: 'K-E15' }]; });
  G.chooseOption(s, 0);
  check('quip stored for the story', s.lastQuip === 'เกิดมาจนก็ต้องต่อคิวนะจ๊ะ' && s.story.at(-1).quip === s.lastQuip);
}

console.log(results.join('\n'));
process.exit(results.some(r => r.startsWith('FAIL')) ? 1 : 0);
