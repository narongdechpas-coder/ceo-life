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
  let ui = { modal: null, sheet: null, focus: null, pickGoal: null, pickCareer: null };

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
    return `<section class="dock">
      <div class="dock-acts">${btns}</div>
      <button class="btn dock-end" data-do="end">${s.time > 0 ? `จบรอบ<small>เหลือ ${s.time} ช่อง</small>` : 'จบรอบ →'}</button>
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
        <div><div class="lv-name">${esc(lv.name)}</div>${chips(lv.cost, lv.gain, { require: lv.require })}</div>
        <div class="outs">${outs}</div></li>`;
    }).join('');
    const t = p.tags[0];
    const tags = p.tags.map(x => `<span title="${TAG_TH[x]}">${TAG_ICON[x]}</span>`).join('');
    return `<article class="pcard ${complete ? 'complete' : ''} ${opts && opts.wide ? 'wide' : ''}">
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

  // การ์ดใน carousel: โปรเจกต์ของฉันก่อน แล้วตามด้วยตลาด
  const slides = () => [...Object.keys(s.projects).map(id => ({ id, mine: true })), ...s.market.map(id => ({ id, mine: false }))];

  function cardStrip(list) {
    let html = '', group = null;
    for (const x of list) {
      if (x.mine !== group) { group = x.mine; html += `<span class="strip-label">${x.mine ? 'ของฉัน' : 'ตลาด'}</span>`; }
      const lv = s.projects[x.id] ? s.projects[x.id].level : 0;
      const dots = [0, 1, 2].map(i => `<i class="${i < lv ? 'on' : ''}"></i>`).join('');
      html += `<button class="strip-chip ${ui.focus === x.id ? 'active' : ''}" data-goto="${x.id}">${TAG_ICON[G.PROJECT[x.id].tags[0]]} ${esc(G.PROJECT[x.id].name)}<span class="lvdots">${dots}</span></button>`;
    }
    return `<nav class="strip" id="strip">${html}</nav>`;
  }

  function gameScreen() {
    const list = slides();
    if (!list.some(x => x.id === ui.focus)) ui.focus = list.length ? list[0].id : null;
    return isDesk() ? deskScreen(list) : carouselScreen(list);
  }

  function carouselScreen(list) {
    const dock = s.phase === 'actions' ? actionDock() : '<section class="dock dock-wait">รอเลือกเหตุการณ์…</section>';
    return `<div class="game">
      ${topbar()}
      ${cardStrip(list)}
      <div class="carousel-wrap">
        <button class="nav-arrow prev" data-nav="-1" aria-label="การ์ดก่อนหน้า">‹</button>
        <div class="carousel" id="car">${list.map(x => `<div class="slide" data-id="${x.id}">${projectCard(x.id)}</div>`).join('')}</div>
        <button class="nav-arrow next" data-nav="1" aria-label="การ์ดถัดไป">›</button>
      </div>
      ${dock}
    </div>`;
  }

  // ---------------------------------------------------------------- desktop layout B
  function projectState(id) {
    const prog = s.projects[id];
    const lv = prog ? prog.level : 0;
    if (lv >= 3) return ['done', 'สำเร็จแล้ว'];
    if (s.phase !== 'actions') return ['', ''];
    if (s.flags.advanced.includes(id)) return ['wait', 'ทำแล้วรอบนี้'];
    const why = [0, 1].map(j => G.projectStatus(s, id, j));
    if (why.some(w => !w)) return ['ready', `พร้อมทำ L${lv + 1}`];
    return ['blocked', why[0]];
  }
  function projectList(list) {
    let html = '', group = null;
    for (const x of list) {
      if (x.mine !== group) { group = x.mine; html += `<h4>${x.mine ? 'ของฉัน' : 'ตลาด'}</h4>`; }
      const p = G.PROJECT[x.id];
      const lv = s.projects[x.id] ? s.projects[x.id].level : 0;
      const dots = [0, 1, 2].map(i => `<i class="${i < lv ? 'on' : ''}"></i>`).join('');
      const [cls, label] = projectState(x.id);
      html += `<button class="pitem ${ui.focus === x.id ? 'active' : ''}" data-goto="${x.id}">
        <span class="pi-ico">${TAG_ICON[p.tags[0]]}</span>
        <span class="pi-name">${esc(p.name)}<small class="pi-st ${cls}">${esc(label)}</small></span>
        <span class="lvdots">${dots}</span></button>`;
    }
    return `<nav class="plist">${html}</nav>`;
  }
  function actionPanel() {
    const g = G.GOAL[s.goalId];
    const sum = G.summary(s);
    const goalNow = g.checkFull(sum) ? '✅ บรรลุแล้ว' : g.checkPartial(sum) ? '◐ บางส่วน' : '○ ยังไม่บรรลุ';
    const echo = [1, 2, 3, 4].map(e => `<span>ยุค ${ROMAN[e]} <b>${s.echoQueue[e].length}</b></span>`).join('');
    const pips = Array.from({ length: s.crisis ? 3 : 4 }, (_, i) => `<span class="pip ${i < s.time ? 'on' : ''}"></span>`).join('');
    let acts = '<p class="note wait">รอเลือกเหตุการณ์…</p>';
    if (s.phase === 'actions') {
      acts = D.ACTIONS.filter(a => a.id !== 'project').map(a => {
        const why = G.actionStatus(s, a.id);
        let detail;
        if (ACTION_DESC[a.id]) { const d = ACTION_DESC[a.id](); detail = chips(d.cost, d.gain); }
        else if (a.id === 'promote') { const next = G.career(s).tiers[s.careerTier + 1]; detail = next ? chips({ energy: 1 }, {}, { require: next.require }) : ''; }
        else if (a.id === 'explore') detail = chips({ energy: 1 });
        else if (a.id === 'invest') detail = '<span class="note">🪙 → 📈</span>';
        else detail = '<span class="note">🪙 → ลด 🔗</span>';
        return `<button class="arow" data-act="${a.id}" ${why ? 'disabled' : ''}><b>${esc(a.label)}</b>${detail}${whyTag(why)}</button>`;
      }).join('') + `<button class="btn" data-do="end">${s.time > 0 ? `จบรอบ (เหลือ ${s.time} ช่อง)` : 'จบรอบ →'}</button>`;
    }
    return `<aside class="apanel">
      <div class="ap-head"><h4>ใช้เวลา</h4><span class="time">⏳ ${pips}</span></div>
      <div class="ap-acts">${acts}</div>
      <button class="ap-goal" data-sheet="goal"><b>🎯 ${esc(g.name)}</b><span>${goalNow}</span></button>
      <button class="ap-echo" data-sheet="echo">🔮 ${echo}</button>
    </aside>`;
  }
  function deskScreen(list) {
    return `<div class="game">
      ${topbar()}
      <div class="desk-main">
        ${projectList(list)}
        <main class="focus">${ui.focus ? projectCard(ui.focus, { wide: true }) : ''}</main>
        ${actionPanel()}
      </div>
    </div>`;
  }

  // ---------------------------------------------------------------- fit: ข้อความต้องครบ ไม่มี scroll
  function fitCards() {
    document.querySelectorAll('.pcard').forEach(c => {
      c.classList.remove('dense');
      const art = c.querySelector('.art');
      const overflow = c.scrollHeight > c.clientHeight + 1;
      if (overflow || (art && !c.classList.contains('wide') && art.getBoundingClientRect().height < 40)) c.classList.add('dense');
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

  // ---------------------------------------------------------------- carousel position
  function slideEl(id) { return document.querySelector(`.slide[data-id="${id}"]`); }
  function scrollToSlide(id, smooth) {
    const car = document.getElementById('car'), el = slideEl(id);
    if (car && el) car.scrollTo({ left: el.offsetLeft - car.offsetLeft - (car.clientWidth - el.clientWidth) / 2 * (isMobile() ? 1 : 0), behavior: smooth ? 'smooth' : 'auto' });
  }
  function markFocus(id) {
    ui.focus = id;
    document.querySelectorAll('.strip-chip').forEach(b => b.classList.toggle('active', b.dataset.goto === id));
    const chip = document.querySelector(`.strip-chip[data-goto="${id}"]`);
    if (chip) chip.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  function bindCarousel() {
    const car = document.getElementById('car');
    if (!car) return;
    scrollToSlide(ui.focus, false);
    let t = null;
    car.addEventListener('scroll', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        // ใช้ getBoundingClientRect ทั้งคู่ จะได้อยู่หน่วยเดียวกันแม้มี zoom
        const cr = car.getBoundingClientRect();
        const mid = isMobile() ? cr.left + cr.width / 2 : cr.left + 40;
        let best = null, dist = Infinity;
        car.querySelectorAll('.slide').forEach(el => {
          const r = el.getBoundingClientRect();
          const d = Math.abs((isMobile() ? r.left + r.width / 2 : r.left) - mid);
          if (d < dist) { dist = d; best = el.dataset.id; }
        });
        if (best && best !== ui.focus) markFocus(best);
      }, 80);
    }, { passive: true });
  }

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
    else if (s.phase === 'event') m = eventModal();
    else if (s.phase === 'opportunity') m = oppModal();
    modalRoot.innerHTML = m;
    const lg = document.getElementById('log'); if (lg) lg.scrollTop = lg.scrollHeight;
    bindCarousel();
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
    ui = { modal: null, sheet: null, focus: null, pickGoal: null, pickCareer: null };
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
    if (d.goto) {
      if (isDesk()) { ui.focus = d.goto; render(); return; }
      markFocus(d.goto); scrollToSlide(d.goto, true); return;
    }
    if (d.nav) {
      const list = slides(); const i = list.findIndex(x => x.id === ui.focus);
      const next = list[Math.max(0, Math.min(list.length - 1, i + Number(d.nav)))];
      if (next) { markFocus(next.id); scrollToSlide(next.id, true); }
      return;
    }
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
    if (d.proj) { ui.focus = d.proj; run(G.doAction(s, 'project', { id: d.proj, outcome: Number(d.out) })); }
  });

  document.addEventListener('keydown', ev => {
    if (!s || !isDesk() || modalRoot.innerHTML || !['ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    const list = slides(); const i = list.findIndex(x => x.id === ui.focus);
    const next = list[Math.max(0, Math.min(list.length - 1, i + (ev.key === 'ArrowDown' ? 1 : -1)))];
    if (next && next.id !== ui.focus) { ev.preventDefault(); ui.focus = next.id; render(); }
  });

  // ---------------------------------------------------------------- boot
  const saved = load();
  if (saved && saved.v === 2) { s = saved; render(); } else newGame();
  window.__lifeceo = { get state() { return s; }, newGame, render };
})();
