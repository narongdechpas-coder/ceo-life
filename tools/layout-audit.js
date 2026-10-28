// ตรวจการแสดงผลทุกหน้า ทุกขนาดจอ หาข้อความล้น ซ้อน หรือถูกตัด — รัน: node tools/layout-audit.js [โฟลเดอร์ screenshot] [จำนวนเกมต่อจอ]
// ต่างจาก ui-test ตรงที่ตรวจละเอียดระดับชิ้นส่วน (เนื้อหาการ์ดล้นใต้ footer, ปุ่มสูงเกินเนื้อหา, modal ล้นจอ)
const { chromium } = require('playwright');
const path = require('path');
const OUT = process.argv[2] || require('os').tmpdir();
const GAMES = Number(process.argv[3]) || 1;
const URL = 'file://' + path.resolve(__dirname, '../index.html');
const CASES = [
  ['desktop-1920', { viewport: { width: 1920, height: 910 } }],
  ['desktop', { viewport: { width: 1280, height: 800 } }],
  ['tablet', { viewport: { width: 768, height: 1000 } }],
  ['mobile-414', { viewport: { width: 414, height: 800 }, deviceScaleFactor: 2.5, hasTouch: true }],
  ['mobile', { viewport: { width: 375, height: 740 }, hasTouch: true }],
  ['mobile-small', { viewport: { width: 360, height: 640 }, hasTouch: true }],
  ['mobile-chrome', { viewport: { width: 393, height: 660 }, hasTouch: true }],
  ['phone-desktop-mode', { viewport: { width: 980, height: 2122 }, screen: { width: 393, height: 851 }, hasTouch: true }],
];

// รันในหน้าเว็บ: คืนรายการปัญหาที่เห็นตอนนี้
function inspect(where) {
  const out = [];
  const R = el => el.getBoundingClientRect();
  const name = el => (el.querySelector('h3, b') || el).textContent.trim().slice(0, 24);
  const vw = document.documentElement.clientWidth;
  // โหมด zoom (มือถือที่บังคับเดสก์ท็อป): ขนาดบนจอ = ค่าใน CSS × z
  const z = document.documentElement.classList.contains('zoomed') ? Number(getComputedStyle(document.documentElement).getPropertyValue('--z')) || 1 : 1;
  if (document.documentElement.scrollWidth > vw + 1) out.push(`${where}: หน้าล้นแนวนอน ${document.documentElement.scrollWidth - vw}px`);
  // เนื้อหาในการ์ดต้องอยู่ในพื้นที่ของตัวเอง ไม่ล้นลงไปใต้ footer
  for (const c of document.querySelectorAll('.table .tcard')) {
    const pb = c.querySelector('.pbody');
    if (!pb) continue;
    const kids = [...pb.children].filter(k => k.offsetParent);
    const bottom = Math.max(...kids.map(k => R(k).bottom));
    if (bottom > R(pb).bottom + 1) out.push(`${where}: การ์ด ${name(c)} เนื้อหาล้นใต้ footer ${Math.round(bottom - R(pb).bottom)}px`);
    if (c.scrollHeight > c.clientHeight + 1) out.push(`${where}: การ์ด ${name(c)} ล้น ${c.scrollHeight - c.clientHeight}px`);
    if (c.classList.contains('scrolly')) out.push(`${where}: การ์ด ${name(c)} ต้องเลื่อนในการ์ด`);
  }
  // การ์ดไม่ทับแถบบนหรือ dock
  const top = document.querySelector('.topbar'), dock = document.querySelector('.dock');
  for (const c of document.querySelectorAll('.table .tcard:not(.fx-clone)')) {
    const r = R(c);
    if (r.right < 0 || r.left > vw) continue;
    if (dock && r.bottom > R(dock).top + 1) out.push(`${where}: การ์ด ${name(c)} ทับ dock ${Math.round(r.bottom - R(dock).top)}px`);
    if (top && r.top < R(top).bottom - 1) out.push(`${where}: การ์ด ${name(c)} ทับแถบบน`);
  }
  // ปุ่มทุกแบบ: ข้อความต้องไม่ล้นออกนอกปุ่ม
  for (const b of document.querySelectorAll('.out, .opt, .act, .pick, .btn')) {
    if (!b.offsetParent) continue;
    if (b.scrollWidth > b.clientWidth + 1) out.push(`${where}: ปุ่ม "${name(b)}" ข้อความล้นแนวนอน ${b.scrollWidth - b.clientWidth}px`);
    if (b.scrollHeight > b.clientHeight + 1 && getComputedStyle(b).overflowY !== 'visible') out.push(`${where}: ปุ่ม "${name(b)}" ข้อความถูกตัด`);
  }
  // ปุ่มกิจกรรม: ทุกใบสูงเท่ากันได้ แต่ต้องไม่สูงกว่าปุ่มทั่วไป (มัธยฐานของเนื้อหา) เกิน 8px และชื่ออยู่บรรทัดเดียว
  const acts = [...document.querySelectorAll('.dock-acts .act')];
  if (acts.length) {
    const need = acts.map(a => {
      const parts = [a.querySelector('.act-ico'), ...a.querySelectorAll('.act-main > *')].filter(k => k && k.offsetParent);
      return Math.max(...parts.map(k => R(k).bottom)) - R(a).top + parseFloat(getComputedStyle(a).paddingBottom);
    });
    const typical = [...need].sort((x, y) => x - y)[Math.floor(need.length / 2)];
    const h = Math.max(...acts.map(a => R(a).height));
    if (h - typical > 8 * z) out.push(`${where}: ปุ่มกิจกรรมสูงเกินปกติ ${Math.round(h - typical)}px เพราะ ${acts[need.indexOf(Math.max(...need))].dataset.act}`);
    for (const a of acts) {
      const t = a.querySelector('.act-main b');
      if (t && t.scrollWidth > t.clientWidth + 1) out.push(`${where}: ชื่อปุ่ม ${a.dataset.act} ถูกตัดเป็น ...`);
      if (t && t.getClientRects().length && R(t).height > parseFloat(getComputedStyle(t).lineHeight) * z * 1.5) out.push(`${where}: ชื่อปุ่ม ${a.dataset.act} ตัดสองบรรทัด`);
    }
  }
  // modal และ sheet ต้องอยู่ในจอทั้งใบ
  for (const m of document.querySelectorAll('#modal-root .ecard, #modal-root .sheet')) {
    const r = R(m);
    if (r.top < -1 || r.bottom > innerHeight + 1 || r.left < -1 || r.right > vw + 1) out.push(`${where}: ${m.className.split(' ')[0]} ${m.className.split(' ')[1] || ''} ล้นจอ (${Math.round(r.top)}..${Math.round(r.bottom)} / ${innerHeight})`);
    for (const el of m.querySelectorAll('*')) {
      if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX === 'visible' && el.clientWidth) { out.push(`${where}: ใน ${m.className.split(' ')[0]} "${el.textContent.trim().slice(0, 20)}" ล้นแนวนอน`); break; }
    }
  }
  return out;
}

(async () => {
  const browser = await chromium.launch();
  const all = [];
  // ONLY=tablet,mobile ตรวจเฉพาะบางจอ
  const only = (process.env.ONLY || '').split(',').filter(Boolean);
  for (const [vp, opts] of CASES.filter(c => !only.length || only.includes(c[0]))) {
    for (let g = 0; g < GAMES; g++) {
      const page = await browser.newPage(opts);
      const found = new Set(), errors = [];
      const add = list => list.forEach(x => found.add(x));
      const shots = new Set();
      const look = async (where, shot) => {
        const list = await page.evaluate(inspect, where);
        add(list);
        if (list.length && shot && !shots.has(shot)) { shots.add(shot); await page.screenshot({ path: `${OUT}/audit-${vp}-${shot}.png` }); }
      };
      page.on('pageerror', e => errors.push(e.message));
      page.on('dialog', d => d.accept());
      await page.goto(URL);
      await page.evaluate(() => localStorage.clear()); await page.reload();
      await look('หน้าเลือก', 'setup');
      await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]');
      await page.fill('#pname', 'ศักดิ์สิทธิ์ชัยวัฒนาพงษ์'); await look('ใส่ชื่อ', 'name');
      await page.click('#name-form [type=submit]');
      const st = () => page.evaluate(() => { const s = window.__lifeceo.state; return { phase: s.phase, round: s.round, time: s.time, kind: s.phase === 'event' ? window.LifeCEO.currentCard(s).kind : '' }; });
      let menusDone = false;
      for (let step = 0; step < 500; step++) {
        const { phase, round, time, kind } = await st();
        if (phase === 'end') break;
        await page.waitForTimeout(120);
        const where = `บท ${round} ${phase === 'event' ? kind : phase}`;
        await look(where, phase === 'event' ? kind : phase);
        if (phase === 'event') { await page.locator('.opt:not([disabled])').first().click(); continue; }
        if (phase === 'opportunity') { await page.locator('[data-opp]:not([disabled])').first().click(); continue; }
        if (!menusDone && round >= 2) {
          menusDone = true;
          for (const k of ['goal', 'career', 'echo', 'log', 'menu']) {
            await page.evaluate(k => { window.__lifeceo.ui.sheet = k; window.__lifeceo.render(); }, k);
            await look(`sheet ${k}`, `sheet-${k}`);
          }
          for (const k of ['rules', 'invest', 'repay', 'install']) {
            await page.evaluate(k => { const u = window.__lifeceo.ui; u.sheet = null; u.modal = k; window.__lifeceo.render(); }, k);
            await look(`modal ${k}`, `modal-${k}`);
          }
          await page.evaluate(() => { const u = window.__lifeceo.ui; u.sheet = null; u.modal = null; window.__lifeceo.render(); });
          const all = page.locator('[data-do="showall"]');
          if (await all.count()) { await all.click(); await look(`บท ${round} ดูทั้งหมด`, 'showall'); await all.click(); }
          continue;
        }
        const outs = page.locator('.out[data-proj]:not([disabled])');
        if (time > 0 && await outs.count() && step % 3 === 0) { await outs.last().click(); await page.waitForTimeout(1000); continue; }
        const act = async id => { const l = page.locator(`[data-act="${id}"]:not([disabled])`); if (time > 0 && await l.count()) { await l.click(); if (id === 'invest') await page.click('[data-amount]'); return true; } return false; };
        if (step % 5 === 1 && await act('explore')) continue;
        if (step % 7 === 2 && await act('invest')) continue;
        if (step % 2 && await act('relate')) continue;
        if (await act('rest')) continue;
        await page.click('[data-do="end"]');
      }
      await page.waitForTimeout(300);
      await look('หน้าสรุป', 'end');
      // รวมปัญหาเดียวกันที่เจอหลายจุด แสดงจำนวนครั้งและตัวอย่างจุดแรก
      const groups = new Map();
      for (const x of found) {
        const [where, what] = x.split(/: (.+)/);
        const key = what.replace(/\d+px/g, 'Npx');
        const gr = groups.get(key) || { what, where, n: 0 };
        gr.n++; groups.set(key, gr);
      }
      const list = [...groups.values()].map(gr => `${gr.what} — ${gr.where}${gr.n > 1 ? ` (+${gr.n - 1} จุด)` : ''}`);
      if (errors.length) list.push(`error: ${errors.join(' | ')}`);
      console.log(`${vp}${GAMES > 1 ? ` #${g + 1}` : ''}: ${list.length ? '\n  - ' + list.join('\n  - ') : 'ผ่าน'}`);
      all.push(...list);
      await page.close();
    }
  }
  await browser.close();
  process.exit(all.length ? 1 : 0);
})();
