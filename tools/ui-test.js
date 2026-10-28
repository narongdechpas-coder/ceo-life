// ทดสอบหน้าเกมใน Chromium ครบ 8 บท 6 แบบจอ (รวมมือถือที่เบราว์เซอร์บังคับโหมดเดสก์ท็อป) — รัน: node tools/ui-test.js [โฟลเดอร์เก็บ screenshot]
const { chromium } = require('playwright');
const path = require('path');
const OUT = process.argv[2] || require('os').tmpdir();
const URL = 'file://' + path.resolve(__dirname, '../index.html');
(async () => {
  const browser = await chromium.launch();
  const CASES = [
    ['desktop-1920', { viewport: { width: 1920, height: 910 } }],
    ['desktop', { viewport: { width: 1280, height: 800 } }],
    ['tablet', { viewport: { width: 768, height: 1000 } }],
    ['mobile', { viewport: { width: 375, height: 740 }, hasTouch: true }],
    ['mobile-small', { viewport: { width: 360, height: 640 }, hasTouch: true }],
    // มือถือจอกว้าง 393px ที่เบราว์เซอร์วาดหน้า 980px แล้วย่อให้พอดีจอ (เคสที่เจอบนเครื่องจริง)
    ['phone-desktop-mode', { viewport: { width: 980, height: 2122 }, screen: { width: 393, height: 851 }, hasTouch: true }],
  ];
  for (const [name, opts] of CASES) {
    const page = await browser.newPage(opts);
    const errors = [], problems = [];
    const problem = p => { if (!problems.includes(p)) problems.push(p); };
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|net::|ERR_/.test(m.text())) errors.push(m.text()); });
    page.on('dialog', d => d.accept());
    await page.goto(URL);
    await page.evaluate(() => localStorage.clear()); await page.reload();
    const picks = await page.locator('[data-pick-goal]').count() + 'x' + await page.locator('[data-pick-career]').count();
    if (picks !== '3x3') problem(`setup choices ${picks}`);
    await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]');

    const st = () => page.evaluate(() => { const s = window.__lifeceo.state; return { phase: s.phase, round: s.round, time: s.time }; });
    const geom = () => page.evaluate(() => ({
      vh: document.documentElement.scrollHeight - innerHeight, hx: document.documentElement.scrollWidth - innerWidth,
      // การ์ดและแผงข้างต้องไม่มีเนื้อหาล้น (ข้อความครบ ไม่มี scroll)
      over: [...document.querySelectorAll('.tcard, .side')].filter(el => el.scrollHeight > el.clientHeight + 1)
        .map(el => `${el.querySelector('h3') ? el.querySelector('h3').textContent : el.className} +${el.scrollHeight - el.clientHeight}px`),
      desk: document.documentElement.classList.contains('desk'),
      showAll: (document.querySelector('[data-do="showall"]') || {}).textContent === 'ดูเฉพาะที่เล่นได้',
      // ทุก Project บนโต๊ะต้องมีทางเลือกที่กดได้ (เว้นแต่อยู่ในโหมดดูทั้งหมด)
      deadCards: [...document.querySelectorAll('.table .pcard')].filter(c => !c.querySelector('.out:not([disabled])')).length,
      endDisabled: document.querySelector('[data-do="end"]').disabled,
    }));
    const wantDesk = name.startsWith('desktop');
    const shots = new Set();
    let lookDone = false, showAllChecked = false;
    for (let step = 0; step < 500; step++) {
      const { phase, round, time } = await st();
      if (phase === 'end') break;
      const g = await geom();
      if (g.vh > 0 || g.hx > 0) problem(`${phase}@${round} page scroll v${g.vh} h${g.hx}`);
      if (g.over.length) problem(`${phase}@${round} overflow ${g.over.join(', ')}`);
      if (g.desk !== wantDesk) problem(`layout desk=${g.desk} expected ${wantDesk}`);
      if (phase !== 'actions' && !g.endDisabled) problem(`end button enabled during ${phase}`);
      if (phase === 'actions' && !g.showAll && g.deadCards) problem(`${g.deadCards} unplayable card(s) on table @${round}`);
      const shot = async key => { if (!shots.has(key)) { shots.add(key); await page.screenshot({ path: `${OUT}/t-${name}-${key}.png` }); } };

      if (phase === 'event') { await shot('event'); await page.locator('.opt:not([disabled])').first().click(); continue; }
      if (phase === 'opportunity') { await shot('opp'); await page.locator('[data-opp]:not([disabled])').first().click(); continue; }

      if (!lookDone && await page.locator('.out b').count()) {
        lookDone = true;
        // ขนาดตัวหนังสือที่ตาเห็นจริงบนจอ
        const look = await page.evaluate(() => {
          const z = Number(getComputedStyle(document.documentElement).getPropertyValue('--z')) || 1;
          const shrink = Math.min(1, screen.width / innerWidth);
          const px = sel => { const el = document.querySelector(sel); return el ? +(parseFloat(getComputedStyle(el).fontSize) * z * shrink).toFixed(1) : null; };
          return { mobile: document.documentElement.classList.contains('m'), z: +z.toFixed(2), outText: px('.out b'), chip: px('.chip'), act: px('.dock-acts .act') };
        });
        console.log(name, 'look', JSON.stringify(look));
        if (name.startsWith('phone') || name.startsWith('mobile')) {
          if (!look.mobile) problem('mobile layout not applied');
          if (look.outText < 14 || look.chip < 14 || look.act < 14) problem(`text too small ${JSON.stringify(look)}`);
        }
      }
      if (round >= 3) await shot('play');

      // ปุ่มดูทั้งหมด: ต้องได้การ์ดครบ ของฉัน (ที่ยังไม่จบ) + ตลาด แล้วกดกลับ
      if (!showAllChecked && await page.locator('[data-do="showall"]').count()) {
        showAllChecked = true;
        await page.click('[data-do="showall"]');
        const [n, want] = await page.evaluate(() => { const s = window.__lifeceo.state;
          return [document.querySelectorAll('.table .pcard').length, Object.values(s.projects).filter(p => p.level < 3).length + s.market.length]; });
        if (n !== want) problem(`show all: ${n} cards, expected ${want}`);
        await shot('showall');
        await page.click('[data-do="showall"]');
        continue;
      }

      const outs = page.locator('.out[data-proj]:not([disabled])');
      if (time > 0 && await outs.count() && step % 3 === 0) {
        const pid = await outs.last().getAttribute('data-proj');
        await outs.last().click();
        const still = await page.locator(`.out[data-proj="${pid}"]`).count();
        if (still && !(await geom()).showAll) problem(`card ${pid} still on table after playing it`);
        continue;
      }
      const tryAct = async id => { const l = page.locator(`[data-act="${id}"]:not([disabled])`); if (time > 0 && await l.count()) { await l.click(); if (id === 'invest') await page.click('[data-amount]'); return true; } return false; };
      if (step % 5 === 1 && await tryAct('explore')) continue;
      if (step % 7 === 2 && await tryAct('invest')) continue;
      if (step % 2 && await tryAct('relate')) continue;
      if (await tryAct('rest')) continue;
      await page.click('[data-do="end"]');
    }
    const final = await st();
    console.log(name, final.phase, '| errors', errors.length ? errors : 'none', '| problems', problems.length ? problems.slice(0, 8) : 'none');
    await page.close();
  }
  // sheet บนมือถือ
  const page = await browser.newPage({ viewport: { width: 375, height: 740 } });
  page.on('dialog', d => d.accept());
  await page.goto(URL);
  await page.evaluate(() => localStorage.clear()); await page.reload();
  await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]');
  await page.click('[data-sheet="career"]');
  await page.click('.sheet-overlay', { position: { x: 20, y: 20 } });
  console.log('sheet closes on backdrop:', await page.locator('.sheet').count() === 0);
  await browser.close();
})();
