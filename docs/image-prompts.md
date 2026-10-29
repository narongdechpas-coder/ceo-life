# LIFE CEO — Image Prompts v0.3 (Redesign · 31 ภาพ)

ชุดภาพใหม่สำหรับ redesign ตาม moodboard "Jacky Learning Hub" (3D กระจกโปร่ง โทนฟ้า cobalt / ลาเวนเดอร์ / mint บนพื้นสว่าง)
ภาพชุดเดิม (โทนทองอบอุ่น) ย้ายไปไว้ที่ `assets/art-legacy/` และ prompt เดิมอยู่ที่ `docs/image-prompts-v0.2.md`

| กลุ่ม | จำนวน | ไฟล์ |
|---|---|---|
| Life Project | 12 | `assets/art/P01.webp` – `P12.webp` |
| อาชีพ | 8 | `assets/art/C01.webp` – `C08.webp` |
| ประจำยุค | 4 | `assets/art/era-1.webp` – `era-4.webp` |
| Echo | 2 | `assets/art/echo-good.webp`, `echo-bad.webp` |
| โอกาส | 1 | `assets/art/opportunity.webp` |
| Hero หน้าเริ่ม | 1 | `assets/art/hero.webp` |
| พื้นโต๊ะ | 1 | `assets/bg/table.webp` |
| Hero หน้าสรุป | 1 | `assets/art/end-hero.webp` |
| ไอคอนแอป | 1 | ส่งไฟล์ PNG 1024×1024 มาให้ผม ผมทำทุกขนาดเอง |

**ลำดับที่แนะนำ:** Hero หน้าเริ่ม + พื้นโต๊ะก่อน (ได้เห็นทั้งเกมในโทนใหม่) → P01 เพื่อทดสอบ Style Lock → ที่เหลือ
ภาพแรกที่ชอบ ให้เก็บไว้เป็น style reference (`--sref` ใน Midjourney หรือแนบเป็นภาพอ้างอิงใน ChatGPT/Gemini) แล้วใช้กับภาพที่เหลือ จะคุมสไตล์ได้ดีกว่าการพึ่ง prompt อย่างเดียว

---

## 1. สเปกไฟล์

| เรื่อง | ค่า |
|---|---|
| สัดส่วน | 16:9 แนวนอน (ยกเว้น Hero หน้าเริ่ม 21:9 และไอคอน 1:1) |
| ขนาด | ส่งมาขนาดไหนก็ได้ ผมครอบและย่อเป็น 1600×900 WebP ≤300 KB เอง |
| ตัวหนังสือในภาพ | **ห้ามมี** ทั้งไทยและอังกฤษ รวมป้ายและโลโก้ |
| พื้นที่ปลอดภัย | ของสำคัญอยู่ใน **กลาง 60% ของความสูง** เพราะการ์ดบนจอเล็กจะครอบบนล่างออก |
| พื้นหลังในภาพ | สว่างโล่ง (#F7FAFF หรือฟ้าอ่อนมาก) ให้กลืนกับการ์ดสีขาว |

## 2. Style Lock (ต่อท้ายทุก prompt แบบไม่แก้คำ)

```
soft 3D illustration, glassmorphism, translucent frosted-glass shapes and cubes, clean modern composition, soft studio lighting with gentle inner glow, color palette of cobalt blue (#2F6BFF), lavender (#7C8DFF), sky blue (#C6E7FF) and mint (#DFF7EC) on a very light airy background (#F7FAFF), small deep navy accents (#172B4D), stylized friendly 3D characters with Thai / Southeast Asian features, smooth matte and glossy materials, optimistic and calm mood, high detail, wide 16:9 composition, main subject centered in the middle 60% of the frame, no text, no letters, no numbers, no logos, no watermark
```

**Negative prompt** (ถ้าเครื่องมือรองรับ)
```
text, letters, typography, signage, captions, logo, watermark, frame, border, user interface, photorealistic, dark background, harsh shadows, warm golden sunset palette, cel-shaded anime, flat 2D, extra fingers, distorted faces, cropped heads
```

**วิธีใช้:** ChatGPT / Gemini วาง prompt + Style Lock แล้วต่อท้ายว่า "landscape 16:9, do not include any text" · Midjourney ใส่ `--ar 16:9 --no text, letters, logo, watermark`

---

## 3. Life Project (12 ภาพ)

| ไฟล์ | Project | Prompt (ต่อด้วย Style Lock) |
|---|---|---|
| `P01` | Family Business · ธุรกิจครอบครัว | a small family-run shop shaped like a glowing glass cube, a parent and grown child arranging products together behind the counter, a tiny awning and potted plants |
| `P02` | Master Degree · ปริญญาโท | a graduation cap resting on a stack of translucent glass books, a young adult with a backpack looking up at it, small floating light particles |
| `P03` | Start a Family · สร้างครอบครัว | a young couple holding a baby inside a cozy translucent glass house, warm soft glow from inside, small toys on the floor |
| `P04` | Marathon · วิ่งมาราธอน | a runner in mid-stride on a glowing path that winds up a gentle glass hill, a finish ribbon of light near the top |
| `P05` | World Travel · เที่ยวรอบโลก | a translucent glass globe with a paper airplane circling it, a traveler with a small suitcase standing beside it |
| `P06` | Own a Home · บ้านของตัวเอง | a person holding a glowing house key in front of a small modern glass house, the door slightly open |
| `P07` | Startup · สตาร์ทอัพ | a small rocket launching out of an open glass box, a founder with a laptop watching it, rising growth bars made of glass behind |
| `P08` | Community Volunteer · อาสาสมัครชุมชน | several hands of different ages gently holding a glowing seedling together, small glass houses of a neighborhood in the background |
| `P09` | Write a Book · เขียนหนังสือ | an open book with pages lifting off as floating glass sheets, a writer with a pen sitting at a minimal desk |
| `P10` | Rental Property · อสังหาให้เช่า | a stack of small glass apartment units forming a neat building, tiny lit windows, a set of keys and a coin floating nearby |
| `P11` | Care for Parents · ดูแลพ่อแม่ | an adult holding the hand of an elderly parent seated in a comfortable chair by a glass window, a cup of tea on a side table |
| `P12` | Mindfulness · ฝึกสติ | a person meditating cross-legged on a floating glass platform, soft leaves and light particles drifting around |

## 4. อาชีพ (8 ภาพ)

| ไฟล์ | อาชีพ | Prompt (ต่อด้วย Style Lock) |
|---|---|---|
| `C01` | พนักงานบริษัท | an office worker with a laptop at a clean glass desk, floating translucent charts and calendar tiles around |
| `C02` | ข้าราชการ | a civil servant helping a citizen at a glass service counter, neat folders and a round stamp, a small Thai-style roof shape in the soft background |
| `C03` | วิศวกรซอฟต์แวร์ | a software engineer with headphones in front of floating glass screens showing abstract code blocks (no readable text) |
| `C04` | พยาบาล | a nurse in scrubs with a stethoscope, a glowing glass heart and a soft medical cross shape floating nearby |
| `C05` | ฟรีแลนซ์ครีเอทีฟ | a creative freelancer drawing on a tablet, floating glass color swatches and brush shapes, a sleeping cat beside |
| `C06` | เจ้าของร้านค้า | a shop owner behind a small glass storefront handing a shopping bag to a customer, a phone payment glow |
| `C07` | ครู | a teacher in front of a floating glass board with simple shapes, a few small students raising hands |
| `C08` | นักขาย | a salesperson shaking hands with a client, a translucent bar chart rising behind them |

## 5. ประจำยุค (4 ภาพ — ใช้บนการ์ดเหตุการณ์)

| ไฟล์ | ยุค | Prompt (ต่อด้วย Style Lock) |
|---|---|---|
| `era-1` | เริ่มต้น 22–30 | a young adult taking the first step onto a staircase of glass blocks, morning light, a small backpack |
| `era-2` | สร้างตัว 31–40 | an adult and a young child building a glass house block by block together, tools and blocks around |
| `era-3` | จุดสูงสุด 41–50 | a confident middle-aged person standing on top of a glass mountain peak looking at a wide view |
| `era-4` | ส่งต่อ 51–60+ | an elderly person handing a glowing seedling in a glass pot to a child, both smiling |

## 6. Echo และโอกาส (3 ภาพ)

| ไฟล์ | ใช้กับ | Prompt (ต่อด้วย Style Lock) |
|---|---|---|
| `echo-good` | Echo ผลดี | a glass orb reflecting a small memory scene inside, releasing soft mint-colored light ripples |
| `echo-bad` | Echo ผลร้าย | a glass orb with a hairline crack, dark violet ripples spreading outward, still calm not scary |
| `opportunity` | การ์ดโอกาส | a tall glass door opening onto several glowing paths that branch in different directions |

## 7. ภาพหน้าจอและไอคอน (4 ภาพ)

| ไฟล์ | ใช้ที่ | Prompt |
|---|---|---|
| `hero` (21:9) | หน้าเลือกเป้าหมาย/อาชีพ ด้านขวาของชื่อเกม | a person with a backpack standing in front of a large glowing glass cube, floating life icons around (a small house, a heart, a graduation cap, a coin, a seedling), stairs of glass blocks leading up, empty light space on the left third for the title + Style Lock (เปลี่ยน 16:9 เป็น 21:9) |
| `assets/bg/table.webp` | พื้นโต๊ะระหว่างเล่น | an abstract very light sky-blue background with blurred translucent glass shapes far in the distance at the edges, the center 70% almost empty and calm so cards can sit on top + Style Lock (ไม่มีคน) |
| `end-hero` | หน้าสรุปชีวิต | a glowing path winding through four glass cubes of increasing height, leading to a small glass tree with light at the top + Style Lock |
| `app-icon` (1:1) | ไอคอนแอปบนมือถือ | a single cobalt-blue glass cube with a glowing seedling inside, centered, filling the square edge to edge with a soft light-blue gradient background, **no rounded corners, no drop shadow, no border**, no text, 1:1 |

---

## 8. Checklist ก่อนส่งภาพ
- [ ] ไม่มีตัวหนังสือ ป้าย หรือโลโก้ในภาพ
- [ ] ของสำคัญอยู่ช่วงกลางภาพ
- [ ] พื้นหลังสว่าง ไม่มืด
- [ ] โทนสีอยู่ในชุดฟ้า / ลาเวนเดอร์ / mint ไม่หลุดเป็นทองอุ่น
- [ ] ตั้งชื่อตามตาราง หรือบอกผมว่าภาพไหนคือไฟล์ไหน
