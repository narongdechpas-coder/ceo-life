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
      return `<button class="act" data-act="${a.id}" ${why ? 'disabled' : ''}><b>${esc(a.label)}</b>${detail}${whyTag(why)}</button>`;
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
    return `<article class="tcard pcard ${complete ? 'complete' : ''} ${why ? 'unplayable' : ''}">
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
    return `<h3>เมนู</h3><button class="btn ghost" data-do="rules">สรุปกติกา</button><button class="btn ghost" data-do="new">เริ่มเกมใหม่</button>`;
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
    return `<article class="tcard ecard2 ${tone}">
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
    return `<article class="tcard ecard2 opp">
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
      <div><button class="btn" data-do="start" ${ui.pickGoal && ui.pickCareer ? '' : 'disabled'}>เริ่มชีวิต →</button>
      <p class="note">เริ่มต้น: 🪙 ${D.START.cash} · ❤️ ${D.START.health} · 👥 ${D.START.rel} · 📖 ${D.START.skills} · ค่าครองชีพ ${D.START.expenses}/รอบ</p></div>
    </main>`;
  }

  function endScreen() {
    const f = s.final;
    const rows = f.rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v > 0 ? '+' : ''}${v}</td></tr>`).join('');
    let story = '', cur = '';
    for (const l of s.log) {
      if (l.tone === 'era') { story += `${cur ? '</div>' : ''}<h3 style="margin-top:12px;color:var(--sage-dark)">${esc(l.text)}</h3><div class="log" style="max-height:none">`; cur = 1; continue; }
      if (['key', 'good', 'bad', 'echo'].includes(l.tone)) story += `<p class="${l.tone}"><small>บท ${l.round}</small> ${esc(l.text)}</p>`;
    }
    if (cur) story += '</div>';
    return `<main class="hero">
      <div><h1>${s.gameOver === 'crisis' ? 'ชีวิตต้องเริ่มต้นใหม่' : 'จบชีวิตทั้ง 8 บท'}</h1>
        <p><span class="tier-badge">${esc(f.tier)}</span> <span class="note">ช่วงคะแนนของแต่ละระดับยังเป็นค่าชั่วคราว</span></p></div>
      <section class="panel"><table class="score-table">${rows}<tr class="total"><td>รวม</td><td>${f.total}</td></tr></table></section>
      <section class="panel"><div class="section-title"><h2>เรื่องราวชีวิตของคุณ</h2></div>${story}</section>
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
          <div class="table-cards" id="cards">${v.cards.join('') || `<p class="table-empty">${esc(v.empty || '')}</p>`}</div>
        </main>
        ${isDesk() ? sidePanel() : ''}
      </div>
      ${actionDock()}
    </div>`;
  }

  // ---------------------------------------------------------------- fit: ข้อความต้องครบ ไม่มี scroll
  function fitCards() {
    document.querySelectorAll('.tcard').forEach(c => {
      c.classList.remove('dense');
      // ภาพหดได้เอง จึงซ่อนภาพ (dense) เฉพาะตอนที่ข้อความยังล้นจริง
      if (c.scrollHeight > c.clientHeight + 1) c.classList.add('dense');
    });
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

  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
  }
  function run(err) { if (err) toast(err); render(); }

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
    if (d.do === 'showall') { ui.showAll = ui.showAll === s.round ? 0 : s.round; render(); return; }
    if (d.do === 'new') { ui.sheet = null; if (s.phase === 'setup' || s.phase === 'end' || confirm('เริ่มเกมใหม่? เกมที่เล่นอยู่จะหายไป')) newGame(); return; }
    if (d.do === 'rules') { ui.sheet = null; ui.modal = 'rules'; render(); return; }
    if (d.do === 'close') { ui.modal = null; ui.sheet = null; render(); return; }
    if (d.do === 'start') { run(G.chooseSetup(s, ui.pickGoal, ui.pickCareer)); return; }
    if (d.do === 'end') {
      if (s.time > 0 && !confirm(`ยังเหลือเวลา ${s.time} ช่อง จบรอบเลยไหม`)) return;
      run(G.endRound(s)); return;
    }
    if (d.pickGoal) { ui.pickGoal = d.pickGoal; render(); return; }
    if (d.pickCareer) { ui.pickCareer = d.pickCareer; render(); return; }
    if (d.opt !== undefined) { run(G.chooseOption(s, Number(d.opt))); return; }
    if (d.opp !== undefined) { run(G.takeOpportunity(s, d.opp || null)); return; }
    if (d.amount) {
      const v = Number(document.getElementById('amt').value);
      ui.modal = null; run(G.doAction(s, d.amount, { amount: v })); return;
    }
    if (d.act) {
      if (d.act === 'invest' || d.act === 'repay') { ui.modal = d.act; render(); return; }
      run(G.doAction(s, d.act)); return;
    }
    if (d.proj) {
      const err = G.doAction(s, 'project', { id: d.proj, outcome: Number(d.out) });
      render();
      // การ์ดจะออกจากโต๊ะ (ทำได้ 1 ขั้นต่อรอบ) จึงบอกผลสั้นๆ
      toast(err || s.log[s.log.length - 1].text);
    }
  });

  // ---------------------------------------------------------------- boot
  const saved = load();
  if (saved && saved.v === 2) { s = saved; render(); } else newGame();
  window.__lifeceo = { get state() { return s; }, newGame, render };
})();
