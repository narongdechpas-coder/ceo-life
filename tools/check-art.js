// ตรวจไฟล์ภาพการ์ดใน assets/art ตามสเปก docs/image-prompts.md — รัน: node tools/check-art.js
const fs = require('fs');
const path = require('path');
const D = require('../src/data/cards.js');

const DIR = path.resolve(__dirname, '../assets/art');
const WANT = [
  ...D.PROJECTS.map(p => [p.id, `Project · ${p.name}`]),
  ...D.CAREERS.map(c => [c.id, `อาชีพ · ${c.name}`]),
  ...D.ERAS.map(e => [`era-${e.id}`, `ยุค ${e.id} · ${e.name}`]),
  ['echo-good', 'Echo · ผลดี'], ['echo-bad', 'Echo · ผลร้าย'],
  ['opportunity', 'โอกาส · ใช้ร่วมทุกใบ'],
];
const MAX_KB = 300;

// อ่านความกว้าง/สูงจาก header ของ WebP (VP8 / VP8L / VP8X) โดยไม่ต้องใช้ไลบรารี
function webpSize(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
  if (chunk === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
  }
  return null;
}

const rows = [];
let ok = 0;
const present = new Set(fs.existsSync(DIR) ? fs.readdirSync(DIR) : []);
for (const [id, label] of WANT) {
  const file = `${id}.webp`;
  if (!present.has(file)) {
    const wrongCase = [...present].find(f => f.toLowerCase() === file.toLowerCase());
    rows.push(`  ·  ${file.padEnd(16)} ${label}${wrongCase ? `  (เจอ ${wrongCase} ชื่อตัวพิมพ์ไม่ตรง)` : '  ยังไม่มี'}`);
    continue;
  }
  const buf = fs.readFileSync(path.join(DIR, file));
  const size = webpSize(buf);
  const issues = [];
  if (!size) issues.push('ไม่ใช่ไฟล์ WebP');
  else {
    const ratio = size.w / size.h;
    if (Math.abs(ratio - 16 / 9) > 0.03) issues.push(`สัดส่วน ${size.w}×${size.h} ไม่ใช่ 16:9`);
    if (size.w < 1280) issues.push(`กว้าง ${size.w}px เล็กไป (ควร 1600)`);
  }
  const kb = Math.round(buf.length / 1024);
  if (kb > MAX_KB) issues.push(`${kb} KB ใหญ่เกิน ${MAX_KB} KB`);
  if (issues.length) rows.push(`  ✗  ${file.padEnd(16)} ${label}  — ${issues.join(' · ')}`);
  else { ok++; rows.push(`  ✓  ${file.padEnd(16)} ${label}  ${size.w}×${size.h} ${kb} KB`); }
}
const extra = [...present].filter(f => /\.(webp|png|jpe?g)$/i.test(f) && !WANT.some(([id]) => `${id}.webp` === f));

console.log(`ภาพการ์ด ${ok}/${WANT.length} ผ่านสเปก\n${rows.join('\n')}`);
if (extra.length) console.log(`\nไฟล์ที่เกมไม่ได้ใช้: ${extra.join(', ')}`);
process.exit(rows.some(r => r.startsWith('  ✗')) ? 1 : 0);
