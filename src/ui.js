/* LIFE CEO — UI (vanilla JS, render ใหม่ทั้งหน้าทุกครั้งที่ state เปลี่ยน) */
(function () {
  const G = window.LifeCEO;
  const D = G.D;
  const SAVE_KEY = 'lifeceo.v2.save';
  const app = document.getElementById('app');
  const modalRoot = document.getElementById('modal-root');
  const ROMAN = ['', 'I', 'II', 'III', 'IV'];
  const TAG_ICON = { Family: '🏠', Wealth: '💼', Skill: '🎓', Health: '🏃', Travel: '✈️', Impact: '🌱' };
  const TAG_TH = { Family: 'ครอบครัว', Wealth: 'ความมั่งคั่ง', Skill: 'ทักษะ', Health: 'สุขภาพ', Travel: 'การเดินทาง', Impact: 'ผลกระทบ' };
  const ICON = { cash: '🪙', energy: '⚡', health: '❤️', rel: '👥', skills: '📖', stress: '💢', debt: '🔗', portfolio: '📈', lp: '★', impact: '🌱★' };
  const NAME = { cash: 'Cash', energy: 'Energy', health: 'Health', rel: 'Relations', skills: 'Skills', stress: 'Stress', debt: 'Debt', portfolio: 'Invest', lp: 'Life Pts' };

  let s = null;
  // showAll = เลขบทที่กด "ดูทั้งหมด" (รีเซ็ตเองเมื่อขึ้นบทใหม่)
  let ui = { modal: null, sheet: null, showAll: 0, pickGoal: null, pickCareer: null };

  // ---------------------------------------------------------------- พื้นโต๊ะ (ค่าส่วนตัวของผู้เล่นแต่ละเครื่อง)
  const BG_KEY = 'lifeceo.bg';
  const bgPlain = () => document.documentElement.classList.contains('bg-plain');
  function applyBg(plain) {
    document.documentElement.classList.toggle('bg-plain', plain);
    try { localStorage.setItem(BG_KEY, plain ? 'plain' : 'image'); } catch (e) { /* โหมดส่วนตัว */ }
  }
  try { document.documentElement.classList.toggle('bg-plain', localStorage.getItem(BG_KEY) === 'plain'); } catch (e) { /* ใช้ค่าเริ่มต้น */ }

  // ---------------------------------------------------------------- save
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch (e) { /* โหมดส่วนตัว */ } }
  function load() { try { const t = localStorage.getItem(SAVE_KEY); return t ? JSON.parse(t) : null; } catch (e) { return null; } }

  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sign = v => (v > 0 ? `+${v}` : v < 0 ? `−${Math.abs(v)}` : '0');

  // ---------------------------------------------------------------- chips
  function chips(cost, gain, extra) {
    const out = [];
    for (const [k, v] of Object.entries(cost || {})) if (v) out.push(`<span class="chip neg">${ICON[k]}−${v}</span>`);
    for (const [k, v] of Object.entries(gain || {})) {
      if (k === 'ongoing') {
        const t = Object.entries(v).map(([kk, vv]) => `${ICON[kk]}${sign(vv)}`).join(' ');
        out.push(`<span class="chip ongoing" title="ทุกต้นรอบ">↻ ${t}/รอบ</span>`);
      } else if (k === 'salary') out.push(`<span class="chip ${v > 0 ? 'pos' : 'neg'}">เงินเดือน ${sign(v)}</span>`);
      else if (k === 'lp' || k === 'impact') out.push(`<span class="chip star">${ICON[k]}${sign(v)}</span>`);
      else {
        const good = k === 'stress' || k === 'debt' ? v < 0 : v > 0;
        out.push(`<span class="chip ${good ? 'pos' : 'neg'}">${ICON[k]}${sign(v)}</span>`);
      }
    }
    if (extra && extra.require) out.unshift(`<span class="chip req">ต้องมี ${Object.entries(extra.require).map(([k, v]) => `${ICON[k]}≥${v}`).join(' ')}</span>`);
    if (extra && extra.echo) out.push('<span class="chip echo" title="ผลสะท้อนรออยู่ในยุคถัดไป">🔮 Echo</span>');
    if (extra && extra.clearOngoing) out.push('<span class="chip req">หยุดผล ↻ เดิม</span>');
    if (extra && extra.regret) out.push('<span class="chip neg">Regret −2 คะแนน</span>');
    return `<span class="chips">${out.join('') || '<span class="chip req">ไม่มีผล</span>'}</span>`;
  }

  // ---------------------------------------------------------------- top bar
  function topbar() {
    const e = G.era(s);
    const pips = Array.from({ length: s.crisis ? 3 : 4 }, (_, i) => `<span class="pip ${i < s.time ? 'on' : ''}"></span>`).join('');
    const cap = G.energyCap(s);
    const net = G.salary(s) + G.passive(s) - G.livingCost(s) - G.interest(s);
    const res = [
      ['cash', s.cash], ['energy', `${s.energy}/${cap}`], ['health', s.health, s.health <= 3],
      ['rel', s.rel, s.rel <= 3], ['skills', s.skills], ['stress', s.stress, s.stress >= 5],
      ['debt', s.debt, s.debt > 0], ['portfolio', s.portfolio], ['lp', s.lp],
    ].map(([k, v, warn]) => `<div class="res ${warn ? 'warn' : ''}" title="${NAME[k]}"><span class="v">${ICON[k]} ${v}${k === 'cash' ? `<span class="net">${sign(net)}</span>` : ''}</span><span class="k">${NAME[k]}</span></div>`).join('');
    const nextIncome = G.salary(s) + G.passive(s);
    return `<header class="topbar">
      <div class="topbar-row">
        <div class="brand">LIFE <span>CEO</span></div>
        <div class="chapter"><b>บทที่ ${s.round}/8</b> · ยุค ${ROMAN[e.id]} ${e.name} <span class="long">· อายุ ${e.age}</span></div>
        <div class="time" title="เวลาที่เหลือในรอบนี้">⏳ ${pips}</div>
        <nav class="info-btns">
          <button class="icon-btn" data-sheet="goal" title="เป้าหมายชีวิต">🎯</button>
          <button class="icon-btn" data-sheet="career" title="อาชีพ">💼</button>
          <button class="icon-btn" data-sheet="echo" title="Echo ที่รออยู่">🔮${echoCount() ? `<i class="badge">${echoCount()}</i>` : ''}</button>
          <button class="icon-btn" data-sheet="log" title="Life Log">📔</button>
          <button class="icon-btn" data-sheet="menu" title="เมนู">☰</button>
        </nav>
      </div>
      <div class="resbar">${res}</div>
      <div class="flow">ต่อรอบ: เงินเดือน ${G.salary(s)} + Passive ${G.passive(s)} − ค่าใช้จ่าย ${G.livingCost(s)}${G.interest(s) ? ` − ดอกเบี้ย ${G.interest(s)}` : ''} = <b>${sign(nextIncome - G.livingCost(s) - G.interest(s))}</b>${s.crisis ? ' · <b>ภาวะวิกฤต</b>' : ''}</div>
    </header>`;
  }

  // ---------------------------------------------------------------- actions
  const ACTION_DESC = {
    overtime: () => ({ cost: G.actionCost(s, 'overtime'), gain: { cash: 3 + ((G.career(s).perk || {}).overtimeBonus || 0), stress: 1 } }),
    learn: () => ({ cost: G.actionCost(s, 'learn'), gain: { skills: 1 } }),
    exercise: () => ({ cost: G.actionCost(s, 'exercise'), gain: { health: 1, stress: -1 } }),
    relate: () => ({ cost: G.actionCost(s, 'relate'), gain: { rel: 1, stress: -1 } }),
    rest: () => ({ cost: {}, gain: { stress: -2 } }),
  };
  function actionDock() {
    const btns = D.ACTIONS.filter(a => a.id !== 'project').map(a => {
      const why = G.actionStatus(s, a.id);
      let detail;
      if (ACTION_DESC[a.id]) { const d = ACTION_DESC[a.id](); detail = chips(d.cost, d.gain); }
      else if (a.id === 'promote') {
        const next = G.career(s).tiers[s.careerTier + 1];
        detail = next ? `${chips({ energy: 1 }, {}, { require: next.require })}<span class="note">→ ${esc(next.name)} เงินเดือน ${next.salary} · ค่าครองชีพ +1</span>` : '<span class="note">ขั้นสูงสุดแล้ว</span>';
      } else if (a.id === 'explore') detail = `${chips({ energy: 1 })}<span class="note">เปิดโอกาส ${2 + ((G.career(s).perk || {}).extraOpportunity || 0)} ใบ เลือกได้ 1</span>`;
      else if (a.id === 'invest') detail = `<span class="note">ย้าย 🪙 เข้า 📈 (ขั้นต่ำ 2) ได้ +1/รอบ ต่อทุก 4</span>`;
      else if (a.id === 'repay') detail = `<span class="note">ลด 🔗 ดอกเบี้ย 1 ต่อหนี้ทุก 4</span>`;
      const tip = (detail.match(/<span class="note">(.*?)<\/span>/) || [])[1] || '';
      return `<button class="act" data-act="${a.id}" ${why ? 'disabled' : ''} title="${tip.replace(/"/g, '&quot;')}"><b>${esc(a.label)}</b>${detail}${whyTag(why)}</button>`;
    }).join('');
    const live = s.phase === 'actions';
    return `<section class="dock ${live ? '' : 'waiting'}">
      <div class="dock-acts">${btns}</div>
      ${live ? '' : '<span class="dock-note">ตัดสินใจการ์ดบนโต๊ะก่อน</span>'}
      <button class="btn dock-end" data-do="end" ${live ? '' : 'disabled'}>${s.time > 0 ? `จบรอบ<small>เหลือ ${s.time} ช่อง</small>` : 'จบรอบ →'}</button>
    </section>`;
  }

  // ---------------------------------------------------------------- project card
  // ขั้นที่ทำแล้วและขั้นที่ล็อกย่อเหลือบรรทัดเดียว ขั้นที่เล่นอยู่แสดง A/B เต็ม
  const ROUND_WIDE = ['หมดเวลาในรอบนี้', 'ไม่ได้อยู่ในช่วงใช้เวลา'];
  const whyTag = why => (why && !ROUND_WIDE.includes(why) ? `<span class="why">${esc(why)}</span>` : '');
  const plain = (cost, gain) => chips(cost, gain).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  function projectCard(pid, opts) {
    const p = G.PROJECT[pid];
    const prog = s.projects[pid] || { level: 0, choices: [] };
    const complete = prog.level >= 3;
    const levels = p.levels.map((lv, i) => {
      const n = i + 1;
      if (i < prog.level) {
        const j = prog.choices[i];
        return `<li class="lv row done"><span class="lv-badge">L${n}</span>
          <div class="row-text"><b>${esc(lv.name)}</b> <span class="chosen">✓ ${'AB'[j]} · ${esc(lv.outcomes[j].label)}</span></div></li>`;
      }
      if (i > prog.level) {
        const peek = lv.outcomes.map((o, j) => `<span title="${esc(plain(o.cost, o.gain))}">${'AB'[j]} · ${esc(o.label)}</span>`).join(' / ');
        return `<li class="lv row locked"><span class="lv-badge">L${n}</span>
          <div class="row-text"><b>${esc(lv.name)}</b> ${chips(lv.cost, lv.gain, { require: lv.require })}<div class="peekline">${peek}</div></div></li>`;
      }
      const live = s.phase === 'actions';
      const outs = lv.outcomes.map((o, j) => {
        const why = live ? G.projectStatus(s, pid, j) : null;
        const tag = live ? `button class="out" data-proj="${pid}" data-out="${j}" ${why ? 'disabled' : ''}` : 'div class="out static"';
        return `<${tag}><span class="ab">${'AB'[j]}</span><b>${esc(o.label)}</b>
          ${chips(o.cost, o.gain, o)}${whyTag(why)}</${live ? 'button' : 'div'}>`;
      }).join('');
      return `<li class="lv next"><span class="lv-badge">L${n}</span>
        <div class="lv-main"><div class="lv-name">${esc(lv.name)}</div>${chips(lv.cost, lv.gain, { require: lv.require })}</div>
        <div class="outs">${outs}</div></li>`;
    }).join('');
    const t = p.tags[0];
    const tags = p.tags.map(x => `<span title="${TAG_TH[x]}">${TAG_ICON[x]}</span>`).join('');
    const why = opts && opts.why;
    return `<article class="tcard pcard ${complete ? 'complete' : ''} ${why ? 'unplayable' : ''}" data-id="${pid}">
      ${why ? `<span class="why-badge">${esc(why)}</span>` : ''}
      <header class="pcard-head"><span class="ico">${TAG_ICON[t]}</span><div class="ttl"><h3>${esc(p.en)}</h3><p>${esc(p.name)}</p></div><span class="tags">${tags}</span></header>
      <div class="pbody">
        <div class="art t-${t}"><span class="ph">${TAG_ICON[t]}</span><img src="assets/art/${pid}.webp" alt="" loading="lazy" onerror="this.remove()"></div>
        <ol class="levels">${levels}</ol>
      </div>
      <footer class="pcard-foot">${complete ? 'COMPLETED' : 'LIFE PROJECT'}</footer>
    </article>`;
  }

  // ---------------------------------------------------------------- info sheets
  const echoCount = () => [1, 2, 3, 4].reduce((t, e) => t + s.echoQueue[e].length, 0);
  function sheetBody(kind) {
    if (kind === 'goal') {
      const g = G.GOAL[s.goalId];
      const sum = G.summary(s);
      const now = g.checkFull(sum) ? '✅ บรรลุแล้ว (ถ้าจบเกมตอนนี้)' : g.checkPartial(sum) ? '◐ บรรลุบางส่วน' : '○ ยังไม่บรรลุ';
      return `<h3>🎯 ${esc(g.name)}</h3>
        <div class="kv"><span>เต็ม (+10)</span><span>${esc(g.full)}</span></div>
        <div class="kv"><span>บางส่วน (+4)</span><span>${esc(g.partial)}</span></div>
        <p class="note">${now}</p>`;
    }
    if (kind === 'career') {
      const c = G.career(s);
      const tiers = c.tiers.map((t, i) => `<div class="${i === s.careerTier ? 'cur' : ''}"><span>${esc(t.name)}</span><span>🪙${t.salary}${t.perRound && t.perRound.stress ? ' 💢+1' : ''}</span></div>`).join('');
      return `<h3>💼 ${esc(c.name)}</h3><div class="tiers">${tiers}</div><p class="note">${esc(c.perkText)}</p>`;
    }
    if (kind === 'echo') {
      const echo = [1, 2, 3, 4].map(e => `<div>ยุค ${ROMAN[e]}<b>${s.echoQueue[e].length}</b></div>`).join('');
      return `<h3>🔮 Echo ที่รออยู่</h3><div class="echo-eras">${echo}</div><p class="note">รู้แค่ว่ามีผลรออยู่ ไม่รู้ว่าดีหรือร้าย รอบแรกของยุคเปิดครึ่งคิว รอบที่สองเปิดที่เหลือ</p>`;
    }
    if (kind === 'log') {
      const logs = s.log.slice(-80).map(l => `<p class="${l.tone}">${l.tone === 'era' ? '' : `<small>บท ${l.round}</small> `}${esc(l.text)}</p>`).join('');
      return `<h3>📔 Life Log</h3><div class="log" id="log">${logs}</div>`;
    }
    return `<h3>เมนู</h3><button class="btn ghost" data-do="rules">สรุปกติกา</button>
      <button class="btn ghost" data-do="bg">พื้นโต๊ะ: ${bgPlain() ? 'สีเรียบ' : 'ภาพวิว'} (กดเพื่อสลับ)</button>
      <button class="btn ghost" data-do="new">เริ่มเกมใหม่</button>`;
  }
  function sheetModal(kind) {
    return `<div class="overlay sheet-overlay" data-do="close"><div class="sheet mini" role="dialog" aria-modal="true">
      <span class="grab"></span>${sheetBody(kind)}<button class="btn ghost" data-do="close">ปิด</button></div></div>`;
  }

  // ---------------------------------------------------------------- modals
  // ---------------------------------------------------------------- event / echo / opportunity cards (วางบนโต๊ะ)
  const ERA_ICON = ['', '🌅', '🏗️', '⛰️', '🌳'];
  function eventCard() {
    const { kind, card } = G.currentCard(s);
    const tone = kind === 'echo' ? `echo-${card.kind}` : 'event';
    const label = kind === 'echo' ? (card.kind === 'good' ? 'ECHO · ผลสะท้อนที่ดี' : 'ECHO · ผลสะท้อน') : `LIFE EVENT · ยุค ${ROMAN[card.era]}`;
    const opts = card.options.map((o, i) => {
      const why = G.blocker(s, o.cost || {}, o.require);
      return `<button class="opt ${o.regret ? 'regret' : ''}" data-opt="${i}" ${why ? 'disabled' : ''}><b>${esc(o.label)}</b>${chips(o.cost, o.gain, o)}${whyTag(why)}</button>`;
    }).join('');
    return `<article class="tcard ecard2 ${tone}" data-id="ev-${card.id}">
      <header class="pcard-head"><div class="ttl"><small>${label}</small><h3 class="th">${esc(card.title)}</h3></div></header>
      <div class="pbody">
        <div class="art"><span class="ph">${kind === 'echo' ? '🔮' : ERA_ICON[card.era]}</span></div>
        <p class="story">${esc(card.story)}</p>
        <div class="eopts">${opts}</div>
      </div>
      <footer class="pcard-foot">${kind === 'echo' ? 'ECHO' : 'LIFE EVENT'}</footer>
    </article>`;
  }
  function oppCard(id) {
    const o = G.OPP[id];
    const why = G.blocker(s, o.cost || {}, o.require);
    return `<article class="tcard ecard2 opp" data-id="opp-${id}">
      <header class="pcard-head"><div class="ttl"><small>OPPORTUNITY</small><h3 class="th">${esc(o.title)}</h3></div></header>
      <div class="pbody">
        <div class="art"><span class="ph">✨</span></div>
        <div class="eopts"><div class="opt static">${chips(o.cost, o.gain, o)}</div>
          <button class="btn" data-opp="${id}" ${why ? 'disabled' : ''}>รับโอกาสนี้</button>${whyTag(why)}</div>
      </div>
      <footer class="pcard-foot">OPPORTUNITY</footer>
    </article>`;
  }

  function amountModal(kind) {
    const max = kind === 'invest' ? s.cash : Math.min(s.cash, s.debt);
    const min = kind === 'invest' ? 2 : 1;
    return `<div class="overlay"><div class="ecard" role="dialog" aria-modal="true">
      <div class="ecard-head"><small>${kind === 'invest' ? 'INVEST' : 'REPAY'}</small><h3>${kind === 'invest' ? 'ลงทุนเท่าไร' : 'ชำระหนี้เท่าไร'}</h3></div>
      <div class="ecard-body">
        <div class="amount"><input type="range" id="amt" min="${min}" max="${max}" value="${max}"><output id="amt-out">${max}</output></div>
        <p class="note">${kind === 'invest' ? 'ทุก 4 ใน 📈 ให้ Passive +1 🪙 ต่อรอบ ถอนคืนไม่ได้' : 'ดอกเบี้ย 1 🪙 ต่อรอบ ต่อหนี้ทุก 4 (ปัดขึ้น)'}</p>
        <button class="btn" data-amount="${kind}">ยืนยัน (ใช้ 1 ช่องเวลา)</button>
        <button class="btn ghost" data-do="close">ยกเลิก</button>
      </div></div></div>`;
  }
  function rulesModal() {
    return `<div class="overlay"><div class="ecard" role="dialog" aria-modal="true">
      <div class="ecard-head"><small>สรุปกติกา v0.2</small><h3>ชีวิต 8 บท 4 ยุค</h3></div>
      <div class="ecard-body" style="font-size:14px">
        <p class="story" style="color:var(--ink)">ทุกบท: รับรายได้และจ่ายค่าใช้จ่าย → เจอเหตุการณ์และ Echo ที่ถึงคิว → ใช้เวลา 4 ช่อง → ปิดรอบ</p>
        <p class="story">⚡ เติมเต็มทุกบทตามเพดานของยุค (7/6/6/5) ลด 1 ต่อ 💢 ทุก 3 และลด 1 ถ้า ❤️ ≤ 3</p>
        <p class="story">ปิดรอบ: เหลือ ⚡ ≥ 3 ได้ 💢 −1 · ตั้งแต่ยุค II ไม่ได้ใช้เวลากับคนสำคัญ 👥 −1 · ตั้งแต่ยุค III ไม่ได้ออกกำลังกาย ❤️ −1 · 💢 ≥ 7 = Burnout ❤️ −2</p>
        <p class="story">Life Project ทำได้ 1 ขั้นต่อโปรเจกต์ต่อรอบ ทุกขั้นเลือก A หรือ B · 🔮 Echo คือผลที่จะกลับมาในยุคถัดไป</p>
        <p class="story">เงินไม่พอจ่าย ส่วนที่ขาดกลายเป็นหนี้ 🔗 · ❤️ เป็น 0 สองรอบติด เกมจบ</p>
        <p class="note">ตัวเลขทั้งหมดเป็นค่าตั้งต้นเพื่อทดสอบ</p>
        <button class="btn" data-do="close">ปิด</button></div></div></div>`;
  }

  // ---------------------------------------------------------------- screens
  function setupScreen() {
    const goals = s.goalChoices.map(id => { const g = G.GOAL[id];
      return `<button class="pick ${ui.pickGoal === id ? 'sel' : ''}" data-pick-goal="${id}"><h3>🎯 ${esc(g.name)}</h3><p>เต็ม +10: ${esc(g.full)}</p><p>บางส่วน +4: ${esc(g.partial)}</p></button>`; }).join('');
    const careers = s.careerChoices.map(id => { const c = G.CAREER[id];
      return `<button class="pick ${ui.pickCareer === id ? 'sel' : ''}" data-pick-career="${id}"><h3>💼 ${esc(c.name)}</h3>
        <p>${c.tiers.map(t => `${esc(t.name)} 🪙${t.salary}`).join(' → ')}</p><p>${esc(c.perkText)}</p></button>`; }).join('');
    return `<main class="hero">
      <div><h1>LIFE <span>CEO</span></h1><p class="story">ชีวิตที่คุณออกแบบได้ · เกมจำลองชีวิตสำหรับผู้เล่นคนเดียว 8 บท</p></div>
      <section><div class="section-title"><h2>เลือกเป้าหมายชีวิต</h2><small>จั่วมา 3 ใบ เลือก 1</small></div><div class="pickgrid">${goals}</div></section>
      <section><div class="section-title"><h2>เลือกอาชีพเริ่มต้น</h2><small>จั่วมา 3 ใบ เลือก 1</small></div><div class="pickgrid">${careers}</div></section>
      <div class="setup-actions"><button class="btn" data-do="start" ${ui.pickGoal && ui.pickCareer ? '' : 'disabled'}>เริ่มชีวิต →</button>
        <button class="btn ghost" data-do="reroll" ${s.rerolls > 0 ? '' : 'disabled'}>${s.rerolls > 0 ? `🎲 สุ่มใหม่ (เหลือ ${s.rerolls} ครั้ง)` : 'ใช้สุ่มใหม่ไปแล้ว'}</button></div>
      <div>
      <p class="note">เริ่มต้น: 🪙 ${D.START.cash} · ❤️ ${D.START.health} · 👥 ${D.START.rel} · 📖 ${D.START.skills} · ค่าครองชีพ ${D.START.expenses}/รอบ</p></div>
    </main>`;
  }

  // ---------------------------------------------------------------- end: เล่าชีวิต + ผลสืบเนื่อง
  const ongoingText = g => Object.entries(g).map(([k, v]) => `${ICON[k]}${sign(v)}`).join(' ');
  // ผลต่อเนื่องที่เป็นรายจ่ายล้วน เล่าว่า "ต้องจ่าย" แทน "ได้"
  const ongoingVerb = g => {
    const parts = [];
    if (g.cash < 0) parts.push(`ต้องจ่าย ${ICON.cash}${-g.cash}`);
    else if (g.cash > 0) parts.push(`ได้ ${ICON.cash}+${g.cash}`);
    const rest = Object.entries(g).filter(([k]) => k !== 'cash').map(([k, v]) => `${ICON[k]}${sign(v)}`).join(' ');
    if (rest) parts.push(parts.length ? `และ ${rest}` : `ได้ ${rest}`);
    return `${parts.join(' ')} ทุกรอบ`;
  };
  // ชื่อภาษาอังกฤษต่อท้ายคำไทยต้องเว้นวรรค ("ตำแหน่ง Sales")
  const gapIfLatin = t => (/^[A-Za-z]/.test(t) ? ` ${t}` : t);
  const quoteFrom = t => t.replace(/ แล้วเลือก/, ' แล้วคุณเลือก');

  // เล่าเป็นประโยคธรรมดา: ฉากสั้น + สิ่งที่คุณทำ (scene/tell มาจาก cards.js)
  const scene = e => esc(e.scene || `เจอเรื่อง “${e.title}”`);
  const did = e => esc(e.tell || e.label);
  function backFrom(e) {
    if (!e.planted) return '';
    if (e.cause) return `ผลจากบทที่ ${e.planted} ที่คุณ${esc(e.cause)}`;
    return `ผลจากบทที่ ${e.planted}`;
  }
  function eraSentences(entries) {
    const out = [];
    let round = null;
    const decay = { rel: 0, health: 0 };
    for (const e of entries) {
      if (e.kind !== 'decay' && e.round !== round) { round = e.round; out.push({ round }); }
      if (e.kind === 'event') {
        out.push(`${scene(e)} คุณ${did(e)}${e.echo ? ' เรื่องนี้จะย้อนกลับมาหาคุณอีกในยุคหน้า' : ''}`);
      } else if (e.kind === 'echo') {
        const back = backFrom(e);
        let t = `${scene(e)}${back ? ` (${back})` : ''} คุณ${did(e)}`;
        if (e.regret) t += ' แต่เรื่องนี้ก็ยังค้างคาใจไปอีกนาน';
        out.push(t);
      } else if (e.kind === 'project') {
        let t = e.level === 1
          ? `คุณเริ่ม${esc(e.name)} ขั้นแรกคือ${esc(e.step)} และเลือก${esc(e.label)}`
          : `${esc(e.name)}เดินมาถึงขั้น${esc(e.step)} คุณเลือก${esc(e.label)}`;
        if (e.ongoing) t += ` ทำให้${ongoingVerb(e.ongoing)}นับจากนั้น`;
        if (e.done) t += ` จน${esc(e.name)}สำเร็จครบทุกขั้น`;
        out.push(t);
      } else if (e.kind === 'opp') out.push(`คุณคว้าโอกาส “${esc(e.title)}” ไว้ได้`);
      else if (e.kind === 'promote') out.push(`คุณได้เลื่อนเป็น${esc(gapIfLatin(e.title))} เงินเดือนขึ้นเป็น ${e.salary} แต่ค่าครองชีพก็ขยับตาม`);
      else if (e.kind === 'burnout') out.push('งานหนักจนร่างกายรับไม่ไหว คุณ Burnout');
      else if (e.kind === 'decay') decay[e.stat] += 1;
    }
    // สรุปสิ่งที่ละเลยทั้งยุคไว้บรรทัดท้าย (ไม่ผูกกับบทใดบทหนึ่ง)
    if (decay.rel || decay.health) out.push({ round: 0 });
    if (decay.rel) out.push(`ยุคนี้มี ${decay.rel} บทที่คุณไม่ได้ใช้เวลากับคนสำคัญ ความสัมพันธ์จึงค่อยๆ ห่างออก`);
    if (decay.health) out.push(`และมี ${decay.health} บทที่ไม่ได้ออกกำลังกาย สุขภาพจึงถดถอยไปตามอายุ`);
    return out;
  }
  function chains() {
    const items = (s.echoLinks || []).map(l => {
      const card = G.ECHO[l.id];
      const end = l.resolved
        ? `<b>บท ${l.resolved.round}</b> คุณ${esc((card.options.find(o => o.label === l.resolved.label) || {}).tell || l.resolved.label)}${l.resolved.regret ? ' <em class="neg">Regret −2</em>' : ''}`
        : (card.kind === 'bad' ? '<em class="neg">เกมจบก่อนได้แก้ นับเป็น Regret −2</em>' : '<em>เกมจบก่อนผลดีนี้จะมาถึง</em>');
      return `<li class="${card.kind}"><span><b>บท ${l.planted}</b> ${l.cause ? `คุณ${esc(l.cause)}` : esc(quoteFrom(l.from))}</span><span class="arrow">→</span>
        <span>${esc(card.scene || card.title)} <b>${card.kind === 'good' ? '(ผลดี)' : '(ผลร้าย)'}</b></span><span class="arrow">→</span><span>${end}</span></li>`;
    });
    for (const e of (s.story || [])) {
      if (e.kind !== 'project' || !e.ongoing) continue;
      const left = G.ROUNDS - e.round;
      items.push(`<li class="ongoing"><span><b>บท ${e.round}</b> คุณเลือก${esc(e.label)}ตอน${esc(e.name)}</span><span class="arrow">→</span>
        <span>${ongoingVerb(e.ongoing)}</span><span class="arrow">→</span><span>${left ? `ต่อเนื่องอีก ${left} บท` : 'เกมจบก่อนได้รับผลนี้'}</span></li>`);
    }
    return items.length ? `<ul class="chains">${items.join('')}</ul>` : '<p class="note">ชีวิตนี้แทบไม่มีการตัดสินใจที่ย้อนกลับมาให้ผลภายหลัง</p>';
  }
  function scoreReasons() {
    const sum = G.summary(s), g = G.GOAL[s.goalId];
    return [
      'จาก Life Project เหตุการณ์ และ Echo ที่ดี',
      `❤️ จบที่ ${s.health} (7 ขึ้นไปได้เต็ม 6)`,
      `👥 จบที่ ${s.rel} (7 ขึ้นไปได้เต็ม 6)`,
      `🪙${s.cash} + 📈${s.portfolio} − 🔗${s.debt} = ${s.cash + s.portfolio - s.debt} หาร 5`,
      `Passive ${sum.passive} เทียบค่าใช้จ่าย ${sum.expenses} ต่อรอบ`,
      `เต็ม: ${g.full} · บางส่วน: ${g.partial}`,
      'เรื่องที่ปล่อยค้าง รวมผลร้ายที่ยังไม่ได้แก้ตอนจบ',
      `💢 จบที่ ${s.stress} (6 ขึ้นไปหัก 3)`,
    ];
  }
  function endScreen() {
    const f = s.final;
    const c = G.CAREER[s.careerId], g = G.GOAL[s.goalId];
    const reasons = scoreReasons();
    const rows = f.rows.map(([k, v], i) => `<tr><td>${esc(k)}<small>${esc(reasons[i] || '')}</small></td><td>${v > 0 ? '+' : ''}${v}</td></tr>`).join('');
    let eras = '';
    if (s.story) {
      D.ERAS.forEach((e, i) => {
        const entries = s.story.filter(x => e.rounds.includes(x.round));
        if (!entries.length && s.round < e.rounds[0]) return;
        const sent = eraSentences(entries);
        if (i === 0) sent.unshift(`อายุ 22 คุณเริ่มทำงานสาย${esc(c.name)}ในตำแหน่ง${esc(gapIfLatin(c.tiers[0].name))} ตั้งเป้าชีวิตไว้ที่ “${esc(g.name)}”`);
        // แต่ละบทขึ้นบรรทัดใหม่ ประโยคในบทเดียวกันคั่นด้วย ·
        const lines = [];
        for (const t of sent) {
          if (typeof t === 'object') lines.push({ round: t.round, parts: [] });
          else if (!lines.length || (i === 0 && lines.length === 0)) lines.push({ round: null, parts: [t] });
          else lines[lines.length - 1].parts.push(t);
        }
        const body = lines.filter(l => l.parts.length).map(l => `<p>${l.round ? `<b class="rnd">บทที่ ${l.round}</b>` : ''}${l.parts.join(' ')}</p>`).join('');
        eras += `<article class="era-story"><h3>ยุค ${ROMAN[e.id]} ${esc(e.name)} <small>อายุ ${esc(e.age)}</small></h3>
          ${body || '<p>ยุคนี้ผ่านไปอย่างเงียบๆ</p>'}</article>`;
      });
    } else {
      eras = s.log.filter(l => ['key', 'good', 'bad', 'echo', 'era'].includes(l.tone)).map(l => `<p class="${l.tone}">${esc(l.text)}</p>`).join('');
    }
    return `<main class="hero end">
      <div><h1>${s.gameOver === 'crisis' ? 'ชีวิตต้องเริ่มต้นใหม่' : 'ชีวิตของคุณ'}</h1>
        <p class="story">${esc(c.name)} · ตั้งใจเป็น “${esc(g.name)}” · ${f.goal === 'full' ? 'ทำได้ตามที่ตั้งใจ' : f.goal === 'partial' ? 'ทำได้บางส่วน' : 'ยังไปไม่ถึง'}</p>
        <p><span class="tier-badge">${esc(f.tier)}</span> <b class="big">${f.total} คะแนน</b> <span class="note">ช่วงคะแนนของแต่ละระดับยังเป็นค่าชั่วคราว</span></p></div>
      <section class="panel"><div class="section-title"><h2>เรื่องเล่า 4 ยุค</h2></div>${eras}</section>
      <section class="panel"><div class="section-title"><h2>การตัดสินใจที่ส่งผลต่อเนื่อง</h2><small>เลือกวันนั้น → ผลที่กลับมา → สิ่งที่คุณทำ</small></div>${chains()}</section>
      <section class="panel"><div class="section-title"><h2>คะแนนมาจากไหน</h2></div><table class="score-table">${rows}<tr class="total"><td>รวม</td><td>${f.total}</td></tr></table></section>
      <div><button class="btn" data-do="new">เริ่มชีวิตใหม่</button> <span class="note">seed ${s.seed}</span></div>
    </main>`;
  }

  // ---------------------------------------------------------------- table
  const allProjects = () => [...Object.keys(s.projects).filter(id => s.projects[id].level < 3), ...s.market];
  const playable = id => [0, 1].some(j => !G.projectStatus(s, id, j));
  function blockReason(id) {
    if (s.flags.advanced.includes(id)) return 'ทำแล้วรอบนี้';
    return G.projectStatus(s, id, 0) || G.projectStatus(s, id, 1);
  }

  function tableView() {
    if (s.phase === 'event') {
      const left = s.pending.length - 1;
      return { head: `<b>เหตุการณ์ชีวิต</b><span>ตัดสินใจก่อนใช้เวลา${left ? ` · ต่อจากนี้อีก ${left} ใบ` : ''}</span>`, cards: [eventCard()] };
    }
    if (s.phase === 'opportunity') {
      return { head: '<b>โอกาสที่เข้ามา</b><span>เลือกได้ 1 ใบ</span><button class="btn ghost sm" data-opp="">ปล่อยผ่านทั้งหมด</button>',
        cards: s.oppChoices.map(oppCard) };
    }
    const all = allProjects();
    const ok = all.filter(playable);
    const showAll = ui.showAll === s.round;
    const rest = all.length - ok.length;
    const toggle = rest ? `<button class="btn ghost sm" data-do="showall">${showAll ? 'ดูเฉพาะที่เล่นได้' : 'ดูทั้งหมด'}</button>` : '';
    const head = `<b>Life Projects</b><span>เล่นได้ ${ok.length} ใบ${rest ? ` · ยังเล่นไม่ได้ ${rest} ใบ` : ''}</span>${toggle}`;
    const list = showAll ? all : ok;
    if (!list.length) {
      const msg = s.time <= 0 ? 'เวลาหมดแล้ว กด "จบรอบ" ด้านล่าง' : 'รอบนี้ยังไม่มีโปรเจกต์ที่เล่นได้ ใช้กิจกรรมด้านล่างสะสมทรัพยากร';
      return { head, cards: [], empty: msg };
    }
    return { head, cards: list.map(id => projectCard(id, { why: playable(id) ? null : blockReason(id) })) };
  }

  function sidePanel() {
    const logs = s.log.slice(-4).map(l => `<p class="${l.tone}">${l.tone === 'era' ? '' : `<small>บท ${l.round}</small> `}${esc(l.text)}</p>`).join('');
    return `<aside class="side">
      <section class="panel mini">${sheetBody('goal')}</section>
      <section class="panel mini">${sheetBody('career')}</section>
      <section class="panel mini">${sheetBody('echo').replace(/<p class="note">.*<\/p>/, '')}</section>
      <section class="panel mini side-log"><h3>📔 ล่าสุด</h3><div class="log">${logs}</div>
        <button class="btn ghost sm" data-sheet="log">ดูทั้งหมด</button></section>
    </aside>`;
  }

  function gameScreen() {
    const v = tableView();
    return `<div class="game">
      ${topbar()}
      <div class="board">
        <main class="table">
          <div class="table-head">${v.head}</div>
          <div class="table-cards ${s.phase === 'actions' && ui.showAll === s.round ? 'browse' : ''}" id="cards">${v.cards.join('') || `<p class="table-empty">${esc(v.empty || '')}</p>`}</div>
        </main>
        ${isDesk() && innerWidth / (parseFloat(document.documentElement.style.getPropertyValue('--z')) || 1) >= 1500 ? sidePanel() : ''}
      </div>
      ${actionDock()}
    </div>`;
  }

  // ---------------------------------------------------------------- fit: ข้อความต้องครบ ไม่มี scroll
  function fitCards() {
    const over = c => c.scrollHeight > c.clientHeight + 1;
    const all = [...document.querySelectorAll('.table .tcard')];
    all.forEach(c => { c.classList.remove('dense', 'compact', 'tight', 'scrolly'); c.style.height = ''; });
    const row = document.getElementById('cards');
    // ล้างผลจากรอบก่อน (ResizeObserver เรียกซ้ำกับแถวเดิมได้) ไม่ให้ภาพสูงคงที่ค้างอยู่ระหว่างคำนวณ
    if (row) { row.classList.remove('art-fixed', 'no-art'); row.style.removeProperty('--art-h'); }
    if (!row || isMobile() || row.classList.contains('browse')) {
      // มือถือ และโหมดดูทั้งหมด: การ์ดขนาดปกติ เลื่อนดูได้ แก้แค่ซ่อนภาพเมื่อข้อความล้น
      if (row) row.classList.remove('two-rows');
      all.forEach(c => { if (over(c)) c.classList.add('dense'); });
      all.forEach(c => { if (over(c)) c.classList.add('compact'); });
      if (!isMobile()) all.forEach(c => { if (over(c)) c.classList.add('tight'); });
      uniformArt(all, row);
      lastResort(all);
      return;
    }
    // จอคอม/แท็บเล็ต: ทุกใบต้องเห็นครบโดยไม่ต้องเลื่อน
    const cs = getComputedStyle(row);
    const W = row.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const H = row.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const gap = parseFloat(cs.columnGap) || 0;
    const n = all.length;
    const fitW = per => (W - gap * (per - 1)) / per;
    // แถวเดียวไม่พอ (การ์ดจะแคบกว่า 260px) ให้ขึ้น 2 แถว
    const rows = n > 1 && fitW(n) < 260 ? 2 : 1;
    const per = Math.ceil(n / rows);
    const h = rows === 2 ? (H - gap) / 2 : H;
    const maxW = Math.max(200, Math.min(560, fitW(per)));
    row.classList.toggle('two-rows', rows === 2);
    const size = w => all.forEach(c => { c.style.width = `${Math.floor(w)}px`; c.style.height = rows === 2 ? `${Math.floor(h)}px` : ''; });
    // แถวเตี้ยเกินกว่าจะใส่การ์ดเต็มใบ ให้ย่อทุกใบตั้งแต่แรก
    if (rows === 2 && h < 420) all.forEach(c => c.classList.add('compact'));
    size(Math.max(200, Math.min(480, h * 5 / 7, fitW(per))));
    // แก้ทีละขั้นเฉพาะใบที่ยังล้น: ซ่อนภาพ → ขยายความกว้าง → โหมดย่อ → ตัวหนังสือเล็กลง 1px (จอคอมเท่านั้น)
    all.forEach(c => { if (over(c)) c.classList.add('dense'); });
    if (all.some(over)) size(maxW);
    all.forEach(c => { if (over(c)) c.classList.add('compact'); });
    all.forEach(c => { if (over(c)) c.classList.add('tight'); });
    uniformArt(all, row);
    lastResort(all);
  }
  // ภาพบนการ์ดทุกใบสูงเท่ากัน = พื้นที่ที่เหลือน้อยที่สุดในแถว (ไม่เกิน 56% ของความกว้างการ์ด ≈ 16:9)
  // แล้วหดการ์ดทุกใบให้สูงเท่ากันพอดีเนื้อหา ไม่เหลือที่ว่างใต้ L3
  function uniformArt(all, row) {
    if (!row) return;
    row.classList.remove('art-fixed', 'no-art');
    row.style.removeProperty('--art-h');
    if (!all.length) return;
    const content = c => {
      const body = c.querySelector('.pbody');
      const kids = [...body.children].filter(k => !k.classList.contains('art'));
      return c.offsetHeight - body.offsetHeight + kids.reduce((t, k) => t + k.offsetHeight, 0);
    };
    const shrink = h => {
      const orig = all.map(c => c.style.height);
      all.forEach(c => { if (h < c.clientHeight) c.style.height = `${Math.ceil(h + (c.offsetHeight - c.clientHeight))}px`; });
      // วัดเนื้อหาพลาดไปบ้าง (margin ฯลฯ) ถ้ามีใบไหนล้น เพิ่มความสูงให้ทุกใบเท่ากัน หรือคืนค่าเดิมถ้ายังไม่พอ
      const extra = Math.max(0, ...all.map(c => c.scrollHeight - c.clientHeight));
      if (extra) all.forEach(c => { c.style.height = `${c.offsetHeight + extra}px`; });
      if (all.some(c => c.scrollHeight > c.clientHeight + 1)) all.forEach((c, i) => { c.style.height = orig[i]; });
    };
    // ถ้ามีใบไหนต้องซ่อนภาพไปแล้ว ซ่อนทุกใบให้แถวดูเท่ากัน
    if (all.some(c => c.classList.contains('dense') || c.classList.contains('compact'))) {
      row.classList.add('no-art');
      shrink(Math.max(...all.map(content)) + 1);
      return;
    }
    const need = all.map(content);
    const room = Math.min(...all.map((c, i) => c.clientHeight - need[i]));
    const ideal = all[0].clientWidth * 0.56;
    const art = Math.floor(Math.min(ideal, room));
    // ภาพเตี้ยกว่า 56px ไม่ได้ช่วยอะไร ซ่อนทุกใบพร้อมกัน
    if (art < 56) { row.classList.add('no-art'); shrink(Math.max(...need) + 1); return; }
    row.style.setProperty('--art-h', `${art}px`);
    row.classList.add('art-fixed');
    shrink(Math.max(...need) + art + 1);
  }
  // ตาข่ายสุดท้าย: ทางเลือกที่กดไม่ถึงแย่กว่าการเลื่อน ให้เนื้อการ์ดเลื่อนได้และมีเงาบอกว่ามีต่อ
  function lastResort(all) {
    all.forEach(c => { if (c.scrollHeight > c.clientHeight + 1) c.classList.add('scrolly'); });
  }

  // ---------------------------------------------------------------- device mode
  // บางเบราว์เซอร์บนมือถือ (โหมดเดสก์ท็อป, in-app browser) ไม่สน viewport meta แล้ววาดหน้ากว้าง ~980px
  // ถ้าเจอแบบนั้น ให้ zoom ทั้งหน้ากลับมาเท่าความกว้างจริงของจอ และใช้ layout มือถือ
  const isMobile = () => document.documentElement.classList.contains('m');
  function applyDeviceMode() {
    const root = document.documentElement;
    const phone = matchMedia('(pointer: coarse)').matches && screen.width <= 700;
    const forced = phone && innerWidth > screen.width * 1.25;
    const z = forced ? innerWidth / screen.width : 1;
    root.style.setProperty('--z', z);
    root.classList.toggle('zoomed', forced);
    root.classList.toggle('m', phone || innerWidth / z <= 700);
    root.classList.toggle('desk', !root.classList.contains('m') && innerWidth / z >= 1024);
    root.classList.toggle('short', innerHeight / z < 700);
  }
  const isDesk = () => document.documentElement.classList.contains('desk');
  const modeKey = () => document.documentElement.className + document.documentElement.style.getPropertyValue('--z');
  applyDeviceMode();
  let resizeT = null;
  addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { const was = modeKey(); applyDeviceMode(); if (s && was !== modeKey()) render(); else fitCards(); }, 150);
  });

  // ---------------------------------------------------------------- render
  function render() {
    if (!s) return;
    if (s.phase === 'setup') app.innerHTML = setupScreen();
    else if (s.phase === 'end') app.innerHTML = endScreen();
    else app.innerHTML = gameScreen();
    document.body.classList.toggle('in-game', s.phase !== 'setup' && s.phase !== 'end');
    let m = '';
    if (ui.modal === 'rules') m = rulesModal();
    else if (ui.sheet && s.phase !== 'setup' && s.phase !== 'end') m = sheetModal(ui.sheet);
    else if (ui.modal === 'invest' || ui.modal === 'repay') m = amountModal(ui.modal);
    modalRoot.innerHTML = m;
    const lg = document.getElementById('log'); if (lg) lg.scrollTop = lg.scrollHeight;
    const cards = document.getElementById('cards'); if (cards) cards.scrollLeft = 0;
    fitCards();
    const amt = document.getElementById('amt');
    if (amt) amt.oninput = () => { document.getElementById('amt-out').textContent = amt.value; };
    save();
  }

  // ---------------------------------------------------------------- dissolve
  // engine ทำงานทันที แล้วเล่นแอนิเมชันกับสำเนาของการ์ดที่ออกจากโต๊ะ (state ไม่มีช่วงค้าง)
  const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function withFx(leaving, ev, fn) {
    leaving = leaving.filter(Boolean);
    if (calm() || !leaving.length) { fn(); return; }
    const fx = document.getElementById('fx');
    const z = parseFloat(document.documentElement.style.getPropertyValue('--z')) || 1;
    // ตำแหน่งการ์ดทุกใบก่อนวาดใหม่ (ใช้เลื่อนการ์ดที่เหลือเข้าที่แบบนุ่ม)
    const before = new Map([...document.querySelectorAll('.table .tcard')].map(c => [c.dataset.id, c.getBoundingClientRect()]));
    const clones = leaving.map(c => {
      const r = c.getBoundingClientRect();
      const k = c.cloneNode(true);
      k.classList.add('fx-clone');
      k.removeAttribute('data-id');
      // getBoundingClientRect อยู่ในหน่วยจอ ส่วน style อยู่ในหน่วย CSS ที่ถูก zoom
      Object.assign(k.style, { left: `${r.left / z}px`, top: `${r.top / z}px`, width: `${r.width / z}px`, height: `${r.height / z}px` });
      const ox = ev ? ((ev.clientX - r.left) / r.width) * 100 : 50, oy = ev ? ((ev.clientY - r.top) / r.height) * 100 : 50;
      k.style.setProperty('--ox', `${Math.max(0, Math.min(100, ox))}%`);
      k.style.setProperty('--oy', `${Math.max(0, Math.min(100, oy))}%`);
      fx.appendChild(k);
      k.addEventListener('animationend', () => k.remove(), { once: true });
      setTimeout(() => k.remove(), 1200);
      return k;
    });
    fn();
    const stayed = leaving.some(c => c.dataset.id && document.querySelector(`.table .tcard[data-id="${c.dataset.id}"]`));
    if (stayed) { clones.forEach(k => k.remove()); return; }
    clones.forEach(k => k.classList.add('go'));
    document.querySelectorAll('.table .tcard').forEach(c => {
      const old = before.get(c.dataset.id);
      if (!old) { c.classList.add('fx-enter'); return; }
      const r = c.getBoundingClientRect();
      const dx = (old.left - r.left) / z, dy = (old.top - r.top) / z;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      c.style.transition = 'none';
      c.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        c.style.transition = 'transform .32s cubic-bezier(.2, .8, .2, 1)';
        c.style.transform = '';
        c.addEventListener('transitionend', () => { c.style.transition = ''; }, { once: true });
      }));
    });
  }

  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
  }
  function run(err) { if (err) toast(err); render(); }
  // all-or-nothing: ถ้า engine พังกลางคำสั่ง คืน state เดิมทั้งหมด ผู้เล่นจะไม่เสีย ⚡/🪙 ฟรี
  function safely(fn) {
    const before = JSON.stringify(s);
    try { return fn(); } catch (e) {
      s = JSON.parse(before);
      console.error(e);
      return 'เกิดข้อผิดพลาด ลองใหม่อีกครั้ง';
    }
  }

  function newGame() {
    s = G.newGame((Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0);
    ui = { modal: null, sheet: null, showAll: 0, pickGoal: null, pickCareer: null };
    window.scrollTo(0, 0);
    render();
  }

  // ---------------------------------------------------------------- events
  document.addEventListener('click', ev => {
    // แตะพื้นหลังของ sheet = ปิด
    if (ev.target.classList && ev.target.classList.contains('sheet-overlay')) { ui.sheet = null; render(); return; }
    const el = ev.target.closest('button');
    if (!el || el.disabled) return;
    const d = el.dataset;
    if (d.sheet) { ui.sheet = d.sheet; render(); return; }
    if (d.do === 'bg') { applyBg(!bgPlain()); render(); return; }
    if (d.do === 'showall') { ui.showAll = ui.showAll === s.round ? 0 : s.round; render(); return; }
    if (d.do === 'new') { ui.sheet = null; if (s.phase === 'setup' || s.phase === 'end' || confirm('เริ่มเกมใหม่? เกมที่เล่นอยู่จะหายไป')) newGame(); return; }
    if (d.do === 'rules') { ui.sheet = null; ui.modal = 'rules'; render(); return; }
    if (d.do === 'close') { ui.modal = null; ui.sheet = null; render(); return; }
    if (d.do === 'reroll') {
      const err = safely(() => G.reroll(s));
      if (!err) { ui.pickGoal = null; ui.pickCareer = null; }
      run(err);
      if (!err) document.querySelectorAll('.pick').forEach(el => el.classList.add('fx-enter'));
      return;
    }
    if (d.do === 'start') { run(safely(() => G.chooseSetup(s, ui.pickGoal, ui.pickCareer))); return; }
    if (d.do === 'end') {
      if (s.time > 0 && !confirm(`ยังเหลือเวลา ${s.time} ช่อง จบรอบเลยไหม`)) return;
      run(safely(() => G.endRound(s))); return;
    }
    if (d.pickGoal) { ui.pickGoal = d.pickGoal; render(); return; }
    if (d.pickCareer) { ui.pickCareer = d.pickCareer; render(); return; }
    if (d.opt !== undefined) { withFx([el.closest('.tcard')], ev, () => run(safely(() => G.chooseOption(s, Number(d.opt))))); return; }
    if (d.opp !== undefined) {
      // รับโอกาสหรือปล่อยผ่าน การ์ดโอกาสทุกใบออกจากโต๊ะพร้อมกัน
      withFx([...document.querySelectorAll('.table .ecard2.opp')], ev, () => run(safely(() => G.takeOpportunity(s, d.opp || null))));
      return;
    }
    if (d.amount) {
      const v = Number(document.getElementById('amt').value);
      ui.modal = null; run(safely(() => G.doAction(s, d.amount, { amount: v }))); return;
    }
    if (d.act) {
      if (d.act === 'invest' || d.act === 'repay') { ui.modal = d.act; render(); return; }
      run(safely(() => G.doAction(s, d.act))); return;
    }
    if (d.proj) {
      withFx([el.closest('.tcard')], ev, () => {
        const err = safely(() => G.doAction(s, 'project', { id: d.proj, outcome: Number(d.out) }));
        render();
        // การ์ดจะออกจากโต๊ะ (ทำได้ 1 ขั้นต่อรอบ) จึงบอกผลสั้นๆ
        toast(err || s.log[s.log.length - 1].text);
      });
    }
  });

  // ฟอนต์จริงโหลดตามมาทีหลังทำให้ตัวหนังสือสูงขึ้น และแถบเบราว์เซอร์มือถือหด/ขยายได้ จึงคำนวณขนาดการ์ดใหม่
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitCards());
  if (window.ResizeObserver) {
    let fitT = null;
    const ro = new ResizeObserver(() => { cancelAnimationFrame(fitT); fitT = requestAnimationFrame(fitCards); });
    ro.observe(document.body);
    new MutationObserver(() => { const c = document.getElementById('cards'); if (c && !c.__ro) { c.__ro = true; ro.observe(c); } })
      .observe(app, { childList: true });
  }

  // ---------------------------------------------------------------- boot
  if (!document.getElementById('fx')) { const fx = document.createElement('div'); fx.id = 'fx'; document.body.appendChild(fx); }
  const saved = load();
  if (saved && saved.v === 2) { s = G.migrate(saved); render(); } else newGame();
  window.__lifeceo = { get state() { return s; }, newGame, render };
})();
