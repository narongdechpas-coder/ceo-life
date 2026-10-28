// ตรวจความถูกต้องของ src/data/cards.js — รัน: node tools/validate-cards.js
const D = require('../src/data/cards.js');

const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

const STAT_KEYS = ['cash', 'energy', 'health', 'rel', 'skills', 'stress', 'debt', 'portfolio', 'lp', 'impact', 'salary'];
const COST_KEYS = ['cash', 'energy'];
const REQ_KEYS = ['cash', 'health', 'rel', 'skills', 'portfolio'];
const ENGINE_ECHOES = ['E01']; // Burnout สอด E01 จาก engine
const echoIds = new Set(D.ECHOES.map(e => e.id));
const referenced = new Set(ENGINE_ECHOES);

function checkKeys(where, obj, allowed, label) {
  if (!obj) return;
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'ongoing' && label === 'gain') { checkKeys(`${where}.ongoing`, v, STAT_KEYS, 'ongoing'); continue; }
    if (!allowed.includes(k)) err(where, `${label} มี key ที่ไม่รู้จัก "${k}"`);
    else if (typeof v !== 'number' || !Number.isInteger(v)) err(where, `${label}.${k} ต้องเป็นจำนวนเต็ม`);
    else if (label === 'cost' && v < 0) err(where, `cost.${k} ต้องไม่ติดลบ`);
  }
}
function checkEffect(where, o) {
  checkKeys(where, o.cost, COST_KEYS, 'cost');
  checkKeys(where, o.gain, STAT_KEYS, 'gain');
  checkKeys(where, o.require, REQ_KEYS, 'require');
  if (o.echo) {
    referenced.add(o.echo.id);
    if (!echoIds.has(o.echo.id)) err(where, `อ้าง Echo ${o.echo.id} ที่ไม่มีอยู่`);
    if (o.echo.era !== '+1') err(where, `echo.era รองรับแค่ '+1'`);
  }
}
function uniq(list, name) {
  const seen = new Set();
  for (const x of list) { if (seen.has(x.id)) err(name, `id ซ้ำ ${x.id}`); seen.add(x.id); }
}
function count(list, n, name) { if (list.length !== n) err(name, `ต้องมี ${n} ใบ แต่มี ${list.length}`); }

count(D.CAREERS, 8, 'CAREERS'); count(D.GOALS, 8, 'GOALS'); count(D.PROJECTS, 12, 'PROJECTS');
count(D.EVENTS, 24, 'EVENTS'); count(D.ECHOES, 19, 'ECHOES'); count(D.OPPORTUNITIES, 12, 'OPPORTUNITIES');
[['CAREERS', D.CAREERS], ['GOALS', D.GOALS], ['PROJECTS', D.PROJECTS], ['EVENTS', D.EVENTS], ['ECHOES', D.ECHOES], ['OPPORTUNITIES', D.OPPORTUNITIES]]
  .forEach(([n, l]) => uniq(l, n));

for (const era of [1, 2, 3, 4]) {
  const c = D.EVENTS.filter(e => e.era === era).length;
  if (c !== 6) err('EVENTS', `ยุค ${era} มี ${c} ใบ ต้องมี 6`);
}

for (const c of D.CAREERS) {
  if (c.tiers.length !== 3) err(c.id, 'ต้องมี 3 ขั้น');
  c.tiers.forEach((t, i) => {
    checkKeys(`${c.id}.tier${i}`, t.require, REQ_KEYS, 'require');
    checkKeys(`${c.id}.tier${i}`, t.perRound, STAT_KEYS, 'perRound');
    if (i > 0 && !t.require) err(c.id, `ขั้น ${i + 1} ไม่มีเงื่อนไขเลื่อน`);
    if (i > 0 && t.salary <= c.tiers[i - 1].salary) err(c.id, `เงินเดือนขั้น ${i + 1} ไม่สูงกว่าขั้นก่อน`);
  });
}

for (const p of D.PROJECTS) {
  if (p.levels.length !== 3) err(p.id, 'ต้องมี 3 ขั้น');
  p.levels.forEach((lv, i) => {
    const w = `${p.id}.L${i + 1}`;
    checkEffect(w, lv);
    if (lv.outcomes.length !== 2) err(w, 'ต้องมี Outcome 2 ทาง');
    lv.outcomes.forEach((o, j) => checkEffect(`${w}.${'AB'[j]}`, o));
  });
}

for (const e of D.EVENTS) {
  if (e.options.length < 2) err(e.id, 'ต้องมีอย่างน้อย 2 ทางเลือก');
  // ต้องมีอย่างน้อย 1 ทางที่เลือกได้เสมอ (ไม่มี cost และ require)
  if (!e.options.some(o => !o.require && !Object.keys(o.cost || {}).length)) err(e.id, 'ไม่มีทางเลือกที่เลือกได้เสมอ');
  e.options.forEach((o, j) => checkEffect(`${e.id}.opt${j + 1}`, o));
}

for (const e of [...D.EVENTS, ...D.ECHOES]) if (!e.scene) err(e.id, 'ไม่มี scene สำหรับเล่าเรื่อง');

for (const e of D.ECHOES) {
  e.options.forEach((o, j) => checkEffect(`${e.id}.opt${j + 1}`, o));
  const fallback = e.options.some(o => !o.require && !Object.keys(o.cost || {}).length);
  if (!fallback) err(e.id, 'ไม่มีทางเลือกที่เลือกได้เสมอ');
  if (e.kind === 'bad') {
    if (!e.options.some(o => o.regret)) err(e.id, 'Echo ร้ายต้องมีทาง regret');
    if (!e.options.some(o => !o.regret)) err(e.id, 'Echo ร้ายต้องมีทางแก้ไข');
  } else if (e.options.some(o => o.regret)) err(e.id, 'Echo ดีไม่ควรมี regret');
}

D.OPPORTUNITIES.forEach(o => checkEffect(o.id, o));
D.ACTIONS.forEach(a => checkEffect(a.id, a));

for (const id of echoIds) if (!referenced.has(id)) err('ECHOES', `${id} ไม่มีการ์ดใดอ้างถึง`);

const sample = { cash: 10, portfolio: 8, debt: 0, health: 8, rel: 8, skills: 8, stress: 1, lp: 10, impactLp: 6,
  careerTier: 2, passive: 4, expenses: 4, completed: [{ tags: ['Family'] }, { tags: ['Travel'] }], oppAccepted: 3, burnouts: 0 };
for (const g of D.GOALS) {
  try {
    if (typeof g.checkFull(sample) !== 'boolean' || typeof g.checkPartial(sample) !== 'boolean') err(g.id, 'check ต้องคืนค่า boolean');
    if (!g.checkFull(sample)) err(g.id, 'สถานะตัวอย่างที่ควรผ่าน กลับไม่ผ่าน checkFull');
  } catch (e) { err(g.id, `check error: ${e.message}`); }
}

if (errors.length) { console.error(`พบ ${errors.length} ปัญหา\n` + errors.map(e => ' - ' + e).join('\n')); process.exit(1); }
console.log(`ผ่าน: Careers ${D.CAREERS.length} · Goals ${D.GOALS.length} · Projects ${D.PROJECTS.length} · Events ${D.EVENTS.length} · Echoes ${D.ECHOES.length} · Opportunities ${D.OPPORTUNITIES.length}`);
console.log(`Echo ที่ถูกอ้าง: ${[...referenced].sort().join(', ')}`);
