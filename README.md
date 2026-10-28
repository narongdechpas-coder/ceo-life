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
| `src/ui.js`, `src/style.css` | หน้าเกม (Style 2 Flat Vector) แบบหน้าเดียว การ์ดเลื่อนเป็น carousel |
| `assets/art/<id>.webp` | ภาพประกอบการ์ด ถ้าไม่มีไฟล์จะใช้ไอคอนแทน |

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

ตัวเลขทุกตัวเป็นค่าตั้งต้นเพื่อทดสอบ ยังไม่ผ่านการปรับสมดุล
