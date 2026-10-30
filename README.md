# LIFE CEO — ชีวิตที่คุณออกแบบได้

เกมจำลองชีวิตสำหรับผู้เล่นคนเดียว 8 บท 4 ยุค (ต้นแบบ v0.2 สำหรับ playtest)

## เล่น
เปิด `index.html` ในเบราว์เซอร์ได้เลย ไม่ต้อง build เกมเซฟอัตโนมัติใน localStorage

## โครงสร้าง
| ไฟล์ | หน้าที่ |
|---|---|
| `docs/design-v0.2.md` | Design doc กติกาและเหตุผล |
| `src/data/cards.js` | ข้อมูลการ์ดทั้งหมด (แก้ตัวเลขที่นี่) |
| `src/game.js` | Game engine ใช้ร่วมกันทั้งเบราว์เซอร์และ Node |
| `src/ui.js`, `src/style.css` | หน้าเกม (Style 2) แบบโต๊ะ: บนโต๊ะมีเฉพาะการ์ดที่ต้องตัดสินใจตอนนั้น |
| `netlify/functions/life-story.mjs` | ให้ Claude เรียบเรียงบทสรุปชีวิตตอนจบเกม (streaming) |
| `assets/art/<id>.webp` | ภาพประกอบการ์ด 27 ภาพ (prompt และสเปกอยู่ที่ `docs/image-prompts.md`, ตรวจด้วย `node tools/check-art.js`) ถ้าไม่มีไฟล์จะใช้ไอคอนแทน |

## Deploy (Netlify)
- `netlify.toml` คัดลอกเฉพาะ `index.html`, `src`, `assets` ไปที่ `dist` แล้ว publish จากโฟลเดอร์นั้น
- ตั้ง env `ANTHROPIC_API_KEY` ใน Netlify เพื่อเปิดเรื่องเล่าที่ Claude เรียบเรียง ถ้าไม่ได้ตั้ง หน้าสรุปจะแสดงเรื่องเล่าแบบแยกบทตามเดิม
- เปิดจากไฟล์ในเครื่องหรือเว็บที่ไม่มี function ก็เล่นได้ครบ ยกเว้นเรื่องเล่าที่ Claude เรียบเรียง

## ตรวจ
```bash
node tools/validate-cards.js
```
```bash
node tools/smoke.js 2000
```
```bash
node tools/ui-test.js
```
```bash
node tools/regress-test.js
```
```bash
node tools/layout-audit.js
```
```bash
node tools/balance.js 4
```
(`balance.js` ให้ bot 6 กลยุทธ์เล่นครบทุกคู่อาชีพ × เป้าหมาย แล้วเขียนรายงานที่ `docs/balance-report.md`)

เวลาแก้ไฟล์ใน `src/` ให้เปลี่ยนเลข `?v=` ใน `index.html` ด้วย เพื่อไม่ให้เบราว์เซอร์ใช้ไฟล์เก่าปนกับไฟล์ใหม่

ตัวเลขทุกตัวเป็นค่าตั้งต้นเพื่อทดสอบ ยังไม่ผ่านการปรับสมดุล
