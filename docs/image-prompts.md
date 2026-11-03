# LIFE CEO — Image Prompts (82 ภาพ)

ภาพประกอบการ์ดชุดแรก 27 ภาพ: Life Project 12, อาชีพ 8, ประจำยุค 4, Echo 2, โอกาส 1
ชุดที่สอง 36 ภาพ: โอกาสแยกใบ 12 (หัวข้อ 7.1) และเหตุการณ์ชีวิตแยกใบ 24 (หัวข้อ 7.2) · ชุดที่สาม 19 ภาพ: Echo แยกใบ (หัวข้อ 6.1) ใช้ Style Lock ฉบับเต็มที่ `docs/style-lock-base.md`
การ์ดเป้าหมายชีวิตใช้ไอคอน ไม่ต้องทำภาพ

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

## 6.1 Echo แยกใบ (19 ภาพ)

การ์ด Echo ใบไหนมีภาพของตัวเอง เกมใช้ภาพนั้นแทน `echo-good` / `echo-bad` ใบไหนยังไม่มีก็ใช้ภาพรวมเหมือนเดิม
ภาพต้องเล่า **ผลที่ย้อนกลับมาหลังผ่านไปหลายปี** อายุตัวละครจึงมากกว่าตอนเลือกหนึ่งยุค ใช้ Style Lock เต็มจาก `docs/style-lock-base.md` ต่อท้ายทุก prompt
E01 ไม่ได้มาจากตัวเลือกใด engine ส่งเข้าคิวเองทุกครั้งที่ผู้เล่น Burnout

| ไฟล์ | ผล | การ์ด | ย้อนกลับมาจาก |
|---|---|---|---|
| `E01.webp` | ร้าย | สัญญาณเตือนจากร่างกาย | Burnout ครั้งก่อน |
| `E02.webp` | ดี | ดอกผลแรก | V101 เริ่มลงทุนทันที · O10 |
| `E03.webp` | ร้าย | เพื่อนห่างหาย | V102 ไม่ไปเที่ยว |
| `E04.webp` | ร้าย | หนี้บัตรพอกพูน | V104 รูดบัตรเลย |
| `E05.webp` | ร้าย | สุขภาพเริ่มฟ้อง | V106 ทำงานต่อ |
| `E06.webp` | ดี | หุ้นส่วนเก่า | V201 · P07 · O11 |
| `E07.webp` | ดี | ผลงานที่คนจำได้ | V203 อาสารับงานเพิ่ม |
| `E08.webp` | ร้าย | ความรู้สึกผิดต่อพ่อแม่ | V204 ไว้ค่อยว่ากัน |
| `E09.webp` | ดี | เครือข่ายธุรกิจ | V206 · P08 |
| `E10.webp` | ร้าย | ลูกโตมาโดยไม่มีเรา | V301 รับตำแหน่งต่างประเทศ |
| `E11.webp` | ร้าย | โรคเรื้อรัง | V302 ไว้ก่อน |
| `E12.webp` | ดี | ตลาดฟื้นตัว | V303 ถือต่ออย่างมีวินัย |
| `E13.webp` | ร้าย | บทสนทนาที่ไม่เคยเกิดขึ้น | V305 ให้คู่ชีวิตจัดการ |
| `E14.webp` | ร้าย | แชร์ลูกโซ่ล่ม | V404 ลงทุน |
| `E15.webp` | ร้าย | พนักงานลาออก | P01 ขยายสาขา |
| `E16.webp` | ร้าย | นักลงทุนเร่งผลงาน | P07 รับเงินนักลงทุน |
| `E17.webp` | ดี | ร่างกายที่ดูแลมา | V106 ปรับตารางชีวิต · P04 |
| `E18.webp` | ดี | เพื่อนในวันที่ลำบาก | V102 · V202 |
| `E19.webp` | ดี | ครอบครัวที่อยู่ข้างกัน | V204 · V305 |

**E01 — สัญญาณเตือนจากร่างกาย**
```
A Thai professional in their thirties sitting on the edge of an office chair late in the evening, one hand pressed to the back of the neck and eyes closed, a half-finished cup of coffee and a blinking laptop (blank screen) in front of them, colleagues already gone home, the body quietly asking for rest.
```

**E02 — ดอกผลแรก**
```
A Thai person in their thirties watering a small potted money plant on a sunny windowsill, its leaves now noticeably bigger than in an old photo pinned beside it, a tablet with a gently rising line chart (shapes only, no numbers) on the table, quiet satisfaction that early savings have grown.
```

**E03 — เพื่อนห่างหาย**
```
A Thai person alone at their desk on a weekend scrolling a phone (blank screen) while through the window a group of old friends laugh together at a cafe across the street without them, a slightly lonely expression.
```

**E04 — หนี้บัตรพอกพูน**
```
A Thai person at a kitchen table at night staring at a growing stack of blank credit card statements, a plain credit card with no logo on top, a calculator and a cold cup of tea, the stack casting a long shadow, worried but determined.
```

**E05 — สุขภาพเริ่มฟ้อง**
```
A Thai professional in their thirties lying awake in bed at night holding their lower back, a laptop still open on the bedside table (blank screen), a pill bottle and glass of water, city lights through the curtains, the body catching up with years of late nights.
```

**E06 — หุ้นส่วนเก่า**
```
A Thai person stepping into a now busy and successful coffee shop that started as a tiny shophouse, the old business partner behind the counter waving happily, customers filling every table, a framed photo of the empty shop on opening day on the wall (blank faces), warm pride.
```

**E07 — ผลงานที่คนจำได้**
```
A senior Thai executive warmly shaking hands with the main character in a bright office corridor, colleagues smiling and applauding in the background, a thick old project folder under the main character's arm, recognition for loyalty during hard times.
```

**E08 — ความรู้สึกผิดต่อพ่อแม่**
```
A Thai adult hurrying into a simple hospital room where an elderly father rests with an oxygen cannula, the mother sitting tired beside the bed, the adult still holding car keys and a work bag, regret and love in the expression.
```

**E09 — เครือข่ายธุรกิจ**
```
A Thai professional at a lively business lunch being introduced by a friendly contact to a new partner, three people shaking hands over a table with coffee and a blank proposal folder, warm daylight, doors opening through relationships.
```

**E10 — ลูกโตมาโดยไม่มีเรา**
```
A Thai parent standing in the doorway of a teenager's bedroom, the teenager wearing headphones and turned toward a desk, posters (blank) on the wall, a forgotten childhood drawing on the floor, the parent holding a souvenir gift, distance that grew quietly.
```

**E11 — โรคเรื้อรัง**
```
A Thai person in their forties at a kitchen counter in the morning checking blood sugar with a small glucose meter (blank display), a weekly pill organizer and a plate of plain vegetables, sneakers by the door, accepting a new daily routine.
```

**E12 — ตลาดฟื้นตัว**
```
A Thai investor in their forties opening the curtains of a home office in the morning sunlight, a laptop showing a line chart climbing back up (shapes only, no numbers), a steaming cup of tea, calm relief after holding through the storm.
```

**E13 — บทสนทนาที่ไม่เคยเกิดขึ้น**
```
A Thai parent and a teenage child sitting at opposite ends of a quiet dinner table, both looking at their phones (blank screens), an empty chair between them, a school report (blank) left unopened, silence that has become normal.
```

**E14 — แชร์ลูกโซ่ล่ม**
```
A Thai person in their late fifties standing outside a locked, empty office with a "for rent" style blank sign on the glass door, holding a glossy brochure and a phone showing an unanswered call (blank screen), other worried investors gathering behind, shock and disbelief.
```

**E15 — พนักงานลาออก**
```
A Thai shop owner standing in a newly opened branch store as several staff members in aprons walk out carrying their belongings, empty counters and shelves half stocked, the owner holding a set of keys, the cost of growing too fast.
```

**E16 — นักลงทุนเร่งผลงาน**
```
A Thai startup founder in a glass meeting room facing stern investors pointing at a whiteboard with an unrealistically steep arrow (shapes only, no numbers), the founder's team looking exhausted behind laptops, pressure for growth at any cost.
```

**E17 — ร่างกายที่ดูแลมา**
```
A healthy Thai person in their forties jogging energetically along a riverside park at sunrise while peers sit on a bench looking tired, sneakers, a water bottle, the reward of years of looking after the body.
```

**E18 — เพื่อนในวันที่ลำบาก**
```
A Thai person sitting worried on the steps of their home when old friends arrive carrying grocery bags and a pot of food, one friend putting an arm around their shoulder, warm evening light, friendship returned in hard times.
```

**E19 — ครอบครัวที่อยู่ข้างกัน**
```
A Thai professional coming home exhausted late at night to find the family has already prepared dinner, a teenager clearing the table and an elderly parent pouring tea, a note on the fridge (blank), quiet support without being asked.
```

---

## 7. โอกาส (1 ภาพ)

ภาพนี้ใช้ร่วมกันกับการ์ดโอกาสทั้ง 12 ใบ เพราะการ์ดโอกาสขึ้นเฉพาะตอนกด "สำรวจโอกาส" และแต่ละใบมีประโยคเปิดฉากของตัวเองอยู่แล้ว ภาพจึงไม่ต้องเล่าเรื่องเฉพาะใบ ขอแค่ให้ความรู้สึกว่า "มีประตูบานใหม่เปิดออกมา"
หัวการ์ดโอกาสเป็นสีทอง (mustard) ภาพจึงควรโทนอุ่นออกทอง แต่ยังให้เข้าชุดกับภาพอื่น

| ไฟล์ | ใช้กับ |
|---|---|
| `opportunity.webp` | การ์ดโอกาสทุกใบ |

**opportunity — โอกาสที่เข้ามา**
```
A tall wooden door in a sunlit Thai courtyard stands slightly ajar, warm golden light spilling out through the gap onto stone steps, beyond the courtyard several garden paths branch off in different directions and fade softly into the distance, potted plants and a few floating leaves caught in the light, a small figure seen from behind pausing at the threshold, inviting and hopeful mood with mustard and warm cream tones.
```

---

## 7.1 โอกาสแยกใบ (12 ภาพ)

การ์ดโอกาสขึ้นพร้อมกันครั้งละ 2–3 ใบ ภาพแยกใบช่วยให้แต่ละใบไม่ซ้ำกัน ใบไหนยังไม่มีภาพ เกมใช้ `opportunity.webp` แทน
ใช้ Style Lock เต็มจาก `docs/style-lock-base.md` (หรือ Reusable Short Prompt ท้ายไฟล์) ต่อท้ายทุก prompt

| ไฟล์ | การ์ด |
|---|---|
| `O01.webp` ✅ | งานฟรีแลนซ์ช่วงสั้น |
| `O02.webp` ✅ | สัมมนาเครือข่ายวิชาชีพ |
| `O03.webp` ✅ | ทุนอบรมต่างประเทศ |
| `O04.webp` ✅ | จองซื้อหุ้น IPO |
| `O05.webp` ✅ | ทริปครอบครัวราคาพิเศษ |
| `O06.webp` ✅ | สมาชิกฟิตเนสรายปี |
| `O07.webp` ✅ | ได้รับเชิญเป็นวิทยากร |
| `O08.webp` ✅ | ซื้อรถผ่อนดอกเบี้ยต่ำ |
| `O09.webp` ✅ | พี่เลี้ยงในสายงาน |
| `O10.webp` ✅ | คอร์สการเงินส่วนบุคคล |
| `O11.webp` ✅ | ร่วมทุนร้านเพื่อน |
| `O12.webp` ✅ | อาสาสมัครวันหยุด |

**O01 — งานฟรีแลนซ์ช่วงสั้น**
```
A Thai young professional working late at a tidy home desk by a window, laptop open with a blank glowing screen, a phone lighting up with a new message, a small notebook and a cup of tea, city lights soft in the background, focused and quietly determined, a short burst of extra work.
```

**O02 — สัมมนาเครือข่ายวิชาชีพ**
```
A bright hotel function room during a professional seminar coffee break, Thai professionals chatting in small groups, the main character exchanging blank business cards with a friendly colleague, coffee cups and pastries on a side table, warm and welcoming networking mood.
```

**O03 — ทุนอบรมต่างประเทศ**
```
A Thai young professional with a rolling suitcase at a sunny airport departure gate, turning back to wave at family and friends behind a glass wall, a plane visible through the large windows, excitement mixed with a little homesickness, no flags, no airline logos, blank departure screens.
```

**O04 — จองซื้อหุ้น IPO**
```
A Thai person sitting at a cafe table in the morning, looking at a tablet with a simple rising line chart (shapes only, no numbers), a notebook and coffee beside them, other people around also checking their phones, hopeful anticipation about a new investment.
```

**O05 — ทริปครอบครัวราคาพิเศษ**
```
A Thai family of three generations enjoying a quiet off-season beach together, children building a sand castle, grandparents under a beach umbrella, soft clouds and gentle waves, relaxed and joyful family time.
```

**O06 — สมาชิกฟิตเนสรายปี**
```
A Thai person in workout clothes signing up at a bright modern gym reception, holding a new water bottle, treadmills and plants visible behind a glass wall, a friendly staff member smiling, fresh start and motivation.
```

**O07 — ได้รับเชิญเป็นวิทยากร**
```
A Thai professional speaking confidently on a small seminar stage with a microphone, a projector screen behind them showing simple shapes only, an attentive audience in rows of chairs nodding and taking notes, recognition and pride.
```

**O08 — ซื้อรถผ่อนดอกเบี้ยต่ำ**
```
A Thai person standing beside a shiny new compact car at a sunlit car showroom, holding the key and smiling, a salesperson holding a blank contract folder nearby, glass windows and plants, excitement with a hint of thoughtfulness about the commitment.
```

**O09 — พี่เลี้ยงในสายงาน**
```
A Thai young professional sitting across from a kind senior mentor in a cozy coffee shop, the mentor sketching a simple ladder diagram on a napkin (no text), the younger person taking notes eagerly, warm afternoon light, guidance and gratitude.
```

**O10 — คอร์สการเงินส่วนบุคคล**
```
An evening adult-education classroom, Thai learners of different ages at tables with calculators and blank workbooks, an instructor pointing at a whiteboard with a simple pie chart and bar shapes (no text), the main character having an "aha" moment, curiosity and growth.
```

**O11 — ร่วมทุนร้านเพื่อน**
```
A Thai person and a cheerful friend shaking hands in front of a small neighborhood noodle shop being freshly renovated, a ladder and paint cans nearby, a blank wooden signboard, plastic stools and steaming pots, friendship and a small shared dream.
```

**O12 — อาสาสมัครวันหยุด**
```
Thai neighbors of all ages volunteering on a Sunday morning to repaint a small community playground under big shady trees, the main character painting a slide together with a smiling child, paint cans and brushes around, community spirit and warmth.
```

---

## 7.2 เหตุการณ์ชีวิตแยกใบ (24 ภาพ)

การ์ดเหตุการณ์ใบไหนมีภาพของตัวเอง เกมใช้ภาพนั้นแทนภาพประจำยุค ใบไหนยังไม่มีภาพ เกมใช้ `era-N.webp` เหมือนเดิม
ภาพต้องเล่า **ช่วงเวลาที่ต้องตัดสินใจ** ห้ามบอกผลของตัวเลือกใดตัวเลือกหนึ่ง ผู้เล่นจะได้ไม่รู้สึกว่าภาพชี้คำตอบ อายุตัวละครหลักให้ตรงตามยุคของการ์ด

| ไฟล์ | ยุค | การ์ด |
|---|---|---|
| `V101.webp` ✅ | I | เงินเดือนก้อนแรก |
| `V102.webp` ✅ | I | เพื่อนชวนเที่ยวต่างประเทศ |
| `V103.webp` ✅ | I | ข้อเสนอที่ปฏิเสธยาก |
| `V104.webp` ✅ | I | บัตรเครดิตใบแรก |
| `V105.webp` ✅ | I | คอร์สออนไลน์ลดราคา |
| `V106.webp` ✅ | I | นอนดึกติดต่อกันหลายเดือน |
| `V201.webp` ✅ | II | เพื่อนชวนร่วมหุ้น |
| `V202.webp` ✅ | II | งานแต่งเพื่อนสนิท |
| `V203.webp` ✅ | II | บริษัทปรับโครงสร้าง |
| `V204.webp` ✅ | II | พ่อแม่เริ่มต้องการคนดูแล |
| `V205.webp` ✅ | II | โบนัสก้อนใหญ่ |
| `V206.webp` ✅ | II | ลูกค้าคนสำคัญชวนดื่ม |
| `V301.webp` ✅ | III | ข้อเสนองานต่างประเทศ |
| `V302.webp` ✅ | III | ผลตรวจสุขภาพผิดปกติ |
| `V303.webp` ✅ | III | ตลาดหุ้นผันผวนหนัก |
| `V304.webp` ✅ | III | เพื่อนเก่าป่วยหนัก |
| `V305.webp` ✅ | III | คนในบ้านต้องการคุณ |
| `V306.webp` ✅ | III | วิกฤตวัยกลางคน |
| `V401.webp` ✅ | IV | ข้อเสนอเกษียณก่อนกำหนด |
| `V402.webp` ✅ | IV | หลานคนแรก |
| `V403.webp` ✅ | IV | มูลนิธิชวนเป็นกรรมการ |
| `V404.webp` ✅ | IV | ข้อเสนอลงทุนผลตอบแทนสูงผิดปกติ |
| `V405.webp` ✅ | IV | คนใกล้ตัวป่วยเรื้อรัง |
| `V406.webp` ✅ | IV | ส่งต่อความรู้ |

### ยุค I เริ่มต้น (22–30)

**V101 — เงินเดือนก้อนแรก**
```
A Thai graduate in their early twenties sitting on the edge of a bed in a small rented room, looking at a phone showing a blank banking screen with a quiet proud smile, a paper gift bag and a small savings jar on the desk beside them, morning light, the first salary and many choices ahead.
```

**V102 — เพื่อนชวนเที่ยวต่างประเทศ**
```
A group of Thai friends in their twenties laughing together in a cafe, one holding up a phone with travel photos (blank screen), the main character in the middle holding a coffee and a wallet, torn between fun with friends and saving, warm afternoon light.
```

**V103 — ข้อเสนอที่ปฏิเสธยาก**
```
A Thai young employee standing in a bright open-plan office while a manager holds out a thick blank project folder, behind the employee a window shows the evening sky and a gym bag on their chair, a decision between career and personal time.
```

**V104 — บัตรเครดิตใบแรก**
```
A Thai young adult at a kitchen table opening an envelope and holding a brand-new plain credit card with no logo, a laptop showing an online shop (blank screen) beside them, a moment of temptation and responsibility, soft morning light.
```

**V105 — คอร์สออนไลน์ลดราคา**
```
A Thai young professional on a sofa at night with a laptop showing an online course page (blank screen), headphones around the neck, a notebook and pen ready, a cat sleeping nearby, ambition and the wish to learn.
```

**V106 — นอนดึกติดต่อกันหลายเดือน**
```
A Thai young professional at a desk late at night, lit by a laptop and a desk lamp, empty coffee cups lined up, a wall clock showing very late hours (no numbers), tired eyes but still typing, a quiet warning about health.
```

### ยุค II สร้างตัว (31–40)

**V201 — เพื่อนชวนร่วมหุ้น**
```
Two Thai friends in their thirties standing inside an empty shophouse unit about to become a coffee shop, one holding blank floor plans and gesturing excitedly, the other thinking carefully with arms crossed, sunlight through the shutters, a shared dream and a real risk.
```

**V202 — งานแต่งเพื่อนสนิท**
```
A Thai wedding reception at a garden venue, the main character helping a close friend in a wedding dress arrange flowers and blank place cards, guests arriving under string lights, friendship and joyful busyness.
```

**V203 — บริษัทปรับโครงสร้าง**
```
A Thai office in mid-restructuring, several empty desks with boxes, the main character at their desk with a growing stack of folders as colleagues carry boxes out, uncertainty and quiet resilience, soft daylight.
```

**V204 — พ่อแม่เริ่มต้องการคนดูแล**
```
A Thai adult in their thirties kneeling to help an elderly father with a walking cane sit down in a simple home living room, the mother watching with worry and relief, family photos on the wall (blank frames), love and a new responsibility.
```

**V205 — โบนัสก้อนใหญ่**
```
A Thai professional at their desk opening an envelope with a happy surprised smile, colleagues cheering in the background, on the desk a small plant, a family photo frame (blank) and a piggy bank, many ways to use the reward.
```

**V206 — ลูกค้าคนสำคัญชวนดื่ม**
```
A Thai professional at an upscale rooftop restaurant at dusk, a big client raising a glass across the table, the main character smiling politely while glancing at a phone with a family message (blank screen), balancing work relationships and personal life.
```

### ยุค III จุดสูงสุด (41–50)

**V301 — ข้อเสนองานต่างประเทศ**
```
A Thai executive in their forties holding a blank job offer letter at home in the evening, a spouse and a child at the dining table behind them, through the window a city skyline, a big opportunity weighed against family life, no flags.
```

**V302 — ผลตรวจสุขภาพผิดปกติ**
```
A Thai professional in their forties sitting in a calm hospital consultation room, a kind doctor pointing at a simple chart on a tablet (shapes only, no text), the patient holding a blank health report with a thoughtful expression, a wake-up call about health.
```

**V303 — ตลาดหุ้นผันผวนหนัก**
```
A Thai investor in their forties at a home desk at night looking at a laptop with a sharply falling red line chart (shapes only, no numbers), hand on chin, a cup of tea going cold, staying calm in a storm, rain on the window.
```

**V304 — เพื่อนเก่าป่วยหนัก**
```
A Thai adult visiting an old school friend in a hospital room, sitting by the bed and holding their hand, a basket of fruit on the side table, an old school photo (blank faces) propped up, friendship, care and memories.
```

**V305 — คนในบ้านต้องการคุณ**
```
A Thai parent in work clothes sitting in a small school classroom across from a kind teacher, their child sitting beside them looking down, a wall clock and a phone buzzing with work messages (blank screen), family needs at an inconvenient time.
```

**V306 — วิกฤตวัยกลางคน**
```
A Thai person in their forties standing alone on a quiet balcony at dawn, holding a mug and looking at the horizon, a calendar on the wall behind with identical-looking days (no numbers), reflection about life direction, soft hazy light.
```

### ยุค IV ส่งต่อ (51–60+)

**V401 — ข้อเสนอเกษียณก่อนกำหนด**
```
A Thai employee in their late fifties at their office desk reading a blank document about early retirement, a framed photo of a garden and a fishing rod leaning in the corner, colleagues working nearby, a peaceful choice between rest and continuing.
```

**V402 — หลานคนแรก**
```
A Thai person in their late fifties gently holding a newborn grandchild in a bright home, the young parents smiling beside them, soft afternoon light through curtains, joy and a new chapter of family.
```

**V403 — มูลนิธิชวนเป็นกรรมการ**
```
A Thai person in their late fifties visiting a rural school supported by an education foundation, children waving from classroom windows, a foundation staff member offering a blank invitation folder, purpose and giving back.
```

**V404 — ข้อเสนอลงทุนผลตอบแทนสูงผิดปกติ**
```
A smooth-talking acquaintance in a shiny suit presenting a glossy blank brochure to a thoughtful Thai person in their late fifties at a cafe, an upward arrow shape glowing too brightly on the brochure, the listener looking carefully over their reading glasses, healthy skepticism.
```

**V405 — คนใกล้ตัวป่วยเรื้อรัง**
```
A Thai person in their late fifties caring for a frail loved one at home, adjusting a blanket on a bed by a window with plants, medicine boxes on the side table, a tired but loving expression, long-term care and devotion.
```

**V406 — ส่งต่อความรู้**
```
A Thai senior professional in their late fifties sitting at a long wooden table with several young colleagues, sharing stories over notebooks and coffee, the younger people listening and taking notes, warm late-afternoon light, mentorship and legacy.
```

---

## 8. Checklist ก่อนวางไฟล์

- [ ] ไม่มีตัวหนังสือ ตัวเลข ป้าย หรือโลโก้ในภาพ (ซูมตรวจป้ายร้านกับจอคอมในภาพทุกครั้ง)
- [ ] ของสำคัญอยู่ในกลาง 60% ลองบังบนล่างฝั่งละ 20% แล้วยังเข้าใจภาพไหม
- [ ] สีและลายเส้นเข้าชุดกับภาพอื่น (เปิดดูเรียงกันทั้งชุด)
- [ ] 1600 × 900 px, `.webp`, ไม่เกิน 300 KB
- [ ] ชื่อไฟล์ตรงตาราง เช่น `P01.webp` ไม่ใช่ `p01.WEBP`

ตรวจไฟล์ทั้งหมดด้วยคำสั่งนี้:
```bash
node tools/check-art.js
```

**ลำดับที่แนะนำ:** ทำ `P01` ก่อน เพื่อหา style ที่ชอบ แล้วใช้เป็นภาพอ้างอิงทำ Project ที่เหลือ → ยุค → อาชีพ → Echo → โอกาส
ระหว่างที่ภาพยังไม่ครบ เกมใช้ไอคอนแทนไปก่อน ใส่ไฟล์ไหนเข้าไปก็เห็นภาพนั้นทันที

**หมายเหตุ:** ภาพทั้งหมดเป็นภาพสร้างใหม่ ไม่อ้างอิงคน แบรนด์ หรือสถานที่จริงที่ระบุตัวตนได้ ถ้าจะนำเกมไปขาย ควรตรวจเงื่อนไขการใช้งานเชิงพาณิชย์ของเครื่องมือสร้างภาพที่ใช้ด้วย
