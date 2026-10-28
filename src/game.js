/*
 * LIFE CEO — Game Engine v0.2
 * state เป็น JSON ล้วน (เซฟลง localStorage และใช้ใน simulator ได้)
 * ทุกฟังก์ชันที่เปลี่ยน state ส่ง error เป็น string กลับมาถ้าทำไม่ได้ และไม่แตะ state
 */
(function (root) {
  const D = (typeof module !== 'undefined' && module.exports) ? require('./data/cards.js') : root.LIFE_CEO_DATA;

  const byId = list => Object.fromEntries(list.map(x => [x.id, x]));
  const CAREER = byId(D.CAREERS), GOAL = byId(D.GOALS), PROJECT = byId(D.PROJECTS);
  const EVENT = byId(D.EVENTS), ECHO = byId(D.ECHOES), OPP = byId(D.OPPORTUNITIES);
  const ROUNDS = 8;
  const CLAMP10 = ['health', 'rel', 'skills', 'stress'];

  // ---------------------------------------------------------------- RNG (mulberry32 เก็บใน state)
  function rand(s) {
    let t = s.rng = (s.rng + 0x6D2B79F5) >>> 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function shuffle(s, arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand(s) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  // ---------------------------------------------------------------- ค่าที่คำนวณจาก state
  const eraOf = round => Math.min(4, Math.ceil(round / 2));
  const era = s => D.ERAS[eraOf(s.round) - 1];
  const career = s => CAREER[s.careerId];
  const tier = s => career(s).tiers[s.careerTier];
  const perk = (s, key) => (career(s).perk || {})[key] || 0;

  function energyCap(s) {
    return Math.max(1, era(s).energyCap - Math.floor(s.stress / 3) - (s.health <= 3 ? 1 : 0));
  }
  const salary = s => Math.max(0, tier(s).salary + s.salaryMod);
  const portfolioYield = s => Math.floor(s.portfolio / 4);
  const pension = s => (eraOf(s.round) === 4 ? perk(s, 'pensionEraIV') : 0);
  const ongoingCash = (s, sign) => s.ongoing.reduce((t, o) => {
    const c = (o.gain.cash || 0); return t + (sign > 0 ? Math.max(0, c) : Math.max(0, -c));
  }, 0);
  const passive = s => portfolioYield(s) + pension(s) + ongoingCash(s, +1);
  const obligations = s => ongoingCash(s, -1);
  const livingCost = s => s.expenses + obligations(s);
  const interest = s => Math.ceil(s.debt / 4);

  function meets(s, req) {
    return !req || Object.entries(req).every(([k, v]) => (s[k] || 0) >= v);
  }
  function sumCost(...costs) {
    const out = {};
    for (const c of costs) for (const [k, v] of Object.entries(c || {})) out[k] = (out[k] || 0) + v;
    return out;
  }
  function canPay(s, cost) {
    return (s.cash >= (cost.cash || 0)) && (s.energy >= (cost.energy || 0));
  }
  // เหตุผลที่ทำไม่ได้ (null = ทำได้)
  function blocker(s, cost, req) {
    if (req && !meets(s, req)) return 'ไม่ผ่านเงื่อนไข';
    if ((cost.cash || 0) > s.cash) return '🪙 ไม่พอ';
    if ((cost.energy || 0) > s.energy) return '⚡ ไม่พอ';
    return null;
  }

  // ---------------------------------------------------------------- log
  function log(s, text, tone) { s.log.push({ round: s.round, text, tone: tone || 'info' }); }

  // ---------------------------------------------------------------- ผลของการ์ด
  function payCost(s, cost) {
    s.cash -= cost.cash || 0;
    s.energy -= cost.energy || 0;
  }
  // จ่ายภาระ ถ้าไม่พอส่วนที่ขาดกลายเป็นหนี้
  function payBill(s, amount, what) {
    if (amount <= 0) return;
    if (s.cash >= amount) { s.cash -= amount; return; }
    const short = amount - s.cash;
    s.cash = 0;
    s.debt += short;
    s.stress = Math.min(10, s.stress + 1);
    log(s, `เงินไม่พอจ่าย${what} ขาด ${short} กลายเป็นหนี้ 🔗 และ 💢 +1`, 'bad');
  }
  function applyGain(s, gain, src) {
    for (const [k, v] of Object.entries(gain || {})) {
      if (k === 'ongoing') { s.ongoing.push({ src, gain: { ...v } }); continue; }
      if (k === 'cash') { if (v < 0) payBill(s, -v, ''); else s.cash += v; continue; }
      if (k === 'impact') { s.lp += v; s.impactLp += v; continue; }
      if (k === 'salary') { s.salaryMod += v; continue; }
      if (k === 'energy') { s.energy = Math.max(0, s.energy + v); continue; }
      if (k === 'debt' || k === 'portfolio') { s[k] = Math.max(0, s[k] + v); continue; }
      if (CLAMP10.includes(k)) { s[k] = Math.min(10, Math.max(0, s[k] + v)); continue; }
      s[k] += v; // lp
    }
  }
  // ctx = ข้อความสั้นว่าผลนี้มาจากการตัดสินใจไหน (ใช้เล่าเรื่องตอนจบเกม)
  function applyOutcome(s, o, src, ctx) {
    if (o.clearOngoing) s.ongoing = s.ongoing.filter(x => x.src !== src);
    applyGain(s, o.gain, src);
    if (o.echo) plantEcho(s, o.echo.id, ctx);
  }
  function plantEcho(s, id, ctx) {
    const target = Math.min(4, eraOf(s.round) + 1);
    s.echoQueue[target].push(id);
    s.echoesPlanted += 1;
    (s.echoLinks = s.echoLinks || []).push({ id, planted: s.round, from: ctx || '', resolved: null });
    log(s, `มีผลสะท้อนบางอย่างรออยู่ในยุค ${target}`, 'echo');
  }
  // บันทึกเรื่องราวแบบมีโครงสร้าง สำหรับหน้าสรุปชีวิต
  function story(s, entry) { (s.story = s.story || []).push({ round: s.round, ...entry }); }
  function snapshot(s) {
    (s.snaps = s.snaps || []).push({ round: s.round, cash: s.cash, portfolio: s.portfolio, debt: s.debt, health: s.health, rel: s.rel,
      skills: s.skills, stress: s.stress, lp: s.lp, tier: s.careerTier, passive: passive(s), cost: livingCost(s) });
  }

  // ---------------------------------------------------------------- save เก่า
  // เติมช่องที่เวอร์ชันหลังเพิ่มเข้ามา ให้เกมที่เซฟไว้ก่อนอัปเดตเล่นต่อได้
  function migrate(s) {
    if (!s || typeof s !== 'object') return s;
    for (const k of ['story', 'echoLinks', 'snaps', 'log', 'pending', 'oppChoices', 'completed', 'ongoing']) if (!Array.isArray(s[k])) s[k] = [];
    if (!s.flags) s.flags = { advanced: [] };
    if (!Array.isArray(s.flags.advanced)) s.flags.advanced = [];
    if (!s.echoQueue) s.echoQueue = { 1: [], 2: [], 3: [], 4: [] };
    if (typeof s.impactLp !== 'number') s.impactLp = 0;
    return s;
  }

  // ---------------------------------------------------------------- เริ่มเกม
  function newGame(seed) {
    const s = {
      v: 2, seed: seed >>> 0, rng: seed >>> 0, round: 1, phase: 'setup',
      ...D.START, energy: 0, impactLp: 0, salaryMod: 0, ongoing: [],
      careerId: null, careerTier: 0, goalId: null,
      projects: {}, completed: [], market: [], projectDeck: [],
      eventDecks: {}, echoQueue: { 1: [], 2: [], 3: [], 4: [] }, echoesPlanted: 0,
      oppDeck: [], oppChoices: [], oppAccepted: 0,
      pending: [], flags: {}, crisis: false, burnouts: 0, regrets: 0,
      gameOver: null, log: [], story: [], echoLinks: [], snaps: [],
    };
    s.goalChoices = shuffle(s, D.GOALS.map(g => g.id)).slice(0, 3);
    s.careerChoices = shuffle(s, D.CAREERS.map(c => c.id)).slice(0, 3);
    s.projectDeck = shuffle(s, D.PROJECTS.map(p => p.id));
    s.market = s.projectDeck.splice(0, 3);
    for (const e of [1, 2, 3, 4]) s.eventDecks[e] = shuffle(s, D.EVENTS.filter(v => v.era === e).map(v => v.id));
    s.oppDeck = shuffle(s, D.OPPORTUNITIES.map(o => o.id));
    return s;
  }

  function chooseSetup(s, goalId, careerId) {
    if (s.phase !== 'setup') return 'ไม่ได้อยู่ในช่วงเตรียมเกม';
    if (!s.goalChoices.includes(goalId) || !s.careerChoices.includes(careerId)) return 'ตัวเลือกไม่ถูกต้อง';
    s.goalId = goalId; s.careerId = careerId;
    log(s, `เริ่มชีวิตในอาชีพ${CAREER[careerId].name} ตั้งเป้าหมาย "${GOAL[goalId].name}"`, 'key');
    snapshot(s);
    startRound(s);
    return null;
  }

  // ---------------------------------------------------------------- รอบ
  function startRound(s) {
    const e = era(s);
    const firstOfEra = e.rounds[0] === s.round;
    if (firstOfEra) log(s, `— ยุค ${e.id} ${e.name} (อายุ ${e.age}) —`, 'era');
    s.flags = { advanced: [] };
    s.time = s.crisis ? D.START.time - 1 : D.START.time;
    // 1 บทใหม่
    s.energy = energyCap(s);
    // 2 รายได้และภาระ
    const income = salary(s) + passive(s);
    s.cash += income;
    for (const o of s.ongoing) {
      const { cash, ...rest } = o.gain;
      applyGain(s, rest, o.src);
    }
    if (tier(s).perRound) applyGain(s, tier(s).perRound, 'career');
    payBill(s, livingCost(s) + interest(s), 'ค่าใช้จ่าย');
    log(s, `รายรับ ${income} · จ่าย ${livingCost(s)}${interest(s) ? ` + ดอกเบี้ย ${interest(s)}` : ''}`);
    // 3 เหตุการณ์: Echo ที่ถึงคิวก่อน แล้วตามด้วยเหตุการณ์ของยุค
    const q = s.echoQueue[e.id];
    const take = firstOfEra ? Math.ceil(q.length / 2) : q.length;
    const due = shuffle(s, q).slice(0, take);
    for (const id of due) q.splice(q.indexOf(id), 1);
    s.pending = due.map(id => ({ kind: 'echo', id }));
    s.pending.push({ kind: 'event', id: s.eventDecks[e.id].pop() });
    s.phase = 'event';
  }

  function currentCard(s) {
    const p = s.pending[0];
    if (!p) return null;
    return { kind: p.kind, card: p.kind === 'echo' ? ECHO[p.id] : EVENT[p.id] };
  }

  function chooseOption(s, idx) {
    if (s.phase !== 'event') return 'ไม่ได้อยู่ในช่วงเหตุการณ์';
    const { kind, card } = currentCard(s);
    const o = card.options[idx];
    if (!o) return 'ไม่มีทางเลือกนี้';
    const why = blocker(s, o.cost || {}, o.require);
    if (why) return why;
    payCost(s, o.cost || {});
    applyOutcome(s, o, card.id, `“${card.title}” แล้วเลือก${o.label}`);
    if (kind === 'echo' && o.regret) s.regrets += 1;
    if (kind === 'echo') {
      const link = (s.echoLinks || []).find(l => l.id === card.id && !l.resolved);
      if (link) link.resolved = { round: s.round, label: o.label, regret: !!o.regret };
      story(s, { kind: 'echo', id: card.id, good: card.kind === 'good', title: card.title, label: o.label, regret: !!o.regret, from: link ? link.from : '', planted: link ? link.planted : null });
    } else story(s, { kind: 'event', title: card.title, label: o.label, echo: !!o.echo });
    log(s, `${kind === 'echo' ? 'Echo' : 'เหตุการณ์'} "${card.title}" → ${o.label}`, kind === 'echo' ? (card.kind === 'good' ? 'good' : (o.regret ? 'bad' : 'key')) : 'key');
    s.pending.shift();
    if (!s.pending.length) s.phase = 'actions';
    return null;
  }

  // ---------------------------------------------------------------- กิจกรรม
  function actionCost(s, id) {
    if (id === 'learn') return { energy: 1, cash: Math.max(0, 2 - perk(s, 'learnDiscount')) };
    if (id === 'relate') return { energy: 1, cash: perk(s, 'relFree') ? 0 : 1 };
    const a = D.ACTIONS.find(x => x.id === id);
    return { ...(a.cost || {}) };
  }

  // สถานะของกิจกรรมพื้นฐาน (ไม่รวมโปรเจกต์) สำหรับ UI และ simulator
  function actionStatus(s, id) {
    if (s.phase !== 'actions') return 'ไม่ได้อยู่ในช่วงใช้เวลา';
    if (s.time <= 0) return 'หมดเวลาในรอบนี้';
    const cost = actionCost(s, id);
    if (id === 'promote') {
      if (s.flags.promote) return 'ขอเลื่อนได้รอบละครั้ง';
      const next = career(s).tiers[s.careerTier + 1];
      if (!next) return 'อยู่ขั้นสูงสุดแล้ว';
      if (!meets(s, next.require)) return 'ยังไม่ผ่านเงื่อนไข';
    }
    if (id === 'invest' && s.cash < 2) return 'ต้องมี 🪙 อย่างน้อย 2';
    if (id === 'repay' && (s.debt <= 0 || s.cash <= 0)) return s.debt <= 0 ? 'ไม่มีหนี้' : '🪙 ไม่พอ';
    return blocker(s, cost);
  }

  function doAction(s, id, arg) {
    if (id === 'project') return advanceProject(s, arg && arg.id, arg && arg.outcome);
    const why = actionStatus(s, id);
    if (why) return why;
    const cost = actionCost(s, id);
    if (id === 'invest' || id === 'repay') {
      const max = id === 'invest' ? s.cash : Math.min(s.cash, s.debt);
      const amt = Math.floor(Number(arg && arg.amount));
      if (!(amt >= (id === 'invest' ? 2 : 1) && amt <= max)) return 'จำนวนไม่ถูกต้อง';
      s.cash -= amt;
      if (id === 'invest') { s.portfolio += amt; log(s, `ลงทุน ${amt} 🪙 เข้า 📈`); }
      else { s.debt -= amt; log(s, `ชำระหนี้ ${amt}`); }
    } else {
      payCost(s, cost);
      switch (id) {
        case 'overtime': applyGain(s, { cash: 3 + perk(s, 'overtimeBonus'), stress: 1 }); break;
        case 'learn': applyGain(s, { skills: 1 }); break;
        case 'exercise': applyGain(s, { health: 1, stress: -1 }); break;
        case 'relate': applyGain(s, { rel: 1, stress: -1 }); break;
        case 'rest': applyGain(s, { stress: -2 }); break;
        case 'promote': {
          s.careerTier += 1; s.expenses += 1;
          log(s, `เลื่อนเป็น ${tier(s).name} เงินเดือน ${tier(s).salary} เริ่มรอบหน้า ค่าครองชีพ +1`, 'key');
          story(s, { kind: 'promote', title: tier(s).name, salary: tier(s).salary });
          break;
        }
        case 'explore': {
          const n = 2 + perk(s, 'extraOpportunity');
          if (s.oppDeck.length < n) s.oppDeck = shuffle(s, D.OPPORTUNITIES.map(o => o.id));
          s.oppChoices = s.oppDeck.splice(0, n);
          s.phase = 'opportunity';
          break;
        }
        default: return 'ไม่รู้จักกิจกรรมนี้';
      }
    }
    s.flags[id] = true;
    s.time -= 1;
    return null;
  }

  function projectStatus(s, pid, outIdx) {
    if (s.phase !== 'actions') return 'ไม่ได้อยู่ในช่วงใช้เวลา';
    if (s.time <= 0) return 'หมดเวลาในรอบนี้';
    const p = PROJECT[pid];
    if (!p) return 'ไม่มีโปรเจกต์นี้';
    const level = s.projects[pid] ? s.projects[pid].level : 0;
    if (!s.projects[pid] && !s.market.includes(pid)) return 'โปรเจกต์นี้ไม่อยู่ในตลาด';
    if (level >= 3) return 'ทำครบแล้ว';
    if (s.flags.advanced.includes(pid)) return 'ทำได้ 1 ขั้นต่อรอบ';
    const lv = p.levels[level];
    const o = lv.outcomes[outIdx];
    if (!o) return 'ไม่มีทางเลือกนี้';
    return blocker(s, sumCost(lv.cost, o.cost), sumCost(lv.require, o.require));
  }

  function advanceProject(s, pid, outIdx) {
    const why = projectStatus(s, pid, outIdx);
    if (why) return why;
    const p = PROJECT[pid];
    if (!s.projects[pid]) {
      s.projects[pid] = { level: 0, choices: [] };
      s.market.splice(s.market.indexOf(pid), 1);
      if (s.projectDeck.length) s.market.push(s.projectDeck.shift());
    }
    const prog = s.projects[pid];
    const lv = p.levels[prog.level];
    const o = lv.outcomes[outIdx];
    payCost(s, sumCost(lv.cost, o.cost));
    applyGain(s, lv.gain, pid);
    applyOutcome(s, o, pid, `${p.name}: ${o.label}`);
    prog.level += 1;
    story(s, { kind: 'project', id: pid, name: p.name, level: prog.level, step: lv.name, label: o.label,
      ongoing: (o.gain && o.gain.ongoing) || null, echo: !!o.echo, done: prog.level === 3 });
    prog.choices.push(outIdx);
    s.flags.advanced.push(pid);
    s.time -= 1;
    log(s, `${p.name} L${prog.level} ${lv.name} → ${o.label}`, 'key');
    if (prog.level === 3) {
      s.completed.push({ id: pid, tags: p.tags.slice() });
      log(s, `ทำ "${p.name}" สำเร็จครบทุกขั้น`, 'good');
    }
    return null;
  }

  function takeOpportunity(s, oid) {
    if (s.phase !== 'opportunity') return 'ไม่ได้อยู่ในช่วงเลือกโอกาส';
    if (oid) {
      if (!s.oppChoices.includes(oid)) return 'ไม่มีโอกาสนี้';
      const o = OPP[oid];
      const why = blocker(s, o.cost || {}, o.require);
      if (why) return why;
      payCost(s, o.cost || {});
      applyOutcome(s, o, oid, `รับโอกาส “${o.title}”`);
      s.oppAccepted += 1;
      story(s, { kind: 'opp', title: o.title });
      log(s, `รับโอกาส "${o.title}"`, 'key');
    } else log(s, 'ปล่อยผ่านโอกาสที่เห็น');
    s.oppChoices = [];
    s.phase = 'actions';
    return null;
  }

  // ---------------------------------------------------------------- ปิดรอบ
  function endRound(s) {
    if (s.phase !== 'actions') return 'ยังจบรอบไม่ได้';
    const e = era(s);
    if (s.energy >= 3) { applyGain(s, { stress: -1 }); log(s, 'มีแรงเหลือได้พักจริง 💢 −1'); }
    if ((e.decay || []).includes('rel') && !s.flags.relate) { applyGain(s, { rel: -1 }); log(s, 'ไม่ได้ใช้เวลากับคนสำคัญ 👥 −1', 'bad'); story(s, { kind: 'decay', stat: 'rel' }); }
    if ((e.decay || []).includes('health') && !s.flags.exercise) { applyGain(s, { health: -1 }); log(s, 'ไม่ได้ออกกำลังกาย ❤️ −1', 'bad'); story(s, { kind: 'decay', stat: 'health' }); }
    if (s.stress >= 7) {
      s.burnouts += 1;
      s.stress = 4;
      applyGain(s, { health: -2 });
      log(s, 'Burnout! ❤️ −2', 'bad');
      story(s, { kind: 'burnout' });
      plantEcho(s, 'E01', 'Burnout ในบทที่ ' + s.round);
    }
    if (era(s).rounds[1] === s.round) snapshot(s);
    if (s.health <= 0) {
      if (s.crisis) { finish(s, 'crisis'); return null; }
      s.crisis = true;
      log(s, 'ภาวะวิกฤต: ❤️ หมด รอบหน้าเหลือเวลา 3 ช่อง ถ้ายังไม่ฟื้นเกมจะจบ', 'bad');
    } else s.crisis = false;
    if (s.round >= ROUNDS) { finish(s, 'complete'); return null; }
    s.round += 1;
    startRound(s);
    return null;
  }

  // ---------------------------------------------------------------- คะแนน
  const band = (v, steps) => steps.find(([min]) => v >= min)[1];
  // ช่วงคะแนนชั่วคราว รอ calibrate จาก simulator
  const TIERS = [[45, 'Life CEO'], [35, 'Strategic Life'], [25, 'In Transition'], [15, 'Overextended'], [-99, 'Reset & Rebuild']];

  function summary(s) {
    return {
      cash: s.cash, portfolio: s.portfolio, debt: s.debt, health: s.health, rel: s.rel, skills: s.skills,
      stress: s.stress, lp: s.lp, impactLp: s.impactLp, careerTier: s.careerTier, passive: passive(s),
      expenses: livingCost(s), completed: s.completed, oppAccepted: s.oppAccepted, burnouts: s.burnouts,
    };
  }

  function score(s) {
    const sum = summary(s);
    const g = GOAL[s.goalId];
    const goal = g.checkFull(sum) ? 10 : g.checkPartial(sum) ? 4 : 0;
    const unopened = Object.values(s.echoQueue).flat().filter(id => ECHO[id].kind === 'bad').length;
    const regrets = s.regrets + unopened;
    const rows = [
      ['★ Life Points', s.lp],
      ['สุขภาพ', band(s.health, [[7, 6], [4, 3], [0, 0]])],
      ['ความสัมพันธ์', band(s.rel, [[7, 6], [4, 3], [0, 0]])],
      ['ความมั่งคั่งสุทธิ', Math.max(0, Math.min(6, Math.floor((s.cash + s.portfolio - s.debt) / 5)))],
      ['อิสรภาพ', sum.passive >= sum.expenses ? 6 : sum.passive * 2 >= sum.expenses ? 3 : 0],
      [`เป้าหมาย: ${g.name}`, goal],
      [`Regret ×${regrets}`, -2 * regrets],
      ['ความเครียดค้าง', s.stress >= 6 ? -3 : 0],
    ];
    const total = rows.reduce((t, r) => t + r[1], 0);
    const tierName = s.gameOver === 'crisis' ? 'Reset & Rebuild' : band(total, TIERS);
    return { rows, total, tier: tierName, goal: goal === 10 ? 'full' : goal === 4 ? 'partial' : 'none', regrets };
  }

  function finish(s, reason) {
    s.phase = 'end';
    s.gameOver = reason;
    s.final = score(s);
    log(s, reason === 'crisis' ? 'ร่างกายไปต่อไม่ไหว ชีวิตต้องเริ่มต้นใหม่' : `จบชีวิตทั้ง 8 บท: ${s.final.tier} (${s.final.total} คะแนน)`, 'era');
  }

  const API = {
    D, CAREER, GOAL, PROJECT, EVENT, ECHO, OPP, ROUNDS,
    newGame, migrate, chooseSetup, chooseOption, doAction, takeOpportunity, endRound,
    currentCard, actionStatus, actionCost, projectStatus, score, summary,
    eraOf, era, career, tier, energyCap, salary, passive, livingCost, interest, portfolioYield, blocker, sumCost,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.LifeCEO = API;
})(typeof window !== 'undefined' ? window : globalThis);
