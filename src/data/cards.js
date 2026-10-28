/*
 * LIFE CEO — Card Data v0.2
 * ตัวเลขทุกตัวเป็นค่าตั้งต้นเพื่อทดสอบ ยังไม่ผ่านการปรับสมดุล (ดู docs/design-v0.2.md)
 *
 * รูปแบบผล (effect) ใช้ร่วมกันทุกการ์ด
 *   cost    : ต้องจ่ายได้ก่อนถึงจะเลือกได้ (cash, energy)
 *   gain    : ค่าเปลี่ยนแปลง บวกหรือลบ
 *             cash energy health rel skills stress debt portfolio lp
 *             impact  = ★ ที่นับเป็นสาย Impact (เพิ่ม lp ด้วย)
 *             salary  = ปรับเงินเดือนถาวร
 *             ongoing = { ... } ผลที่เกิดทุกต้นรอบ (ช่วงรายได้และภาระ)
 *   require : เงื่อนไขขั้นต่ำ เช่น { skills: 3 } หมายถึง 📖 ≥ 3
 *   echo    : { id, era: '+1' } สอด Echo ลงกองยุคถัดไป (สูงสุดยุค IV)
 *             ถ้าไม่มีรอบเหลือแล้ว Echo ร้ายนับเป็น Regret ทันที
 *   regret  : 1 = เลือกทางนี้ใน Echo ร้ายแล้วค้างเป็น Regret (−2 คะแนนปลายเกม)
 */
(function (root) {
  const ERAS = [
    { id: 1, name: 'เริ่มต้น', age: '22–30', rounds: [1, 2], energyCap: 7 },
    { id: 2, name: 'สร้างตัว', age: '31–40', rounds: [3, 4], energyCap: 6, decay: ['rel'] },
    { id: 3, name: 'จุดสูงสุด', age: '41–50', rounds: [5, 6], energyCap: 6, decay: ['rel', 'health'] },
    { id: 4, name: 'ส่งต่อ', age: '51–60+', rounds: [7, 8], energyCap: 5, decay: ['rel', 'health'] },
  ];

  const START = { cash: 6, health: 7, rel: 5, skills: 1, stress: 0, debt: 0, portfolio: 0, lp: 0, expenses: 3, time: 4 };

  // ---------------------------------------------------------------- Careers
  // perk: learnDiscount | overtimeBonus | pensionEraIV | extraOpportunity | relFree
  const CAREERS = [
    { id: 'C01', name: 'พนักงานบริษัท', perk: null, perkText: 'เส้นทางมาตรฐาน ไม่มีจุดเด่นพิเศษ',
      tiers: [
        { name: 'Junior', salary: 5 },
        { name: 'Senior', salary: 7, require: { skills: 3 } },
        { name: 'Executive', salary: 10, require: { skills: 6, rel: 5 }, perRound: { stress: 1 } },
      ] },
    { id: 'C02', name: 'ข้าราชการ', perk: { pensionEraIV: 3 }, perkText: 'ยุค IV ได้ Passive Income +3 จากบำนาญ',
      tiers: [
        { name: 'ปฏิบัติการ', salary: 4 },
        { name: 'ชำนาญการ', salary: 5, require: { skills: 2 } },
        { name: 'ผู้อำนวยการ', salary: 7, require: { skills: 5, rel: 4 } },
      ] },
    { id: 'C03', name: 'วิศวกรซอฟต์แวร์', perk: { learnDiscount: 1 }, perkText: 'เรียนรู้จ่ายแค่ 1 🪙',
      tiers: [
        { name: 'Developer', salary: 5 },
        { name: 'Senior Engineer', salary: 8, require: { skills: 4 } },
        { name: 'Tech Lead', salary: 11, require: { skills: 7 }, perRound: { stress: 1 } },
      ] },
    { id: 'C04', name: 'พยาบาล', perk: { relFree: true }, perkText: 'เวลากับคนสำคัญไม่เสีย 🪙 แต่ทุกขั้นมี 💢 +1 ต่อรอบ',
      tiers: [
        { name: 'พยาบาลวิชาชีพ', salary: 4, perRound: { stress: 1 } },
        { name: 'หัวหน้าเวร', salary: 6, require: { skills: 3 }, perRound: { stress: 1 } },
        { name: 'หัวหน้าหอผู้ป่วย', salary: 8, require: { skills: 5, rel: 5 }, perRound: { stress: 1 } },
      ] },
    { id: 'C05', name: 'ฟรีแลนซ์ครีเอทีฟ', perk: { overtimeBonus: 2 }, perkText: 'ทำงานล่วงเวลาได้ +5 🪙 แทน +3',
      tiers: [
        { name: 'มือใหม่', salary: 3 },
        { name: 'มีลูกค้าประจำ', salary: 5, require: { skills: 3 } },
        { name: 'สตูดิโอของตัวเอง', salary: 8, require: { skills: 6, rel: 4 } },
      ] },
    { id: 'C06', name: 'เจ้าของร้านค้า', perk: { extraOpportunity: 1 }, perkText: 'สำรวจโอกาสเปิด 3 ใบแทน 2',
      tiers: [
        { name: 'แผงเล็ก', salary: 4 },
        { name: 'หน้าร้าน', salary: 6, require: { skills: 2 } },
        { name: 'หลายสาขา', salary: 9, require: { skills: 5, rel: 5 }, perRound: { stress: 1 } },
      ] },
    { id: 'C07', name: 'ครู', perk: null, perkText: 'ขั้น 2 ขึ้นไปได้ ★ Impact +1 ทุกต้นรอบ',
      tiers: [
        { name: 'ครูผู้ช่วย', salary: 4 },
        { name: 'ครูชำนาญการ', salary: 5, require: { skills: 3 }, perRound: { impact: 1 } },
        { name: 'ผู้อำนวยการโรงเรียน', salary: 7, require: { skills: 6, rel: 5 }, perRound: { impact: 1 } },
      ] },
    { id: 'C08', name: 'นักขาย', perk: { relFree: true }, perkText: 'เวลากับคนสำคัญไม่เสีย 🪙 เลื่อนขั้นต้องใช้ 👥 สูง',
      tiers: [
        { name: 'Sales', salary: 5 },
        { name: 'Key Account', salary: 7, require: { skills: 2, rel: 5 } },
        { name: 'Sales Director', salary: 10, require: { skills: 4, rel: 7 }, perRound: { stress: 1 } },
      ] },
  ];

  // ---------------------------------------------------------------- Life Goals
  // s = สถานะปลายเกม: cash portfolio debt health rel skills stress lp impactLp
  //     careerTier (0–2) passive expenses completed (array ของ project ที่ครบ L3)
  //     oppAccepted burnouts
  const has = (s, tag) => s.completed.some(p => p.tags.includes(tag));
  const GOALS = [
    { id: 'G01', name: 'อิสรภาพทางการเงิน', full: 'Passive Income ≥ ค่าครองชีพ', partial: 'Passive Income ≥ ครึ่งหนึ่ง',
      checkFull: s => s.passive >= s.expenses, checkPartial: s => s.passive * 2 >= s.expenses },
    { id: 'G02', name: 'ผู้เชี่ยวชาญ', full: 'อาชีพขั้นสูงสุด และ 📖 ≥ 8', partial: 'อาชีพขั้น 2 และ 📖 ≥ 6',
      checkFull: s => s.careerTier >= 2 && s.skills >= 8, checkPartial: s => s.careerTier >= 1 && s.skills >= 6 },
    { id: 'G03', name: 'ชีวิตสมดุล', full: '❤️ และ 👥 ≥ 7 และ 💢 ≤ 2', partial: '❤️ และ 👥 ≥ 5',
      checkFull: s => s.health >= 7 && s.rel >= 7 && s.stress <= 2, checkPartial: s => s.health >= 5 && s.rel >= 5 },
    { id: 'G04', name: 'ผู้สร้าง', full: 'Life Project ครบ L3 2 ใบ', partial: 'ครบ 1 ใบ',
      checkFull: s => s.completed.length >= 2, checkPartial: s => s.completed.length >= 1 },
    { id: 'G05', name: 'เสาหลักครอบครัว', full: '👥 ≥ 8 และมีโปรเจกต์ Family ครบ L3', partial: '👥 ≥ 7',
      checkFull: s => s.rel >= 8 && has(s, 'Family'), checkPartial: s => s.rel >= 7 },
    { id: 'G06', name: 'นักสำรวจ', full: 'โปรเจกต์ Travel ครบ L3 และรับโอกาส ≥ 3', partial: 'รับโอกาส ≥ 3',
      checkFull: s => has(s, 'Travel') && s.oppAccepted >= 3, checkPartial: s => s.oppAccepted >= 3 },
    { id: 'G07', name: 'ผู้สร้างผลกระทบ', full: '★ Impact ≥ 6', partial: '★ Impact ≥ 3',
      checkFull: s => s.impactLp >= 6, checkPartial: s => s.impactLp >= 3 },
    { id: 'G08', name: 'อายุยืนอย่างมีคุณภาพ', full: '❤️ ≥ 8 และไม่เคย Burnout', partial: '❤️ ≥ 7',
      checkFull: s => s.health >= 8 && s.burnouts === 0, checkPartial: s => s.health >= 7 },
  ];

  // ---------------------------------------------------------------- Life Projects
  // แต่ละขั้น: cost/gain ของขั้น + outcomes A/B (outcome มี cost เพิ่มได้)
  const PROJECTS = [
    { id: 'P01', name: 'ธุรกิจครอบครัว', en: 'Family Business', tags: ['Family', 'Wealth'], levels: [
      { name: 'เริ่มปรับปรุงกิจการ', cost: { cash: 2, energy: 1 }, outcomes: [
        { label: 'ยอดขายเพิ่ม', gain: { cash: 3 } },
        { label: 'ฐานลูกค้าออนไลน์', gain: { skills: 1, lp: 1 } } ] },
      { name: 'ขยายธุรกิจ', cost: { cash: 3, energy: 2 }, gain: { stress: 1 }, outcomes: [
        { label: 'ขยายสาขา', gain: { ongoing: { cash: 2 } }, echo: { id: 'E15', era: '+1' } },
        { label: 'สร้างทีม', gain: { lp: 2, stress: -1 } } ] },
      { name: 'อนาคตของกิจการ', cost: { cash: 4, energy: 2 }, outcomes: [
        { label: 'ขายกิจการ', gain: { cash: 12, lp: 2, ongoing: { cash: -2 } }, note: 'รายได้ Ongoing จากสาขาหยุด' },
        { label: 'ส่งต่อรุ่นถัดไป', gain: { lp: 4, rel: 1 } } ] },
    ] },
    { id: 'P02', name: 'ปริญญาโท', en: 'Master Degree', tags: ['Skill'], levels: [
      { name: 'สอบเข้า', cost: { cash: 2, energy: 1 }, outcomes: [
        { label: 'ทุนบริษัท (ผูกมัดงาน)', gain: { skills: 1, stress: 1 } },
        { label: 'จ่ายเอง', cost: { cash: 2 }, gain: { skills: 1 } } ] },
      { name: 'เรียนควบงาน', cost: { cash: 3, energy: 2 }, gain: { stress: 1 }, outcomes: [
        { label: 'ทุ่มเพื่อเกรด', gain: { skills: 2, stress: 1 } },
        { label: 'เรียนพอผ่าน มีเวลาให้คนรอบตัว', gain: { skills: 1, rel: 1 } } ] },
      { name: 'วิทยานิพนธ์', cost: { cash: 1, energy: 2 }, outcomes: [
        { label: 'ต่อยอดเป็นธุรกิจ', gain: { lp: 2, ongoing: { cash: 1 } } },
        { label: 'ตีพิมพ์เผยแพร่', gain: { skills: 1, impact: 2 } } ] },
    ] },
    { id: 'P03', name: 'สร้างครอบครัว', en: 'Start a Family', tags: ['Family'], levels: [
      { name: 'แต่งงาน', cost: { cash: 4, energy: 1 }, outcomes: [
        { label: 'จัดงานใหญ่', gain: { rel: 2, lp: 1, debt: 3 } },
        { label: 'งานเรียบง่าย', gain: { rel: 1, lp: 1 } } ] },
      { name: 'มีลูก', cost: { cash: 2, energy: 2 }, outcomes: [
        { label: 'ลาเลี้ยงลูกเอง', gain: { rel: 2, lp: 1, salary: -1 } },
        { label: 'จ้างพี่เลี้ยง', gain: { rel: 1, lp: 1, ongoing: { cash: -1 } } } ] },
      { name: 'ส่งลูกเรียนจบ', cost: { cash: 5, energy: 1 }, outcomes: [
        { label: 'มหาวิทยาลัยเอกชน', cost: { cash: 3 }, gain: { lp: 4, rel: 1 } },
        { label: 'มหาวิทยาลัยรัฐ', gain: { lp: 3 } } ] },
    ] },
    { id: 'P04', name: 'วิ่งมาราธอน', en: 'Marathon', tags: ['Health'], levels: [
      { name: 'เริ่มวิ่ง', cost: { cash: 1, energy: 1 }, outcomes: [
        { label: 'วิ่งคนเดียว', gain: { health: 1, stress: -1 } },
        { label: 'เข้ากลุ่มวิ่ง', cost: { cash: 1 }, gain: { health: 1, rel: 1 } } ] },
      { name: 'ฮาล์ฟมาราธอน', cost: { cash: 1, energy: 2 }, outcomes: [
        { label: 'ฝืนทำเวลา', gain: { health: 1, lp: 2, stress: 1 } },
        { label: 'ค่อยเป็นค่อยไป', gain: { health: 2, lp: 1 } } ] },
      { name: 'ฟูลมาราธอน', cost: { cash: 2, energy: 3 }, outcomes: [
        { label: 'เข้าเส้นชัย', gain: { lp: 3, health: 1, ongoing: { stress: -1 } } },
        { label: 'วิ่งการกุศล', gain: { impact: 3, rel: 1 } } ] },
    ] },
    { id: 'P05', name: 'เที่ยวรอบโลก', en: 'World Travel', tags: ['Travel'], levels: [
      { name: 'ทริปต่างประเทศแรก', cost: { cash: 3, energy: 1 }, outcomes: [
        { label: 'แบ็คแพ็ก', gain: { stress: -2, skills: 1 } },
        { label: 'ทัวร์สบาย', cost: { cash: 2 }, gain: { stress: -3, rel: 1 } } ] },
      { name: 'ใช้ชีวิตต่างแดนช่วงสั้น', cost: { cash: 3, energy: 2 }, outcomes: [
        { label: 'Workation คนเดียว', gain: { skills: 1, lp: 1, rel: -1 } },
        { label: 'พาครอบครัวไปด้วย', cost: { cash: 2 }, gain: { rel: 2, lp: 1 } } ] },
      { name: 'ครบ 30 ประเทศ', cost: { cash: 5, energy: 2 }, outcomes: [
        { label: 'เขียนบันทึกการเดินทาง', gain: { lp: 3, skills: 1 } },
        { label: 'ใช้ชีวิตช้าลง', gain: { lp: 3, stress: -2 } } ] },
    ] },
    { id: 'P06', name: 'บ้านของตัวเอง', en: 'Own a Home', tags: ['Wealth', 'Family'], levels: [
      { name: 'วางเงินดาวน์', cost: { cash: 5, energy: 1 }, outcomes: [
        { label: 'คอนโดในเมือง', gain: { lp: 1, ongoing: { cash: -2 } } },
        { label: 'บ้านชานเมือง (เดินทางไกล)', gain: { lp: 1, rel: 1, ongoing: { cash: -1, stress: 1 } } } ] },
      { name: 'รีโนเวต', cost: { cash: 4, energy: 1 }, outcomes: [
        { label: 'ทำห้องทำงาน', gain: { skills: 1, lp: 1 } },
        { label: 'ทำสวน', gain: { health: 1, stress: -1, lp: 1 } } ] },
      { name: 'ปิดหนี้บ้าน', cost: { cash: 8, energy: 1 }, outcomes: [
        { label: 'อยู่เองอย่างสบายใจ', gain: { lp: 3, ongoing: { cash: 2 } }, note: 'ยกเลิกค่าผ่อนแบบคอนโด' },
        { label: 'ปล่อยเช่า ย้ายไปที่เล็กลง', gain: { lp: 2, ongoing: { cash: 3 } } } ] },
    ] },
    { id: 'P07', name: 'สตาร์ทอัพ', en: 'Startup', tags: ['Wealth', 'Impact'], levels: [
      { name: 'ทดลองไอเดีย', cost: { cash: 2, energy: 2 }, outcomes: [
        { label: 'ทำคนเดียว', gain: { skills: 1, stress: 1 } },
        { label: 'หาหุ้นส่วน', gain: { rel: 1 }, echo: { id: 'E06', era: '+1' } } ] },
      { name: 'ระดมทุน', cost: { energy: 2 }, require: { skills: 4 }, gain: { stress: 1 }, outcomes: [
        { label: 'รับเงินนักลงทุน', gain: { cash: 6, stress: 1 }, echo: { id: 'E16', era: '+1' } },
        { label: 'โตด้วยเงินตัวเอง', cost: { cash: 4 }, gain: { lp: 1, ongoing: { cash: 1 } } } ] },
      { name: 'ทางออกของบริษัท', cost: { energy: 2 }, outcomes: [
        { label: 'ขายบริษัท', gain: { cash: 15, lp: 2 } },
        { label: 'เป็นกิจการเพื่อสังคม', gain: { impact: 4, ongoing: { cash: 2 } } } ] },
    ] },
    { id: 'P08', name: 'อาสาสมัครชุมชน', en: 'Community Volunteer', tags: ['Impact'], levels: [
      { name: 'ลงพื้นที่', cost: { energy: 1 }, outcomes: [
        { label: 'สอนหนังสือเด็ก', gain: { impact: 1, skills: 1 } },
        { label: 'ช่วยงานแรงงาน', gain: { impact: 1, health: 1 } } ] },
      { name: 'ประสานโครงการ', cost: { cash: 1, energy: 2 }, outcomes: [
        { label: 'ลงมือเอง', gain: { impact: 2, rel: 1, stress: 1 } },
        { label: 'ระดมทุนจากเครือข่าย', gain: { impact: 2 }, echo: { id: 'E09', era: '+1' } } ] },
      { name: 'ตั้งมูลนิธิ', cost: { cash: 4, energy: 2 }, outcomes: [
        { label: 'บริหารเอง', gain: { impact: 4, ongoing: { cash: -1 } } },
        { label: 'ส่งต่อให้คนรุ่นใหม่', gain: { impact: 3, rel: 1 } } ] },
    ] },
    { id: 'P09', name: 'เขียนหนังสือ', en: 'Write a Book', tags: ['Skill', 'Impact'], levels: [
      { name: 'เขียนต้นฉบับ', cost: { energy: 2 }, outcomes: [
        { label: 'ตื่นตีห้ามาเขียน', gain: { skills: 1, stress: 1 } },
        { label: 'เขียนวันหยุด', gain: { skills: 1, rel: -1 } } ] },
      { name: 'ตีพิมพ์', cost: { cash: 3, energy: 1 }, outcomes: [
        { label: 'ผ่านสำนักพิมพ์', gain: { lp: 2 } },
        { label: 'ทำเองขายเอง', gain: { stress: 1, ongoing: { cash: 1 } } } ] },
      { name: 'ต่อยอดเป็นคอร์ส', cost: { cash: 2, energy: 2 }, outcomes: [
        { label: 'คอร์สออนไลน์', gain: { lp: 1, ongoing: { cash: 2 } } },
        { label: 'สอนฟรีให้ชุมชน', gain: { impact: 3 } } ] },
    ] },
    { id: 'P10', name: 'อสังหาให้เช่า', en: 'Rental Property', tags: ['Wealth'], levels: [
      { name: 'ศึกษาทำเล', cost: { cash: 1, energy: 1 }, outcomes: [
        { label: 'ลงพื้นที่เอง', gain: { skills: 1 } },
        { label: 'ฟังกูรูแล้วลงทุนกองอสังหา', cost: { cash: 3 }, gain: { portfolio: 3 } } ] },
      { name: 'ซื้อห้องแรก', cost: { cash: 6, energy: 1 }, outcomes: [
        { label: 'กู้เพิ่มซื้อห้องใหญ่', gain: { debt: 6, stress: 1, ongoing: { cash: 3 } } },
        { label: 'ซื้อเงินสดห้องเล็ก', gain: { ongoing: { cash: 1 } } } ] },
      { name: 'ขยายพอร์ต', cost: { cash: 6, energy: 2 }, outcomes: [
        { label: 'ซื้อเพิ่มอีกห้อง', gain: { lp: 1, stress: 1, ongoing: { cash: 3 } } },
        { label: 'ขายทำกำไร', gain: { cash: 10, lp: 1 } } ] },
    ] },
    { id: 'P11', name: 'ดูแลพ่อแม่', en: 'Care for Parents', tags: ['Family'], levels: [
      { name: 'อยู่ใกล้กันมากขึ้น', cost: { cash: 2, energy: 1 }, outcomes: [
        { label: 'ย้ายกลับบ้านเกิด', gain: { rel: 2, stress: 1 } },
        { label: 'ส่งเงินรายเดือน', gain: { rel: 1, ongoing: { cash: -1 } } } ] },
      { name: 'พาเที่ยว', cost: { cash: 3, energy: 2 }, outcomes: [
        { label: 'ทริปครอบครัว', gain: { rel: 2, lp: 1, stress: -1 } },
        { label: 'ทริปตามฝันของพ่อแม่', cost: { cash: 2 }, gain: { lp: 3 } } ] },
      { name: 'ดูแลช่วงสุดท้าย', cost: { energy: 3 }, outcomes: [
        { label: 'ดูแลเอง', gain: { lp: 3, rel: 2, stress: 2 } },
        { label: 'ศูนย์ดูแลผู้สูงอายุ', cost: { cash: 4 }, gain: { lp: 2, rel: 1 } } ] },
    ] },
    { id: 'P12', name: 'ฝึกสติ', en: 'Mindfulness', tags: ['Health'], levels: [
      { name: 'เริ่มนั่งสมาธิ', cost: { energy: 1 }, outcomes: [
        { label: 'ฝึกเองที่บ้าน', gain: { stress: -2 } },
        { label: 'คอร์สเงียบ 3 วัน', cost: { cash: 2 }, gain: { stress: -3, health: 1 } } ] },
      { name: 'ฝึกต่อเนื่อง', cost: { cash: 1, energy: 1 }, outcomes: [
        { label: 'ทำทุกเช้า', gain: { ongoing: { stress: -1 } } },
        { label: 'ฝึกกับครอบครัว', gain: { health: 1, rel: 1 } } ] },
      { name: 'ปฏิบัติธรรม 10 วัน', cost: { cash: 2, energy: 2 }, outcomes: [
        { label: 'เพื่อตัวเอง', gain: { lp: 2, health: 1, ongoing: { stress: -1 } } },
        { label: 'กลับมาสอนผู้อื่น', gain: { impact: 2, rel: 1 } } ] },
    ] },
  ];

  // ---------------------------------------------------------------- Life Events (6 ต่อยุค)
  const EVENTS = [
    // ยุค I
    { id: 'V101', era: 1, title: 'เงินเดือนก้อนแรก', story: 'เงินเดือนเดือนแรกเข้าบัญชี คุณอยากให้มันมีความหมาย', options: [
      { label: 'ซื้อของขวัญให้พ่อแม่', cost: { cash: 2 }, gain: { rel: 1, lp: 1 } },
      { label: 'เริ่มลงทุนทันที', cost: { cash: 2 }, gain: { portfolio: 2 }, echo: { id: 'E02', era: '+1' } },
      { label: 'เก็บไว้เฉยๆ', gain: {} } ] },
    { id: 'V102', era: 1, title: 'เพื่อนชวนเที่ยวต่างประเทศ', story: 'แก๊งเพื่อนมหาวิทยาลัยนัดเที่ยวญี่ปุ่นกันครั้งแรกหลังเรียนจบ', options: [
      { label: 'ไปด้วย', cost: { cash: 3 }, gain: { stress: -2, rel: 1 } },
      { label: 'ไม่ไป ทำงานเก็บเงิน', gain: { cash: 2, stress: 1 }, echo: { id: 'E03', era: '+1' } } ] },
    { id: 'V103', era: 1, title: 'ข้อเสนอที่ปฏิเสธยาก', story: 'หัวหน้าชวนรับผิดชอบโครงการสำคัญ แต่ต้องใช้เวลาส่วนตัวมากขึ้น', options: [
      { label: 'รับงาน', cost: { energy: 2 }, gain: { cash: 3, skills: 1, stress: 1 } },
      { label: 'เจรจาขอบเขต', require: { skills: 2 }, cost: { energy: 1 }, gain: { cash: 1, rel: 1 } },
      { label: 'ปฏิเสธ', gain: {} } ] },
    { id: 'V104', era: 1, title: 'บัตรเครดิตใบแรก', story: 'ธนาคารอนุมัติวงเงินให้ทันที ของที่อยากได้มานานลดราคาพอดี', options: [
      { label: 'รูดเลย', gain: { lp: 1, debt: 4, stress: -1 }, echo: { id: 'E04', era: '+1' } },
      { label: 'ไม่สมัคร', gain: {} } ] },
    { id: 'V105', era: 1, title: 'คอร์สออนไลน์ลดราคา', story: 'คอร์สทักษะที่ตลาดต้องการลดราคา 70% ถึงคืนนี้', options: [
      { label: 'ซื้อคอร์สพื้นฐาน', cost: { cash: 2 }, gain: { skills: 1 } },
      { label: 'ซื้อแพ็กเกจเต็มแล้วเร่งเรียน', cost: { cash: 4 }, gain: { skills: 2, stress: 1 } },
      { label: 'ข้ามไป', gain: {} } ] },
    { id: 'V106', era: 1, title: 'นอนดึกติดต่อกันหลายเดือน', story: 'งานกับซีรีส์ทำให้คุณนอนตีสองเป็นปกติ', options: [
      { label: 'ปรับตารางชีวิตใหม่', cost: { energy: 2 }, gain: { health: 1 } },
      { label: 'ยังไหวอยู่', gain: { stress: 2 }, echo: { id: 'E05', era: '+1' } } ] },
    // ยุค II
    { id: 'V201', era: 2, title: 'เพื่อนชวนร่วมหุ้น', story: 'เพื่อนสนิทกำลังเปิดร้านกาแฟ ขาดเงินอีกก้อน', options: [
      { label: 'ร่วมหุ้น', cost: { cash: 4 }, gain: {}, echo: { id: 'E06', era: '+1' } },
      { label: 'ปฏิเสธ', gain: { rel: -1 } } ] },
    { id: 'V202', era: 2, title: 'งานแต่งเพื่อนสนิท', story: 'เพื่อนขอให้เป็นเพื่อนเจ้าบ่าวเจ้าสาว ต้องช่วยงานหลายวัน', options: [
      { label: 'ช่วยงานเต็มที่', cost: { cash: 2, energy: 1 }, gain: { rel: 2 } },
      { label: 'ไปร่วมงานอย่างเดียว', cost: { cash: 1 }, gain: {} },
      { label: 'ติดงาน ไม่ไป', gain: { rel: -1 } } ] },
    { id: 'V203', era: 2, title: 'บริษัทปรับโครงสร้าง', story: 'หลายทีมถูกยุบ งานที่เหลือตกมาที่คนที่ยังอยู่', options: [
      { label: 'อาสารับงานเพิ่ม', gain: { stress: 2, skills: 1 }, echo: { id: 'E07', era: '+1' } },
      { label: 'เตรียมหางานสำรอง', cost: { energy: 2 }, gain: { skills: 1 } },
      { label: 'นิ่งไว้ก่อน', gain: { stress: 1 } } ] },
    { id: 'V204', era: 2, title: 'พ่อแม่เริ่มต้องการคนดูแล', story: 'พ่อหกล้มเป็นครั้งที่สอง แม่ดูแลคนเดียวไม่ไหว', options: [
      { label: 'รับมาอยู่ด้วย', gain: { rel: 2, ongoing: { cash: -1 } } },
      { label: 'จ้างผู้ดูแล', cost: { cash: 3 }, gain: {} },
      { label: 'ไว้ค่อยว่ากัน', gain: {}, echo: { id: 'E08', era: '+1' } } ] },
    { id: 'V205', era: 2, title: 'โบนัสก้อนใหญ่', story: 'ปีนี้ผลงานดี โบนัสออกมาเกินคาด', options: [
      { label: 'ลงทุนทั้งหมด', gain: { portfolio: 5 } },
      { label: 'เก็บเป็นเงินสด', gain: { cash: 5 } },
      { label: 'ฉลองกับคนที่รัก', gain: { cash: 2, rel: 1, stress: -2 } } ] },
    { id: 'V206', era: 2, title: 'ลูกค้าคนสำคัญชวนดื่ม', story: 'ลูกค้ารายใหญ่ชวนสังสรรค์ทุกสัปดาห์ ดีลใหญ่ขึ้นกับความสนิท', options: [
      { label: 'ไปทุกครั้ง', gain: { cash: 2, health: -1, stress: 1 }, echo: { id: 'E09', era: '+1' } },
      { label: 'ไปบางครั้ง', gain: {} },
      { label: 'ปฏิเสธอย่างสุภาพ', gain: { health: 1 } } ] },
    // ยุค III
    { id: 'V301', era: 3, title: 'ข้อเสนองานต่างประเทศ', story: 'บริษัทแม่เสนอตำแหน่งผู้บริหารที่สิงคโปร์ เงินดีแต่ต้องอยู่ไกลบ้าน', options: [
      { label: 'รับตำแหน่ง', require: { skills: 5 }, gain: { cash: 6, lp: 2, rel: -2, stress: 2 }, echo: { id: 'E10', era: '+1' } },
      { label: 'ปฏิเสธเพื่อครอบครัว', gain: { rel: 1 } } ] },
    { id: 'V302', era: 3, title: 'ผลตรวจสุขภาพผิดปกติ', story: 'ค่าน้ำตาลกับความดันขึ้นเป็นตัวแดง หมอนัดติดตามผล', options: [
      { label: 'รักษาจริงจัง', cost: { cash: 3 }, gain: { health: 1 } },
      { label: 'ไว้ก่อน งานยุ่ง', gain: {}, echo: { id: 'E11', era: '+1' } } ] },
    { id: 'V303', era: 3, title: 'ตลาดหุ้นผันผวนหนัก', story: 'พอร์ตติดลบสองหลัก ข่าวทุกช่องพูดถึงวิกฤต', options: [
      { label: 'ถือต่ออย่างมีวินัย', gain: { stress: 1 }, echo: { id: 'E12', era: '+1' } },
      { label: 'ขายตัดขาดทุน', require: { portfolio: 4 }, gain: { portfolio: -4, cash: 3, stress: -1 } },
      { label: 'ช้อนซื้อเพิ่ม', cost: { cash: 3 }, gain: { portfolio: 4, stress: 1 } } ] },
    { id: 'V304', era: 3, title: 'เพื่อนเก่าป่วยหนัก', story: 'เพื่อนสมัยมัธยมเข้าโรงพยาบาล ครอบครัวเขาลำบากเรื่องค่ารักษา', options: [
      { label: 'ไปเยี่ยมและช่วยค่ารักษา', cost: { cash: 3, energy: 1 }, gain: { rel: 2, impact: 1 } },
      { label: 'ส่งข้อความให้กำลังใจ', gain: {} } ] },
    { id: 'V305', era: 3, title: 'คนในบ้านต้องการคุณ', story: 'ลูกมีปัญหาที่โรงเรียน ครูขอพบผู้ปกครองช่วงเวลางาน', options: [
      { label: 'ลางานไปคุยเอง', cost: { energy: 2 }, gain: { rel: 2 } },
      { label: 'จ้างติวเตอร์แก้ปัญหา', cost: { cash: 3 }, gain: {}, echo: { id: 'E13', era: '+1' } },
      { label: 'ให้คู่ชีวิตจัดการไปก่อน', gain: { rel: -1 }, echo: { id: 'E13', era: '+1' } } ] },
    { id: 'V306', era: 3, title: 'วิกฤตวัยกลางคน', story: 'ตื่นมาแล้วรู้สึกว่าชีวิตวนอยู่ที่เดิม', options: [
      { label: 'ลาพักยาว', cost: { cash: 4 }, gain: { stress: -4, health: 1 } },
      { label: 'ซื้อรถในฝัน', cost: { cash: 6 }, gain: { lp: 2, ongoing: { cash: -1 } } },
      { label: 'อดทนต่อไป', gain: { stress: 2 } } ] },
    // ยุค IV
    { id: 'V401', era: 4, title: 'ข้อเสนอเกษียณก่อนกำหนด', story: 'บริษัทเปิดโครงการสมัครใจลาออกพร้อมเงินชดเชย', options: [
      { label: 'รับเงินก้อน ลดงานลง', gain: { cash: 8, salary: -3, stress: -2 } },
      { label: 'ทำงานต่อ', gain: { stress: 1 } } ] },
    { id: 'V402', era: 4, title: 'หลานคนแรก', story: 'ครอบครัวมีสมาชิกใหม่ ทุกคนอยากให้คุณช่วย', options: [
      { label: 'ช่วยเลี้ยง', cost: { energy: 2 }, gain: { rel: 2, lp: 1 } },
      { label: 'ส่งเงินช่วย', cost: { cash: 3 }, gain: { rel: 1 } },
      { label: 'ยังไม่พร้อมช่วย', gain: {} } ] },
    { id: 'V403', era: 4, title: 'มูลนิธิชวนเป็นกรรมการ', story: 'มูลนิธิการศึกษาอยากได้ประสบการณ์ของคุณ', options: [
      { label: 'รับตำแหน่ง', require: { rel: 5 }, cost: { energy: 1 }, gain: { impact: 2 } },
      { label: 'ปฏิเสธ', gain: {} } ] },
    { id: 'V404', era: 4, title: 'ข้อเสนอลงทุนผลตอบแทนสูงผิดปกติ', story: 'คนรู้จักการันตีผลตอบแทน 3% ต่อเดือน มีคนลงแล้วหลายคน', options: [
      { label: 'ลงทุน', cost: { cash: 5 }, gain: {}, echo: { id: 'E14', era: '+1' } },
      { label: 'ตรวจสอบก่อนตัดสินใจ', require: { skills: 4 }, gain: { lp: 1 } },
      { label: 'ปฏิเสธ', gain: {} } ] },
    { id: 'V405', era: 4, title: 'คนใกล้ตัวป่วยเรื้อรัง', story: 'คู่ชีวิตหรือพี่น้องต้องการคนดูแลระยะยาว', options: [
      { label: 'ดูแลเอง', cost: { energy: 2 }, gain: { rel: 2, stress: 2 } },
      { label: 'จ้างพยาบาลพิเศษ', cost: { cash: 4 }, gain: { rel: 1 } },
      { label: 'ให้ญาติคนอื่นรับไป', gain: { rel: -2 } } ] },
    { id: 'V406', era: 4, title: 'ส่งต่อความรู้', story: 'รุ่นน้องหลายคนอยากเรียนรู้จากประสบการณ์ของคุณ', options: [
      { label: 'เป็นพี่เลี้ยงให้รุ่นน้อง', require: { skills: 5 }, cost: { energy: 1 }, gain: { impact: 2 } },
      { label: 'เขียนบันทึกชีวิต', cost: { energy: 1 }, gain: { lp: 1 } },
      { label: 'ขอผ่าน', gain: {} } ] },
  ];

  // ---------------------------------------------------------------- Echo (16)
  // kind: good | bad · Echo ร้ายมีทาง "แก้ไข" กับ "ปล่อยไว้" (regret)
  const ECHOES = [
    { id: 'E01', kind: 'bad', title: 'สัญญาณเตือนจากร่างกาย', story: 'Burnout ครั้งก่อนทิ้งร่องรอย ร่างกายเริ่มเรียกร้องการพัก', options: [
      { label: 'หยุดพักและพบแพทย์', cost: { cash: 2, energy: 1 }, gain: { health: 1 } },
      { label: 'ฝืนต่อ', gain: { health: -1 }, regret: 1 } ] },
    { id: 'E02', kind: 'good', title: 'ดอกผลแรก', story: 'เงินที่ลงทุนตั้งแต่เงินเดือนแรกเริ่มเติบโต', options: [
      { label: 'รับผลตอบแทน', gain: { portfolio: 2 } } ] },
    { id: 'E03', kind: 'bad', title: 'เพื่อนห่างหาย', story: 'กลุ่มเพื่อนนัดกันบ่อย แต่ไม่มีใครชวนคุณแล้ว', options: [
      { label: 'เป็นฝ่ายชวนก่อน', cost: { cash: 2, energy: 1 }, gain: { rel: 1 } },
      { label: 'ปล่อยไป', gain: { rel: -1 }, regret: 1 } ] },
    { id: 'E04', kind: 'bad', title: 'หนี้บัตรพอกพูน', story: 'จ่ายขั้นต่ำมาตลอด ยอดหนี้ไม่ลดลงเลย', options: [
      { label: 'ปิดหนี้ก้อนใหญ่', cost: { cash: 4 }, gain: { debt: -4 } },
      { label: 'จ่ายขั้นต่ำต่อไป', gain: { debt: 2, stress: 1 }, regret: 1 } ] },
    { id: 'E05', kind: 'bad', title: 'สุขภาพเริ่มฟ้อง', story: 'ปวดหลังเรื้อรังกับนอนไม่หลับมาจากช่วงนอนดึก', options: [
      { label: 'ทำกายภาพจริงจัง', cost: { cash: 2, energy: 1 }, gain: { health: 1 } },
      { label: 'กินยาแก้ปวดไปก่อน', gain: { health: -2 }, regret: 1 } ] },
    { id: 'E06', kind: 'good', title: 'หุ้นส่วนเก่า', story: 'กิจการที่ร่วมหุ้นกับเพื่อนไปได้ดีเกินคาด', options: [
      { label: 'ขอรับส่วนแบ่งเป็นเงินก้อน', gain: { cash: 6 } },
      { label: 'ลงเพิ่มเพื่อขยาย', cost: { cash: 2 }, gain: { ongoing: { cash: 2 } } } ] },
    { id: 'E07', kind: 'good', title: 'ผลงานที่คนจำได้', story: 'ผู้บริหารยังจำได้ว่าคุณช่วยบริษัทผ่านช่วงยาก', options: [
      { label: 'รับโปรเจกต์สำคัญ', gain: { skills: 1, lp: 1 } } ] },
    { id: 'E08', kind: 'bad', title: 'ความรู้สึกผิดต่อพ่อแม่', story: 'อาการของพ่อแย่ลง คุณรู้ว่าควรอยู่ใกล้กว่านี้', options: [
      { label: 'กลับไปดูแลช่วงหนึ่ง', cost: { cash: 2, energy: 2 }, gain: { rel: 2 } },
      { label: 'ทำงานต่อ', gain: { stress: 2 }, regret: 1 } ] },
    { id: 'E09', kind: 'good', title: 'เครือข่ายธุรกิจ', story: 'คนที่คุณรู้จักแนะนำดีลใหม่มาให้', options: [
      { label: 'รับดีล', gain: { cash: 3, rel: 1 } } ] },
    { id: 'E10', kind: 'bad', title: 'ลูกโตมาโดยไม่มีเรา', story: 'ลูกเลิกเล่าเรื่องที่โรงเรียนให้ฟังแล้ว', options: [
      { label: 'ลดงานกลับมาใช้เวลาด้วยกัน', cost: { energy: 2 }, gain: { rel: 1, salary: -1 } },
      { label: 'คิดว่าเดี๋ยวโตก็เข้าใจ', gain: { rel: -2 }, regret: 1 } ] },
    { id: 'E11', kind: 'bad', title: 'โรคเรื้อรัง', story: 'ผลตรวจที่ปล่อยไว้กลายเป็นเบาหวาน', options: [
      { label: 'รักษาและปรับชีวิต', cost: { cash: 4 }, gain: { health: 1 } },
      { label: 'กินยาตามอาการ', gain: { health: -3 }, regret: 1 } ] },
    { id: 'E12', kind: 'good', title: 'ตลาดฟื้นตัว', story: 'วินัยตอนตลาดตกให้ผลตอบแทนแล้ว', options: [
      { label: 'รับผลตอบแทน', gain: { portfolio: 4 } } ] },
    { id: 'E13', kind: 'bad', title: 'บทสนทนาที่ไม่เคยเกิดขึ้น', story: 'ปัญหาของลูกไม่ได้หายไป แค่เงียบลง', options: [
      { label: 'นั่งคุยกันจริงจัง', cost: { energy: 2 }, gain: { rel: 2, stress: -1 } },
      { label: 'ปล่อยให้เวลาจัดการ', gain: { rel: -1 }, regret: 1 } ] },
    { id: 'E14', kind: 'bad', title: 'แชร์ลูกโซ่ล่ม', story: 'ผู้ชักชวนติดต่อไม่ได้ เงินที่ลงไปหายทั้งหมด', options: [
      { label: 'แจ้งความและรวมกลุ่มผู้เสียหาย', cost: { energy: 2 }, gain: { cash: 2, stress: 1 } },
      { label: 'เก็บเงียบ', gain: { stress: 2 }, regret: 1 } ] },
    { id: 'E15', kind: 'bad', title: 'พนักงานลาออก', story: 'ผู้จัดการสาขาลาออกพร้อมลูกน้องสามคน', options: [
      { label: 'ขึ้นเงินเดือนดึงคนใหม่', cost: { cash: 3 }, gain: {} },
      { label: 'ปล่อยสาขาเดินไปเอง', gain: { ongoing: { cash: -1 } }, regret: 1 } ] },
    { id: 'E16', kind: 'bad', title: 'นักลงทุนเร่งผลงาน', story: 'บอร์ดต้องการตัวเลขโตสามเท่าภายในปีนี้', options: [
      { label: 'เจรจาเป้าใหม่', require: { skills: 5 }, cost: { energy: 2 }, gain: { stress: 1 } },
      { label: 'โหมทำตามเป้า', gain: { stress: 3, health: -1 }, regret: 1 } ] },
  ];

  // ---------------------------------------------------------------- Opportunities (12)
  const OPPORTUNITIES = [
    { id: 'O01', title: 'งานฟรีแลนซ์ช่วงสั้น', cost: { energy: 2 }, gain: { cash: 4, stress: 1 } },
    { id: 'O02', title: 'สัมมนาเครือข่ายวิชาชีพ', cost: { cash: 2, energy: 1 }, gain: { rel: 1, skills: 1 } },
    { id: 'O03', title: 'ทุนอบรมต่างประเทศ', require: { skills: 3 }, cost: { energy: 2 }, gain: { skills: 2, rel: -1 } },
    { id: 'O04', title: 'จองซื้อหุ้น IPO', cost: { cash: 4 }, gain: { portfolio: 5 } },
    { id: 'O05', title: 'ทริปครอบครัวราคาพิเศษ', cost: { cash: 3 }, gain: { rel: 2, stress: -2 } },
    { id: 'O06', title: 'สมาชิกฟิตเนสรายปี', cost: { cash: 3 }, gain: { health: 2 } },
    { id: 'O07', title: 'ได้รับเชิญเป็นวิทยากร', require: { skills: 4 }, cost: { energy: 1 }, gain: { cash: 3, impact: 1 } },
    { id: 'O08', title: 'ซื้อรถผ่อนดอกเบี้ยต่ำ', cost: {}, gain: { lp: 1, debt: 5, stress: -1 } },
    { id: 'O09', title: 'พี่เลี้ยงในสายงาน', require: { rel: 4 }, cost: { energy: 1 }, gain: { skills: 1, rel: 1 } },
    { id: 'O10', title: 'คอร์สการเงินส่วนบุคคล', cost: { cash: 2 }, gain: { skills: 1 }, echo: { id: 'E02', era: '+1' } },
    { id: 'O11', title: 'ร่วมทุนร้านเพื่อน', cost: { cash: 3 }, gain: { ongoing: { cash: 1 } }, echo: { id: 'E06', era: '+1' } },
    { id: 'O12', title: 'อาสาสมัครวันหยุด', cost: { energy: 1 }, gain: { impact: 1, rel: 1, stress: -1 } },
  ];

  // ---------------------------------------------------------------- Actions (ใช้ 1 ⏳)
  const ACTIONS = [
    { id: 'overtime', label: 'ทำงานล่วงเวลา', cost: { energy: 2 }, gain: { cash: 3, stress: 1 } },
    { id: 'learn', label: 'เรียนรู้', cost: { energy: 1, cash: 2 }, gain: { skills: 1 } },
    { id: 'exercise', label: 'ออกกำลังกาย', cost: { energy: 1 }, gain: { health: 1, stress: -1 } },
    { id: 'relate', label: 'เวลากับคนสำคัญ', cost: { energy: 1, cash: 1 }, gain: { rel: 1, stress: -1 } },
    { id: 'rest', label: 'พักผ่อน', cost: {}, gain: { stress: -2 } },
    { id: 'project', label: 'เดินหน้า Life Project', special: true },
    { id: 'promote', label: 'ขอเลื่อนตำแหน่ง', cost: { energy: 1 }, special: true },
    { id: 'explore', label: 'สำรวจโอกาส', cost: { energy: 1 }, special: true },
    { id: 'invest', label: 'ลงทุน', cost: {}, special: true },
    { id: 'repay', label: 'จัดการหนี้', cost: {}, special: true },
  ];

  const DATA = { ERAS, START, CAREERS, GOALS, PROJECTS, EVENTS, ECHOES, OPPORTUNITIES, ACTIONS };
  if (typeof module !== 'undefined' && module.exports) module.exports = DATA;
  else root.LIFE_CEO_DATA = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
