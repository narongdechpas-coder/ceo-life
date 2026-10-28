// ทดสอบหน้าเกมใน Chromium ครบ 8 บท 3 ขนาดจอ — รัน: node tools/ui-test.js [โฟลเดอร์เก็บ screenshot]
const { chromium } = require('playwright');
const path = require('path');
const OUT = process.argv[2] || require('os').tmpdir();
const URL = 'file://' + path.resolve(__dirname, '../index.html');
(async () => {
  const browser = await chromium.launch();
  for (const [name, vp] of [['desktop', { width: 1280, height: 800 }], ['tablet', { width: 768, height: 1000 }], ['mobile', { width: 375, height: 740 }]]) {
    const page = await browser.newPage({ viewport: vp, hasTouch: name === 'mobile' });
    const errors = [], problems = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|net::|ERR_/.test(m.text())) errors.push(m.text()); });
    page.on('dialog', d => d.accept());
    await page.goto(URL);
    await page.evaluate(() => localStorage.clear()); await page.reload();
    await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]');
    const st = () => page.evaluate(() => { const s = window.__lifeceo.state; return { phase: s.phase, round: s.round, time: s.time }; });
    const geom = () => page.evaluate(() => ({ vh: document.documentElement.scrollHeight - innerHeight, hx: document.documentElement.scrollWidth - innerWidth }));
    let shot = 0, focusChecks = 0;
    for (let step = 0; step < 500; step++) {
      const { phase, round, time } = await st();
      if (phase === 'end') break;
      const g = await geom();
      if (phase !== 'end' && (g.vh > 0 || g.hx > 0)) problems.push(`${phase}@${round} vScroll ${g.vh} hScroll ${g.hx}`);
      if (phase === 'event') { if (!shot++) await page.screenshot({ path: `${OUT}/c-${name}-event.png` }); await page.locator('.opt:not([disabled])').first().click(); continue; }
      if (phase === 'opportunity') { await page.locator('[data-opp]:not([disabled])').first().click(); continue; }
      if (round === 3 && shot === 1) { shot++; await page.screenshot({ path: `${OUT}/c-${name}-play.png` }); }
      const outs = page.locator('.out[data-proj]:not([disabled])');
      if (time > 0 && await outs.count() && step % 3 === 0) {
        const btn = outs.last();
        const pid = await btn.getAttribute('data-proj');
        await page.click(`.strip-chip[data-goto="${pid}"]`); await page.waitForTimeout(400);
        await btn.click(); await page.waitForTimeout(150);
        // หลังเลือก carousel ต้องยังโชว์การ์ดเดิม
        const visible = await page.evaluate(id => { const el = document.querySelector(`.slide[data-id="${id}"]`); const c = document.getElementById('car').getBoundingClientRect(); const r = el.getBoundingClientRect(); return r.left >= c.left - 2 && r.right <= c.right + 2; }, pid);
        focusChecks++; if (!visible) problems.push(`card ${pid} not in view after choosing (round ${round})`);
        continue;
      }
      const tryAct = async id => { const l = page.locator(`[data-act="${id}"]:not([disabled])`); if (time > 0 && await l.count()) { await l.click(); if (id === 'invest') await page.click('[data-amount]'); return true; } return false; };
      if (step % 5 === 1 && await tryAct('explore')) continue;
      if (step % 7 === 2 && await tryAct('invest')) continue;
      if (step % 2 && await tryAct('relate')) continue;
      if (await tryAct('rest')) continue;
      await page.click('[data-do="end"]');
    }
    // sheet
    const final = await st();
    await page.screenshot({ path: `${OUT}/c-${name}-end.png` });
    console.log(name, final.phase, '| focus checks', focusChecks, '| errors', errors.length ? errors : 'none', '| problems', problems.length ? problems.slice(0, 6) : 'none');
    await page.close();
  }
  // sheet + swipe check บนมือถือ
  const page = await browser.newPage({ viewport: { width: 375, height: 740 } });
  page.on('dialog', d => d.accept());
  await page.goto(URL);
  await page.evaluate(() => localStorage.clear()); await page.reload();
  await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]');
  await page.locator('.opt:not([disabled])').first().click();
  await page.screenshot({ path: `${OUT}/c-mobile-start.png` });
  const before = await page.evaluate(() => window.__lifeceo.state && document.querySelector('.strip-chip.active').dataset.goto);
  await page.evaluate(() => document.getElementById('car').scrollBy({ left: 360 }));
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => document.querySelector('.strip-chip.active').dataset.goto);
  await page.click('[data-sheet="career"]'); await page.screenshot({ path: `${OUT}/c-mobile-sheet.png` });
  await page.click('.sheet-overlay', { position: { x: 20, y: 20 } });
  const closed = await page.locator('.sheet').count();
  console.log('swipe changes active chip:', before !== after, `(${before} → ${after})`, '| sheet closes on backdrop:', closed === 0);
  await browser.close();
})();
