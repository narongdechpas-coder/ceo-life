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
  let ui = { modal: null, showLog: false, pickGoal: null, pickCareer: null };

  // ---------------------------------------------------------------- save
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch (e) { /* โหมดส่วนตัว */ } }
  function load() { try { const t = localStorage.getItem(SAVE_KEY); return t ? JSON.parse(t) : null; } catch (e) { return null; } }

  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sign = v => (v > 0 ? `+${v}` : `−${Math.abs(v)}`);

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
    const res = [
      ['cash', s.cash], ['energy', `${s.energy}/${cap}`], ['health', s.health, s.health <= 3],
      ['rel', s.rel, s.rel <= 3], ['skills', s.skills], ['stress', s.stress, s.stress >= 5],
      ['debt', s.debt, s.debt > 0], ['portfolio', s.portfolio], ['lp', s.lp],
    ].map(([k, v, warn]) => `<div class="res ${warn ? 'warn' : ''}" title="${NAME[k]}"><span class="v">${ICON[k]} ${v}</span><span class="k">${NAME[k]}</span></div>`).join('');
    const nextIncome = G.salary(s) + G.passive(s);
    return `<header class="topbar">
      <div class="topbar-row">
        <div class="brand">LIFE <span>CEO</span></div>
        <div class="chapter"><b>บทที่ ${s.round}/8</b> · ยุค ${ROMAN[e.id]} ${e.name} <span class="long">· อายุ ${e.age}</span></div>
        <div class="time" title="เวลาที่เหลือในรอบนี้">⏳ ${pips}</div>
        <button class="icon-btn" data-do="rules">กติกา</button>
        <button class="icon-btn" data-do="new">เกมใหม่</button>
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
  function actionsPanel() {
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
      return `<button class="act" data-act="${a.id}" ${why ? 'disabled' : ''}><b>${esc(a.label)}</b>${detail}${why ? `<span class="why">${esc(why)}</span>` : ''}</button>`;
    }).join('');
    return `<section class="panel">
      <div class="section-title"><h2>ใช้เวลา</h2><small>เหลือ ${s.time} ช่อง · กิจกรรมละ 1 ช่อง</small></div>
      <div class="actions">${btns}</div>
      <div class="end-row"><button class="btn" data-do="end">${s.time > 0 ? `จบรอบ (ยังเหลือ ${s.time} ช่อง)` : 'จบรอบ →'}</button></div>
    </section>`;
  }

  // ---------------------------------------------------------------- project card
  function projectCard(pid) {
    const p = G.PROJECT[pid];
    const prog = s.projects[pid] || { level: 0, choices: [] };
    const complete = prog.level >= 3;
    const levels = p.levels.map((lv, i) => {
      const n = i + 1;
      const state = i < prog.level ? 'done' : i === prog.level ? 'next' : 'locked';
      let body = '';
      if (state === 'done') {
        const o = lv.outcomes[prog.choices[i]];
        body = `<span class="chosen">✓ ${'AB'[prog.choices[i]]} · ${esc(o.label)}</span>`;
      } else if (state === 'next' && s.phase === 'actions') {
        body = `<div class="outs">${lv.outcomes.map((o, j) => {
          const why = G.projectStatus(s, pid, j);
          return `<button class="out" data-proj="${pid}" data-out="${j}" ${why ? 'disabled' : ''}>
            <span class="ab">${'AB'[j]}</span><b>${esc(o.label)}</b>
            ${chips(o.cost, o.gain, o)}${why ? `<span class="why">${esc(why)}</span>` : ''}</button>`;
        }).join('')}</div>`;
      } else {
        body = `<details class="peek"><summary>${lv.outcomes.map((o, j) => `${'AB'[j]} · ${esc(o.label)}`).join('  /  ')}</summary>
          <div class="outs">${lv.outcomes.map((o, j) => `<div class="out static"><span class="ab">${'AB'[j]}</span><b>${esc(o.label)}</b>${chips(o.cost, o.gain, o)}</div>`).join('')}</div></details>`;
      }
      return `<li class="lv ${state}">
        <span class="lv-badge">L${n}</span>
        <div><div class="lv-name">${esc(lv.name)}</div>${chips(lv.cost, lv.gain, { require: lv.require })}</div>
        ${body}
      </li>`;
    }).join('');
    const t = p.tags[0];
    return `<article class="pcard ${complete ? 'complete' : ''}">
      <header class="pcard-head"><span class="ico">${TAG_ICON[t]}</span><div><h3>${esc(p.en)}</h3><p>${esc(p.name)}</p></div></header>
      <div class="art t-${t}"><span class="ph">${TAG_ICON[t]}</span><img src="assets/art/${pid}.webp" alt="" loading="lazy" onerror="this.remove()"></div>
      <div class="tagrow">${p.tags.map(x => `<span class="tag">${TAG_ICON[x]} ${TAG_TH[x]}</span>`).join('')}</div>
      <ol class="levels">${levels}</ol>
      <footer class="pcard-foot">${complete ? 'COMPLETED' : 'LIFE PROJECT'}</footer>
    </article>`;
  }

  // ---------------------------------------------------------------- side
  function side() {
    const c = G.career(s), g = G.GOAL[s.goalId];
    const tiers = c.tiers.map((t, i) => `<div class="${i === s.careerTier ? 'cur' : ''}"><span>${esc(t.name)}</span><span>🪙${t.salary}${t.perRound && t.perRound.stress ? ' 💢+1' : ''}</span></div>`).join('');
    const sum = G.summary(s);
    const goalNow = g.checkFull(sum) ? '✅ บรรลุแล้ว (ถ้าจบเกมตอนนี้)' : g.checkPartial(sum) ? '◐ บรรลุบางส่วน' : '○ ยังไม่บรรลุ';
    const echo = [1, 2, 3, 4].map(e => `<div>ยุค ${ROMAN[e]}<b>${s.echoQueue[e].length}</b></div>`).join('');
    const logs = s.log.slice(-60).map(l => `<p class="${l.tone}">${l.tone === 'era' ? '' : `<small>บท ${l.round}</small> `}${esc(l.text)}</p>`).join('');
    return `<aside class="side">
      <section class="panel mini"><h3>🎯 ${esc(g.name)}</h3>
        <div class="kv"><span>เต็ม (+10)</span><span>${esc(g.full)}</span></div>
        <div class="kv"><span>บางส่วน (+4)</span><span>${esc(g.partial)}</span></div>
        <div class="note">${goalNow}</div></section>
      <section class="panel mini"><h3>💼 ${esc(c.name)}</h3><div class="tiers">${tiers}</div><div class="note">${esc(c.perkText)}</div></section>
      <section class="panel mini"><h3>🔮 Echo ที่รออยู่</h3><div class="echo-eras">${echo}</div>
        <div class="note">รู้แค่ว่ามีผลรออยู่ ไม่รู้ว่าดีหรือร้าย</div></section>
      <section class="panel mini"><h3>📔 Life Log</h3><div class="log" id="log">${logs}</div></section>
    </aside>`;
  }

  // ---------------------------------------------------------------- modals
  function eventModal() {
    const { kind, card } = G.currentCard(s);
    const cls = kind === 'echo' ? `echo-${card.kind}` : '';
    const label = kind === 'echo' ? (card.kind === 'good' ? 'ECHO · ผลสะท้อนที่ดี' : 'ECHO · ผลสะท้อน') : `LIFE EVENT · ยุค ${ROMAN[card.era]}`;
    const left = s.pending.length > 1 ? ` · เหลืออีก ${s.pending.length - 1} ใบ` : '';
    const opts = card.options.map((o, i) => {
      const why = G.blocker(s, o.cost || {}, o.require);
      return `<button class="opt ${o.regret ? 'regret' : ''}" data-opt="${i}" ${why ? 'disabled' : ''}><b>${esc(o.label)}</b>${chips(o.cost, o.gain, o)}${why ? `<span class="why">${esc(why)}</span>` : ''}</button>`;
    }).join('');
    return `<div class="overlay"><div class="ecard ${cls}" role="dialog" aria-modal="true">
      <div class="ecard-head"><small>${label}${left}</small><h3>${esc(card.title)}</h3></div>
      <div class="ecard-body"><p class="story">${esc(card.story)}</p>${opts}</div></div></div>`;
  }
  function oppModal() {
    const opts = s.oppChoices.map(id => {
      const o = G.OPP[id];
      const why = G.blocker(s, o.cost || {}, o.require);
      return `<button class="opt" data-opp="${id}" ${why ? 'disabled' : ''}><b>${esc(o.title)}</b>${chips(o.cost, o.gain, o)}${why ? `<span class="why">${esc(why)}</span>` : ''}</button>`;
    }).join('');
    return `<div class="overlay"><div class="ecard opp" role="dialog" aria-modal="true">
      <div class="ecard-head"><small>OPPORTUNITY · เลือกได้ 1 ใบ</small><h3>โอกาสที่เข้ามา</h3></div>
      <div class="ecard-body">${opts}<button class="btn ghost" data-opp="">ปล่อยผ่านทั้งหมด</button></div></div></div>`;
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
      <section><div class="section-title"><h2>เลือกเป้าหมายชีวิต</h2><small>จั่วมา 2 ใบ เลือก 1</small></div><div class="pickgrid">${goals}</div></section>
      <section><div class="section-title"><h2>เลือกอาชีพเริ่มต้น</h2><small>จั่วมา 2 ใบ เลือก 1</small></div><div class="pickgrid">${careers}</div></section>
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

  function gameScreen() {
    const mine = Object.keys(s.projects);
    return `${topbar()}
      <div class="layout">
        <div class="main">
          ${s.phase === 'actions' ? actionsPanel() : ''}
          ${mine.length ? `<section><div class="section-title"><h2>Life Projects ของฉัน</h2><small>${s.completed.length} สำเร็จ</small></div><div class="cards">${mine.map(projectCard).join('')}</div></section>` : ''}
          <section><div class="section-title"><h2>ตลาด Life Projects</h2><small>เริ่มโปรเจกต์ = ทำขั้น L1</small></div><div class="cards">${s.market.map(projectCard).join('')}</div></section>
        </div>
        ${side()}
      </div>`;
  }

  // ---------------------------------------------------------------- render
  function render() {
    if (!s) return;
    if (s.phase === 'setup') app.innerHTML = setupScreen();
    else if (s.phase === 'end') app.innerHTML = endScreen();
    else app.innerHTML = gameScreen();
    let m = '';
    if (ui.modal === 'rules') m = rulesModal();
    else if (ui.modal === 'invest' || ui.modal === 'repay') m = amountModal(ui.modal);
    else if (s.phase === 'event') m = eventModal();
    else if (s.phase === 'opportunity') m = oppModal();
    modalRoot.innerHTML = m;
    const lg = document.getElementById('log'); if (lg) lg.scrollTop = lg.scrollHeight;
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
    ui = { modal: null, pickGoal: null, pickCareer: null };
    window.scrollTo(0, 0);
    render();
  }

  // ---------------------------------------------------------------- events
  document.addEventListener('click', ev => {
    const el = ev.target.closest('button');
    if (!el || el.disabled) return;
    const d = el.dataset;
    if (d.do === 'new') { if (s.phase === 'setup' || s.phase === 'end' || confirm('เริ่มเกมใหม่? เกมที่เล่นอยู่จะหายไป')) newGame(); return; }
    if (d.do === 'rules') { ui.modal = 'rules'; render(); return; }
    if (d.do === 'close') { ui.modal = null; render(); return; }
    if (d.do === 'start') { run(G.chooseSetup(s, ui.pickGoal, ui.pickCareer)); return; }
    if (d.do === 'end') {
      if (s.time > 0 && !confirm(`ยังเหลือเวลา ${s.time} ช่อง จบรอบเลยไหม`)) return;
      run(G.endRound(s)); window.scrollTo(0, 0); return;
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
    if (d.proj) { run(G.doAction(s, 'project', { id: d.proj, outcome: Number(d.out) })); }
  });

  // ---------------------------------------------------------------- boot
  const saved = load();
  if (saved && saved.v === 2) { s = saved; render(); } else newGame();
  window.__lifeceo = { get state() { return s; }, newGame, render };
})();
