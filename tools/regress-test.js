// ทดสอบบั๊กที่เคยเจอบนเครื่องจริง — รัน: node tools/regress-test.js
// 1) save จากเวอร์ชันก่อน (ไม่มี story/echoLinks/snaps) ต้องเล่นต่อได้ และ ⚡ ต้องไม่โดนหักซ้ำ
// 2) engine พังกลางคำสั่ง ต้องคืน state เดิมทั้งหมด
// 3) ฟอนต์จริงโหลดทีหลังจนตัวหนังสือสูงขึ้น การ์ดต้องปรับขนาดใหม่ และทุกทางเลือกต้องกดได้
const { chromium } = require('playwright');
const path = require('path');
const URL = 'file://' + path.resolve(__dirname, '../index.html');
const results = [];
const check = (name, ok, detail) => results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);

async function start(page) {
  await page.goto(URL);
  await page.evaluate(() => localStorage.clear()); await page.reload();
  await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]'); await page.fill('#pname', 'แจ็ค'); await page.click('#name-form [type=submit]');
}
const st = page => page.evaluate(() => { const s = window.__lifeceo.state; return { phase: s.phase, round: s.round, energy: s.energy, cash: s.cash, pending: s.pending.length }; });

(async () => {
  const browser = await chromium.launch();
  const errors = [];

  // ---------- 1) save เก่า
  {
    const page = await browser.newPage({ viewport: { width: 393, height: 660 }, hasTouch: true });
    page.on('pageerror', e => errors.push(e.message)); page.on('dialog', d => d.accept());
    await start(page);
    await page.evaluate(() => {
      const s = JSON.parse(JSON.stringify(window.__lifeceo.state));
      delete s.story; delete s.echoLinks; delete s.snaps;
      s.pending = [{ kind: 'event', id: 'V103' }]; // “ข้อเสนอที่ปฏิเสธยาก” ใบเดียวกับที่เจอบนเครื่องจริง
      localStorage.setItem('lifeceo.v2.save', JSON.stringify(s));
    });
    await page.reload();
    const before = await st(page);
    // เลือกทางเลือกที่มีต้นทุน ⚡ ถ้ามี (กรณีที่เคยโดนหักซ้ำ)
    const idx = await page.evaluate(() => { const G = window.LifeCEO, s = window.__lifeceo.state; const c = G.currentCard(s).card;
      const i = c.options.findIndex(o => (o.cost && o.cost.energy) && !G.blocker(s, o.cost || {}, o.require));
      return i >= 0 ? i : c.options.findIndex(o => !G.blocker(s, o.cost || {}, o.require)); });
    const cost = await page.evaluate(i => { const G = window.LifeCEO, s = window.__lifeceo.state; return (G.currentCard(s).card.options[i].cost || {}).energy || 0; }, idx);
    await page.click(`.opt[data-opt="${idx}"]`);
    const after = await st(page);
    check('old save: card leaves table', after.pending === before.pending - 1, `pending ${before.pending} → ${after.pending}`);
    check('old save: energy charged once', after.energy === before.energy - cost, `⚡ ${before.energy} → ${after.energy} (cost ${cost})`);
    // เล่นต่อจนจบ
    for (let i = 0; i < 400; i++) {
      const s = await st(page); if (s.phase === 'end') break;
      if (s.phase === 'event') await page.locator('.opt:not([disabled])').first().click();
      else if (s.phase === 'opportunity') await page.locator('[data-opp]').last().click();
      else await page.click('[data-do="end"]');
    }
    check('old save: game reaches the end', (await st(page)).phase === 'end');
    await page.close();
  }

  // ---------- 2) engine พังกลางคำสั่ง
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on('dialog', d => d.accept());
    await start(page);
    const before = await st(page);
    // ทำให้ applyGain ภายใน engine พัง หลังจากหักต้นทุนไปแล้ว
    // จำลองบั๊กแบบที่เจอจริง: หักต้นทุนไปแล้วค่อยพัง
    await page.evaluate(() => { const G = window.LifeCEO; G.__orig = G.chooseOption;
      G.chooseOption = (st) => { st.energy -= 2; st.cash -= 1; throw new Error('boom'); }; });
    await page.locator('.opt:not([disabled])').first().click();
    await page.evaluate(() => { const G = window.LifeCEO; G.chooseOption = G.__orig; });
    const after = await st(page);
    const toast = await page.locator('.toast').first().textContent().catch(() => '');
    check('crash: state rolled back', JSON.stringify(after) === JSON.stringify(before), `${JSON.stringify(before)} → ${JSON.stringify(after)}`);
    check('crash: player told', /ผิดพลาด/.test(toast || ''), toast);
    check('crash: next try works', await page.locator('.opt:not([disabled])').first().click().then(async () => (await st(page)).pending < before.pending));
    await page.close();
  }

  // ---------- 3) ฟอนต์โหลดทีหลัง
  for (const vp of [{ width: 393, height: 660 }, { width: 1280, height: 800 }]) {
    const page = await browser.newPage({ viewport: vp, hasTouch: vp.width < 700 });
    page.on('dialog', d => d.accept());
    await start(page);
    // จำลองฟอนต์จริงที่สูงกว่าฟอนต์สำรอง
    await page.addStyleTag({ content: 'body { line-height: 1.75 !important; } .opt b, .out b, .story, .chip { letter-spacing: .02em; }' });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.table .tcard')];
      const over = cards.filter(c => c.scrollHeight > c.clientHeight + 1).length;
      // ทุกปุ่มทางเลือกที่กดได้ ต้องเลื่อนมาให้เห็นในกรอบการ์ดได้
      let unreachable = 0;
      for (const b of document.querySelectorAll('.table .opt:not([disabled]), .table .out:not([disabled])')) {
        b.scrollIntoView({ block: 'nearest' });
        const card = b.closest('.tcard').getBoundingClientRect(), r = b.getBoundingClientRect();
        if (r.bottom > card.bottom + 1 || r.top < card.top - 1) unreachable++;
      }
      return { over, unreachable, scrolly: document.querySelectorAll('.tcard.scrolly').length };
    });
    check(`late fonts ${vp.width}x${vp.height}: every option reachable`, r.over === 0 && r.unreachable === 0, JSON.stringify(r));
    await page.close();
  }

  // ---------- 3b) ฟอนต์หัวการ์ดโหลดทีหลัง ทำให้ชื่อการ์ดบางใบตัด 2 บรรทัด
  {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on('dialog', d => d.accept());
    await start(page);
    await page.locator('.opt:not([disabled])').first().click(); await page.waitForTimeout(800);
    await page.evaluate(() => { const s = window.__lifeceo.state; s.cash = 60; s.energy = 7; s.time = 4; s.flags.advanced = [];
      s.projects = { P08: { level: 0, choices: [] }, P07: { level: 0, choices: [] }, P11: { level: 0, choices: [] } }; s.market = ['P10', 'P02'];
      window.__lifeceo.render(); });
    // ฟอนต์จริงกว้างกว่า → หัวการ์ดตัดบรรทัด แล้วเบราว์เซอร์แจ้งว่าโหลดฟอนต์เสร็จ
    await page.addStyleTag({ content: '.pcard-head h3 { letter-spacing: .12em !important; }' });
    await page.evaluate(() => document.fonts.dispatchEvent(new Event('loadingdone')));
    await page.waitForTimeout(200);
    const r = await page.evaluate(() => {
      const arts = [...document.querySelectorAll('.table .tcard .art')].filter(a => a.offsetParent);
      const card = a => a.closest('.tcard').getBoundingClientRect().top;
      return { tops: [...new Set(arts.map(a => Math.round(a.getBoundingClientRect().top - card(a))))],
        heights: [...new Set(arts.map(a => Math.round(a.getBoundingClientRect().height)))],
        over: [...document.querySelectorAll('.table .tcard')].filter(c => c.scrollHeight > c.clientHeight + 1).length };
    });
    check('late heading font: art aligned and same height', r.tops.length <= 1 && r.heights.length <= 1 && r.over === 0, JSON.stringify(r));
    await page.close();
  }

  // ---------- 4) ปุ่มสุ่มใหม่หน้าเริ่มเกม
  {
    const page = await browser.newPage({ viewport: { width: 393, height: 660 }, hasTouch: true });
    page.on('pageerror', e => errors.push(e.message)); page.on('dialog', d => d.accept());
    await page.goto(URL); await page.evaluate(() => localStorage.clear()); await page.reload();
    const ids = () => page.evaluate(() => [...document.querySelectorAll('[data-pick-goal],[data-pick-career]')].map(b => b.dataset.pickGoal || b.dataset.pickCareer));
    const before = await ids();
    await page.click('[data-pick-goal]');
    await page.click('[data-do="reroll"]');
    const after = await ids();
    check('reroll: 3+3 new cards, none repeated', after.length === 6 && after.every(id => !before.includes(id)), `${before} → ${after}`);
    check('reroll: earlier pick cleared', await page.locator('.pick.sel').count() === 0);
    check('reroll: button disabled after use', await page.locator('[data-do="reroll"]').isDisabled());
    await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]'); await page.fill('#pname', 'แจ็ค'); await page.click('#name-form [type=submit]');
    check('reroll: game starts with a rerolled goal', await page.evaluate(a => a.includes(window.__lifeceo.state.goalId), after));
    await page.screenshot({ path: require('os').tmpdir() + '/reroll.png' });
    await page.close();
  }

  // ---------- 6) ชื่อตัวละคร: ย้อนกลับได้ เว้นว่างได้ ตัด HTML ออก จำชื่อล่าสุด
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(URL); await page.evaluate(() => localStorage.clear()); await page.reload();
    await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]');
    check('name: modal opens on start', await page.locator('#pname').isVisible());
    await page.click('#name-form [data-do="close"]');
    check('name: back keeps setup and picks', await page.evaluate(() => window.__lifeceo.state.phase === 'setup') && await page.locator('.pick.sel').count() === 2);
    await page.click('[data-do="start"]'); await page.fill('#pname', '   '); await page.keyboard.press('Enter');
    check('name: blank name starts game with no name chip', await page.evaluate(() => window.__lifeceo.state.phase !== 'setup' && window.__lifeceo.state.name === '') && await page.locator('.topbar .who').count() === 0);
    await page.evaluate(() => localStorage.removeItem('lifeceo.v2.save')); await page.reload();
    await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]');
    await page.fill('#pname', 'สมชาย<img src=x onerror=alert(1)>'); await page.click('#name-form [type=submit]');
    const nm = await page.evaluate(() => window.__lifeceo.state.name);
    check('name: tags stripped and capped at 20', !/[<>]/.test(nm) && nm.length <= 20 && !(await page.locator('.topbar img').count()), JSON.stringify(nm));
    await page.evaluate(() => localStorage.removeItem('lifeceo.v2.save')); await page.reload();
    await page.click('[data-pick-goal]'); await page.click('[data-pick-career]'); await page.click('[data-do="start"]');
    check('name: last name remembered', (await page.inputValue('#pname')).includes('สมชาย'));
    await page.close();
  }

  check('no page errors', !errors.length, errors.join(' | '));
  console.log(results.join('\n'));
  await browser.close();
  process.exit(results.some(x => x.startsWith('FAIL')) ? 1 : 0);
})();
