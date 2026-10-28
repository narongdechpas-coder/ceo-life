# LIFE CEO — Image Prompts (26 ภาพ)

ภาพประกอบการ์ดชุดแรก 26 ภาพ: Life Project 12, อาชีพ 8, ประจำยุค 4, Echo 2
การ์ดเป้าหมายชีวิตและการ์ดโอกาสใช้ไอคอน ไม่ต้องทำภาพ

---

## 1. สเปกไฟล์ (ทุกภาพเหมือนกัน)

| เรื่อง | ค่า |
|---|---|
| สัดส่วน | **16:9 แนวนอน** |
| ขนาดส่งออก | 1600 × 900 px |
| ไฟล์ | `.webp` คุณภาพประมาณ 80 ไม่เกิน 300 KB ต่อภาพ |
| วางไฟล์ที่ | `assets/art/` ตามชื่อในตาราง (ตัวพิมพ์ต้องตรง) |
| ตัวหนังสือในภาพ | **ห้ามมี** ทั้งไทยและอังกฤษ รวมป้ายร้านและโลโก้ เกมใส่ข้อความเองด้วยโค้ด |
| พื้นที่ปลอดภัย | ของสำคัญอยู่ในช่วง **กลาง 60% ของความสูง** |

ทำไมต้องมีพื้นที่ปลอดภัย: บนจอจริงภาพจะถูกครอบบนล่างตามความสูงที่การ์ดเหลือ จอ 1920 เหลือภาพสูงประมาณ 190 px ส่วนจอ 1280 เหลือประมาณ 115 px ภาพจึงต้องยังสื่อได้แม้เหลือแค่แถบแนวนอนตรงกลาง

```
┌──────────────────────────────────────────┐  ← 20% บน: ท้องฟ้า / ผนัง / ใบไม้ (โดนตัดได้)
│                                          │
├──────────────────────────────────────────┤
│        ตัวละคร · ของสำคัญ · การกระทำ        │  ← 60% กลาง: ทุกอย่างที่ต้องเห็น
├──────────────────────────────────────────┤
│                                          │  ← 20% ล่าง: พื้น / โต๊ะ (โดนตัดได้)
└──────────────────────────────────────────┘
```

---

## 2. Style Lock (คัดลอกคำต่อคำทุกภาพ)

ต่อ Style Lock ท้าย prompt ของทุกภาพแบบไม่แก้คำ ภาพทั้งชุดจะออกมาเป็นสไตล์เดียวกันและเข้ากับภาพพื้นโต๊ะ

**Style Lock**
```
warm cel-shaded flat illustration, modern Thai slice-of-life animation look, clean confident outlines, soft gradient shading, gentle golden-hour light, color palette of sage green (#3F6B4F), warm cream (#F3EFE6), coral (#D9694F), mustard yellow (#E3A93B) with small deep navy accents (#2B3A55), lush tropical plants, contemporary Bangkok setting with subtle Thai architectural details, cozy and optimistic mood, wide 16:9 composition, main subject centered in the middle 60% of the frame with calm breathing room above and below, no text, no letters, no numbers, no logos, no watermark
```

**Negative prompt** (ถ้าเครื่องมือรองรับ ใส่ทุกภาพ)
```
text, letters, typography, readable signage, captions, logo, watermark, frame, border, card layout, user interface, photorealistic, 3D render, harsh shadows, dark gloomy palette, neon colors, extra fingers, distorted faces, cropped heads
```

**วิธีใช้กับแต่ละเครื่องมือ**
- **ChatGPT / DALL·E:** วาง prompt ของภาพ + Style Lock แล้วพิมพ์ต่อท้ายว่า "landscape 16:9" ส่วน negative ให้เขียนเป็นประโยค "Do not include any text, letters, logos or watermark."
- **Gemini:** วางแบบเดียวกัน ถ้าภาพยังมีตัวหนังสือ ให้สั่งซ้ำว่า "remove all text and signage"
- **Midjourney:** prompt + Style Lock + `--ar 16:9 --no text, letters, logo, watermark, frame`
- **ภาพแรกที่ได้แบบที่ชอบ:** เก็บไว้เป็นภาพอ้างอิงสไตล์ (style reference / `--sref`) แล้วใช้กับอีก 25 ภาพ จะคุมสไตล์ได้ดีกว่าการพึ่งข้อความอย่างเดียว

**ตัวละคร:** ไม่มีตัวเอกประจำเกม เพราะผู้เล่นคือ "คุณ" ทุกเพศทุกวัย ใช้คนไทยหลากหลายอายุและเพศ และวางตัวคนไว้ระยะกลาง ไม่ซูมหน้าใกล้

---

## 3. Life Project (12 ภาพ)

ภาพแสดงบนการ์ด Project ที่ผู้เล่นเห็นบ่อยที่สุด ควรทำกลุ่มนี้ก่อน

| ไฟล์ | การ์ด | ภาพต้องสื่อว่า |
|---|---|---|
| `P01.webp` | ธุรกิจครอบครัว | รุ่นลูกช่วยปรับร้านของครอบครัวให้ทันสมัย |
| `P02.webp` | ปริญญาโท | เรียนต่อควบคู่กับทำงาน ความตั้งใจยามดึก |
| `P03.webp` | สร้างครอบครัว | บ้านที่อบอุ่นของคนสองคนกับลูกเล็ก |
| `P04.webp` | วิ่งมาราธอน | ความสม่ำเสมอ วิ่งตอนเช้าริมแม่น้ำ |
| `P05.webp` | เที่ยวรอบโลก | การออกไปเห็นโลกกว้าง |
| `P06.webp` | บ้านของตัวเอง | วันที่ได้กุญแจบ้านหลังแรก |
| `P07.webp` | สตาร์ทอัพ | ทีมเล็กที่กำลังปั้นไอเดีย |
| `P08.webp` | อาสาสมัครชุมชน | การลงแรงช่วยชุมชน |
| `P09.webp` | เขียนหนังสือ | ช่วงเวลาเงียบๆ ของการเขียน |
| `P10.webp` | อสังหาให้เช่า | ห้องเช่าที่สร้างรายได้ |
| `P11.webp` | ดูแลพ่อแม่ | ความใกล้ชิดกับพ่อแม่ที่อายุมากขึ้น |
| `P12.webp` | ฝึกสติ | ความสงบ ใจนิ่ง |

**P01 — ธุรกิจครอบครัว**
```
A young Thai woman in an apron works on a laptop at the counter of a small family-owned shop while her smiling father arranges potted plants and jars of local products on wooden shelves, warm interior with hanging lamps, a window showing a Bangkok street with a temple roof in the distance, sense of passing the business to the next generation.
```

**P02 — ปริญญาโท**
```
A Thai office worker in their late twenties studies late at night at a small desk in a cozy condo, open textbooks, a laptop and a mug of coffee, a graduation cap resting on a bookshelf, city lights glowing through the window, focused and determined mood.
```

**P03 — สร้างครอบครัว**
```
A young Thai couple sits on the floor of a bright living room playing with their toddler, toys and cushions around them, family photos in frames on the wall without any readable details, afternoon sunlight through sheer curtains, warm and tender mood.
```

**P04 — วิ่งมาราธอน**
```
A Thai runner in sportswear jogs along a riverside promenade at sunrise, a few other runners in the distance, river boats and a bridge softly in the background, morning mist, energetic but peaceful mood, runner centered mid-stride.
```

**P05 — เที่ยวรอบโลก**
```
A backpacker stands at a scenic viewpoint looking out over a valley with mountains and a distant old town, a camera around the neck and a folded paper map in hand, small travel stickers on the backpack without text, wide sense of adventure and freedom.
```

**P06 — บ้านของตัวเอง**
```
A Thai person holds up a set of house keys in front of a small modern townhouse with a little front garden, a few moving boxes on the porch, a potted plant by the door, late-afternoon light, feeling of pride and a fresh start.
```

**P07 — สตาร์ทอัพ**
```
A small diverse team of young Thai founders gathers around a whiteboard covered in colorful sticky notes and simple diagrams with no readable words, laptops open on a shared table in a sunny co-working space with plants, energetic brainstorming mood.
```

**P08 — อาสาสมัครชุมชน**
```
Volunteers of different ages plant young trees and paint a small community school wall together, children helping with watering cans, a simple village street with a Thai-style roof in the background, bright cheerful community spirit.
```

**P09 — เขียนหนังสือ**
```
A writer sits by a window desk in the early morning writing in a notebook beside a neat stack of printed manuscript pages, a cup of tea and a sleeping cat on the windowsill, soft dawn light, quiet and reflective mood.
```

**P10 — อสังหาให้เช่า**
```
The exterior of a tidy low-rise apartment building with balconies and plants, a landlord holding keys greets a young tenant carrying a box at the entrance, clean street with a tree, calm and reliable mood.
```

**P11 — ดูแลพ่อแม่**
```
An adult Thai son or daughter walks slowly arm in arm with an elderly parent through a garden path lined with flowers, the parent smiling, a traditional wooden Thai house in the background, golden late-afternoon light, gentle and caring mood.
```

**P12 — ฝึกสติ**
```
A person meditates cross-legged on a wooden platform in a quiet temple garden at dawn, lotus pond in front, soft morning mist, a temple roof silhouette in the background, very calm and still mood with lots of soft space.
```

---

## 4. อาชีพ (8 ภาพ)

ภาพขึ้นบนการ์ดอาชีพในหน้าเลือกตอนเริ่มเกม

| ไฟล์ | อาชีพ |
|---|---|
| `C01.webp` | พนักงานบริษัท |
| `C02.webp` | ข้าราชการ |
| `C03.webp` | วิศวกรซอฟต์แวร์ |
| `C04.webp` | พยาบาล |
| `C05.webp` | ฟรีแลนซ์ครีเอทีฟ |
| `C06.webp` | เจ้าของร้านค้า |
| `C07.webp` | ครู |
| `C08.webp` | นักขาย |

**C01 — พนักงานบริษัท**
```
A young Thai office employee in smart casual clothes works at a desk in a bright open-plan office with plants, colleagues chatting in the background, a window view of Bangkok high-rises, productive everyday mood.
```

**C02 — ข้าราชการ**
```
A Thai civil servant in a neat plain uniform without insignia helps a citizen at a service counter in a clean government office, documents and a stamp on the desk, ceiling fans and a Thai-style building visible through the window, steady and dependable mood.
```

**C03 — วิศวกรซอฟต์แวร์**
```
A software engineer works at a desk with two monitors showing abstract colorful code-like shapes with no readable characters, headphones around the neck, a small plant and a mechanical keyboard, a cozy modern tech office in the evening.
```

**C04 — พยาบาล**
```
A Thai nurse in scrubs checks on a smiling patient in a bright hospital ward, holding a clipboard, a window with trees outside, caring and professional mood.
```

**C05 — ฟรีแลนซ์ครีเอทีฟ**
```
A freelance designer draws on a pen tablet in a small home studio full of sketches pinned to the wall without text, color swatches, plants and a laptop, a cat on a stool, creative and independent mood.
```

**C06 — เจ้าของร้านค้า**
```
A cheerful Thai shop owner stands behind the counter of a small neighborhood grocery store with colorful products on shelves without readable labels, a customer paying with a phone, a street view through the open shopfront.
```

**C07 — ครู**
```
A Thai teacher explains a lesson to a class of attentive students in uniform in a sunny classroom, a chalkboard with simple drawings and no readable words, plants on the windowsill, warm and inspiring mood.
```

**C08 — นักขาย**
```
A Thai salesperson in business attire shakes hands with a client across a café table, a tablet showing an abstract chart without numbers, coffee cups, busy city street outside the window, confident and friendly mood.
```

---

## 5. ประจำยุค (4 ภาพ)

ภาพขึ้นบนการ์ดเหตุการณ์ชีวิตของยุคนั้น (ยุคละ 6 ใบใช้ภาพเดียวกัน) ให้ทั้ง 4 ภาพเล่าชีวิตคนคนหนึ่งไล่ตามช่วงอายุ ส่วนแสงในภาพไล่จากเช้าตรู่ไปจนถึงยามเย็น

| ไฟล์ | ยุค | แสง |
|---|---|---|
| `era-1.webp` | I เริ่มต้น (22–30) | เช้าตรู่ |
| `era-2.webp` | II สร้างตัว (31–40) | สาย |
| `era-3.webp` | III จุดสูงสุด (41–50) | บ่ายแก่ |
| `era-4.webp` | IV ส่งต่อ (51–60+) | เย็น |

**era-1 — เริ่มต้น**
```
A young Thai graduate in their early twenties walks to their first job on a busy Bangkok street at early morning, holding a coffee and a tote bag, BTS skytrain overhead, street food stalls and fresh morning light, hopeful beginning.
```

**era-2 — สร้างตัว**
```
A Thai adult in their thirties juggles life in a busy mid-morning scene: carrying a laptop bag in one hand and holding a young child's hand with the other, walking past a new townhouse under construction, full and energetic chapter of life.
```

**era-3 — จุดสูงสุด**
```
A Thai professional in their forties stands at the window of a high-floor office looking out over the Bangkok skyline and the Chao Phraya river in warm late-afternoon light, a sense of achievement mixed with quiet reflection.
```

**era-4 — ส่งต่อ**
```
A Thai person in their late fifties sits on a wooden veranda in a garden at sunset teaching a young grandchild to plant a seedling, a teapot on a small table, warm golden evening light, legacy and gratitude.
```

---

## 6. Echo (2 ภาพ)

ภาพขึ้นบนการ์ด Echo ที่ย้อนกลับมาจากการตัดสินใจในอดีต หัวการ์ดมีสีบอกอยู่แล้วว่าดีหรือร้าย ภาพจึงไม่ต้องบอกซ้ำตรงๆ แต่ควรให้อารมณ์เรื่อง "อดีตที่ตามมาถึง"

| ไฟล์ | ประเภท |
|---|---|
| `echo-good.webp` | ผลสะท้อนที่ดี (การ์ดหัวสี teal) |
| `echo-bad.webp` | ผลสะท้อนที่ต้องรับมือ (การ์ดหัวสีส้มแดง) |

**echo-good — ผลดีที่ย้อนกลับมา**
```
A person stands on a wooden pier over calm water as gentle glowing ripples travel back toward them from the distance, faint warm light trails of earlier footsteps along the pier behind them, soft teal and gold tones, sense that past kindness is returning, hopeful and serene.
```

**echo-bad — ผลที่ต้องรับมือ**
```
A person stands on a wooden pier at dusk as slightly rougher ripples roll back toward them across the water, clouds gathering softly on the horizon, coral and muted navy tones, a lantern in their hand, sense that a past choice has come back and must be faced, thoughtful rather than frightening.
```

---

## 7. Checklist ก่อนวางไฟล์

- [ ] ไม่มีตัวหนังสือ ตัวเลข ป้าย หรือโลโก้ในภาพ (ซูมตรวจป้ายร้านกับจอคอมในภาพทุกครั้ง)
- [ ] ของสำคัญอยู่ในกลาง 60% ลองบังบนล่างฝั่งละ 20% แล้วยังเข้าใจภาพไหม
- [ ] สีและลายเส้นเข้าชุดกับภาพอื่น (เปิดดูเรียงกันทั้งชุด)
- [ ] 1600 × 900 px, `.webp`, ไม่เกิน 300 KB
- [ ] ชื่อไฟล์ตรงตาราง เช่น `P01.webp` ไม่ใช่ `p01.WEBP`

ตรวจไฟล์ทั้งหมดด้วยคำสั่งนี้:
```bash
node tools/check-art.js
```

**ลำดับที่แนะนำ:** ทำ `P01` ก่อน เพื่อหา style ที่ชอบ แล้วใช้เป็นภาพอ้างอิงทำ Project ที่เหลือ → อาชีพ → ยุค → Echo
ระหว่างที่ภาพยังไม่ครบ เกมใช้ไอคอนแทนไปก่อน ใส่ไฟล์ไหนเข้าไปก็เห็นภาพนั้นทันที

**หมายเหตุ:** ภาพทั้งหมดเป็นภาพสร้างใหม่ ไม่อ้างอิงคน แบรนด์ หรือสถานที่จริงที่ระบุตัวตนได้ ถ้าจะนำเกมไปขาย ควรตรวจเงื่อนไขการใช้งานเชิงพาณิชย์ของเครื่องมือสร้างภาพที่ใช้ด้วย
