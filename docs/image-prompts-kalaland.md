# KALALAND — Image Prompts v3.0 (โหมดกะลาแลนด์ · 73 ภาพ)

ทุก prompt ใช้ **KALALAND Image Style Lock v3.0** (`docs/kalaland-style-lock.md`) วาง Style Lock เต็มไว้ก่อน แล้วต่อด้วยบล็อก Scene ของแต่ละภาพ (v2.0 เดิมเก็บไว้ที่ `docs/kalaland-style-lock-v2.md`)

**สิ่งที่เปลี่ยนจากชุดก่อน:** ทุกบล็อกเพิ่ม `Character Look` ดึงจากตัวละครประจำจักรวาล (Style Lock §11) และ `Palette Accent` จากชุดสี 12 สี ตัวละครปรับให้ realistic and relatable ขึ้น และองค์ประกอบเน้นตัวละครหลัก

**สเปกไฟล์:** 16:9 ส่งมาขนาดไหนก็ได้ ผมแปลงเป็น 1600×900 WebP เอง · วางที่ `assets/art/kala/<ไฟล์>.webp` · ห้ามมีตัวหนังสือ ป้าย ตัวเลข หรือโลโก้ · ของสำคัญอยู่ช่วงกลาง 60% ของความสูง

**ความปลอดภัย (Style Lock §12):** ตัวละครทุกตัวเป็นคนสมมติ ห้ามหน้าคล้ายนักการเมืองหรือคนดังจริง ห้ามสี โลโก้ หรือตราของพรรคหรือหน่วยงานจริง วัดเป็นได้แค่ฉากหลัง

**ในโหมดนี้ทุกภาพมาจาก `assets/art/kala/`** ทั้งอาชีพ Life Project โอกาส และการ์ดเหตุการณ์ ไม่ปนกับภาพชุดโหมดปกติ ไฟล์ที่ยังไม่มีจะแสดงไอคอนแทน

**ลำดับ:** เริ่มจาก **K-E05 เลือกตั้ง** เป็นภาพทดสอบแรก (ใกล้ภาพตัวอย่างในบอร์ด v3.0 ที่สุด เทียบสไตล์ได้ง่าย) → กลุ่ม **A** ที่เหลือ (39 ภาพ รวมอาชีพ 8 ภาพ เคราะห์แยกใบ 12 ภาพ โอกาส และพื้นโต๊ะ เกมมีภาพครบทุกยุค และ Echo แบบใช้ร่วม) → กลุ่ม **B** ทยอยเติม

**ชุดเคราะห์ 12 ภาพ (`K-I01`–`K-I12`):** แต่ละใบมีภาพของตัวเอง วางเป็น `assets/art/kala/K-I01.webp` … `K-I12.webp` ได้เลยโดยไม่ต้องแก้โค้ด ใบไหนยังไม่มีไฟล์ เกมจะใช้ภาพใช้ร่วม `kala-incident` แทน (ยังไม่มีอีกก็เป็นลายแถบเหลือง) ทุกใบให้ผู้เล่นเป็นตัวหลักที่โดนเคราะห์ งานบวช/งานศพไม่มีพระหรือพิธีศาสนาในภาพ ม็อบปิดถนนเห็นแค่รถติด ไม่มีผู้ชุมนุมหรือธง

| ไฟล์ | กลุ่ม | การ์ด |
|---|---|---|
| `K-C01` | A | อาชีพ · พนักงานบริษัท |
| `K-C02` | A | อาชีพ · ข้าราชการซีเริ่มต้น |
| `K-C03` | A | อาชีพ · ไรเดอร์ส่งอาหาร |
| `K-C04` | A | อาชีพ · แม่ค้าออนไลน์ |
| `K-C05` | A | อาชีพ · ครูอัตราจ้าง |
| `K-C06` | A | อาชีพ · Influencer สายรีวิว |
| `K-C07` | A | อาชีพ · โปรแกรมเมอร์ Outsource |
| `K-C08` | A | อาชีพ · ทายาทตระกูลดัง |
| `P01` | B | Project · ธุรกิจครอบครัว |
| `P02` | B | Project · ปริญญาโท |
| `P03` | B | Project · สร้างครอบครัว |
| `P04` | B | Project · วิ่งมาราธอน |
| `P05` | B | Project · เที่ยวรอบโลก |
| `P06` | B | Project · บ้านของตัวเอง |
| `P07` | B | Project · สตาร์ทอัพ |
| `P08` | B | Project · อาสาสมัครชุมชน |
| `P09` | B | Project · เขียนหนังสือ |
| `P10` | B | Project · อสังหาให้เช่า |
| `P11` | B | Project · ดูแลพ่อแม่ |
| `P12` | B | Project · ฝึกสติ |
| `kala-opportunity` | A | การ์ดโอกาส (ใช้ร่วม) |
| `kala-table` ✅ (พื้นโต๊ะ · `assets/bg/`) | A | พื้นโต๊ะกะลาแลนด์ |
| `kala-era-1` ✅ | A | ยุค I · เริ่มต้น |
| `kala-era-2` ✅ | A | ยุค II · สร้างตัว |
| `kala-era-3` ✅ | A | ยุค III · จุดสูงสุด |
| `kala-era-4` ✅ | A | ยุค IV · ส่งต่อ |
| `kala-incident` | A | การ์ดเคราะห์ (ใช้ร่วม) |
| `kala-echo-bad` | A | Echo ผลร้าย (ใช้ร่วม) |
| `kala-echo-good` | A | Echo ผลดี (ใช้ร่วม) |
| `K-E01` | B | เงินเดือนแรก |
| `K-E02` | B | คนรู้จักฝากเข้างาน |
| `K-E03` | B | เพื่อนชวนลงทุน 30% |
| `K-E04` | B | ประกันที่ไม่มีใครอยากซื้อ |
| `K-E05` | A | ไปเลือกตั้ง |
| `K-E06` | A | น้ำท่วมใหญ่ |
| `K-E07` | A | เงินทอนประมูลงาน |
| `K-E08` | B | ค่าดำเนินการเปิดร้าน |
| `K-E09` | B | นโยบายแจกเงิน |
| `K-E10` | B | ญาติขอให้ค้ำประกัน |
| `K-E11` | B | ลูกต้องเรียนพิเศษ |
| `K-E12` | A | ไม่พอใจรัฐ |
| `K-E13` | A | ซื้อเก้าอี้เกรดกราบเรียน |
| `K-E14` | B | เมกะโปรเจกต์หน้าบ้าน |
| `K-E15` | B | โรงพยาบาลรัฐ vs เอกชน |
| `K-E16` | A | ลูกผู้มีอิทธิพลในผับ |
| `K-E17` | B | บำนาญที่ไม่พอใช้ |
| `K-E18` | B | แอปรัฐรุ่นใหม่ |
| `K-E19` | B | มรดกที่ดิน |
| `K-E20` | B | ส่งต่อความรู้ |
| `K-X01` | B | แชร์ล่ม |
| `K-X02` | A | ชนะแต่ถูกตัดสิทธิ์ |
| `K-X03` | B | เครือข่ายชนะ |
| `K-X03b` | A | รัฐบาลเอื้อพวกพ้อง |
| `K-X04` | B | ทวงบุญคุณ |
| `K-X05` | A | Influencer ยักยอกเงินบริจาค |
| `K-X06` | B | โดนสอบเงินทอน |
| `K-X07` | B | ญาติหนีหนี้ |
| `K-X08` | A | โดนฟ้องจากโพสต์ |
| `K-X09` | B | ถูกหวย |
| `K-X10` | B | รถไฟฟ้าเสร็จ |
| `K-X11` | B | ผู้มีอิทธิพลเอาคืน |
| `K-I01` | A | เคราะห์ · เจอด่าน |
| `K-I02` | A | เคราะห์ · คนเมาขับชนแล้วหนี |
| `K-I03` | A | เคราะห์ · ซื้อของออนไลน์โดนโกง |
| `K-I04` | A | เคราะห์ · งบถนนหายระหว่างทาง |
| `K-I05` | A | เคราะห์ · ม็อบปิดถนน |
| `K-I06` | A | เคราะห์ · ฝุ่น PM2.5 ทะลุมาตรฐาน |
| `K-I07` | A | เคราะห์ · งานบวชญาติ |
| `K-I08` | A | เคราะห์ · งานแต่งเพื่อนร่วมงาน |
| `K-I09` | A | เคราะห์ · งานศพคนในซอย |
| `K-I10` | A | เคราะห์ · ไฟดับทั้งเขตตอนส่งงาน |
| `K-I11` | A | เคราะห์ · แก๊งคอลเซ็นเตอร์โทรมา |
| `K-I12` | A | เคราะห์ · ค่าไฟขึ้นแบบงงๆ |

---

## `K-C01` · อาชีพ · พนักงานบริษัท (A)
```text
# SCENE DESCRIPTION

Scene: An ordinary company employee comparing a tiny pay raise with rising prices

Main Characters: tired but hopeful office employee, colleagues in the background busy at their desks; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: holding a small payslip (blank) and a calculator while price-tag shapes (blank) float upward around them like balloons

Environment: cramped open-plan office with a water cooler and potted plant

Visual Irony: salary grows by steps, prices grow by leaps

Palette Accent: cobalt blue, warm grey, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-C02` · อาชีพ · ข้าราชการซีเริ่มต้น (A)
```text
# SCENE DESCRIPTION

Scene: A proud new junior civil servant

Main Characters: young officer in a new uniform, beaming parents taking a photo; exaggerated but realistic and relatable expressions

Character Look: generic government officer look (plain khaki uniform without insignia)

Main Action: posing proudly next to a towering stack of blank paperwork while counting a few coins

Environment: government office with ceiling fans

Visual Irony: stable and respected, paid in prestige

Palette Accent: sky blue, warm sand, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-C03` · อาชีพ · ไรเดอร์ส่งอาหาร (A)
```text
# SCENE DESCRIPTION

Scene: A food delivery rider in the rain

Main Characters: exhausted rider with a delivery box, customer receiving food dry under a roof; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: handing over a perfectly dry meal while soaked to the bone

Environment: rainy street with traffic

Visual Irony: five-star service, zero-star safety net

Palette Accent: cobalt blue, orange, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-C04` · อาชีพ · แม่ค้าออนไลน์ (A)
```text
# SCENE DESCRIPTION

Scene: An online seller doing a live stream to almost nobody

Main Characters: energetic seller with a ring light, piles of products, mother watching on a phone; exaggerated but realistic and relatable expressions

Character Look: influencer look (trendy outfit, phone on a selfie stick with a blank screen)

Main Action: shouting excitedly at a phone on a tripod (blank screen) with only three tiny viewer icons

Environment: small living room turned into a warehouse

Visual Irony: hustling at full volume for an audience of three

Palette Accent: orange, purple, sunflower yellow

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-C05` · อาชีพ · ครูอัตราจ้าง (A)
```text
# SCENE DESCRIPTION

Scene: A temporary teacher buried in paperwork

Main Characters: kind teacher, students waiting with raised hands; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: teaching with one hand while filling stacks of blank forms with the other

Environment: simple classroom with a fan and blackboard (blank)

Visual Irony: the paperwork gets more attention than the students

Palette Accent: leaf green, warm sand, cobalt blue

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-C06` · อาชีพ · Influencer สายรีวิว (A)
```text
# SCENE DESCRIPTION

Scene: A review influencer filming a meal

Main Characters: influencer smiling for the camera, food going cold, friends waiting to eat; exaggerated but realistic and relatable expressions

Character Look: influencer look (trendy outfit, phone on a selfie stick with a blank screen)

Main Action: posing with chopsticks above a plate for the tenth take

Environment: trendy cafe

Visual Irony: the meal is for the camera, not for eating

Palette Accent: purple, orange, pale blue

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-C07` · อาชีพ · โปรแกรมเมอร์ Outsource (A)
```text
# SCENE DESCRIPTION

Scene: A programmer coding for a foreign client at night

Main Characters: tired programmer with headphones, a foreign-client video call window (blank faces); exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: typing fast at midnight while the clock shows the client's morning

Environment: small condo room lit by monitors with blank screens

Visual Irony: world-class work at local wages

Palette Accent: cobalt blue, purple, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-C08` · อาชีพ · ทายาทตระกูลดัง (A)
```text
# SCENE DESCRIPTION

Scene: A rich heir walking past the queue

Main Characters: confident heir with sunglasses, a long queue of ordinary applicants; exaggerated but realistic and relatable expressions

Character Look: hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: walking straight through a VIP door while the queue stares

Environment: office lobby with a long line

Visual Irony: the shortcut exists, but only for certain surnames

Palette Accent: purple, sunflower yellow, earth brown

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P01` · Project · ธุรกิจครอบครัว (B)
```text
# SCENE DESCRIPTION

Scene: A family shop struggling against a giant mall

Main Characters: parent and adult child behind a tiny shop counter, a huge shiny mall looming across the road; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: sweeping the shop front while mall shoppers walk past

Environment: old shophouse street

Visual Irony: the family shop competes with a giant, armed with a broom

Palette Accent: earth brown, orange, cobalt blue

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P02` · Project · ปริญญาโท (B)
```text
# SCENE DESCRIPTION

Scene: A master's degree student juggling work and study

Main Characters: exhausted office worker with a graduation cap on top of a laptop bag; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: reading a thick blank textbook on a crowded bus

Environment: crowded bus at night

Visual Irony: more certificates, same salary

Palette Accent: cobalt blue, warm grey, sunflower yellow

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P03` · Project · สร้างครอบครัว (B)
```text
# SCENE DESCRIPTION

Scene: Starting a family on a tight budget

Main Characters: young couple holding a baby, a mountain of baby products and bills; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: calculating with a calculator while the baby smiles

Environment: small rented room

Visual Irony: the happiest expense in the world

Palette Accent: orange, pale blue, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P04` · Project · วิ่งมาราธอน (B)
```text
# SCENE DESCRIPTION

Scene: Running a marathon through smog

Main Characters: determined runner wearing a mask, other runners coughing; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: crossing a finish line under an orange smoggy sky

Environment: city road race

Visual Irony: healthy lifestyle, unhealthy air

Palette Accent: orange, warm grey, leaf green

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P05` · Project · เที่ยวรอบโลก (B)
```text
# SCENE DESCRIPTION

Scene: Travelling the world on a budget

Main Characters: budget traveler with an overstuffed backpack, a currency exchange board (blank); exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: looking at a tiny wallet in front of a sparkling foreign landmark silhouette

Environment: airport departure hall

Visual Irony: the dream trip, paid in installments

Palette Accent: sky blue, sunflower yellow, earth brown

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P06` · Project · บ้านของตัวเอง (B)
```text
# SCENE DESCRIPTION

Scene: Buying a house with a 30-year loan

Main Characters: proud new homeowner holding keys, a bank officer chaining a giant calendar to their leg; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: standing in front of a small townhouse with a chain to a calendar of many pages

Environment: new housing estate

Visual Irony: the house is yours, the loan is forever

Palette Accent: cobalt blue, earth brown, warm sand

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P07` · Project · สตาร์ทอัพ (B)
```text
# SCENE DESCRIPTION

Scene: A startup pitch to investors

Main Characters: young founder with slides, investors with bored faces; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: pitching a tiny rocket model while the investors look at their phones (blank)

Environment: co-working space

Visual Irony: disruptive idea, traditional funding gatekeepers

Palette Accent: purple, orange, cobalt blue

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P08` · Project · อาสาสมัครชุมชน (B)
```text
# SCENE DESCRIPTION

Scene: Community volunteers fixing what the system didn't

Main Characters: volunteers filling a pothole and painting a crosswalk, an official taking credit for the photo; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); generic government officer look (plain khaki uniform without insignia)

Main Action: a volunteer working while an official poses in front for a photo

Environment: neighborhood road

Visual Irony: the people do the work, someone else takes the photo

Palette Accent: leaf green, sunflower yellow, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P09` · Project · เขียนหนังสือ (B)
```text
# SCENE DESCRIPTION

Scene: Writing a book late at night

Main Characters: writer at a tiny desk surrounded by crumpled papers, a cat sleeping; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: typing on a laptop (blank screen) while a stack of rejection envelopes grows

Environment: small apartment at night

Visual Irony: dreams written after office hours

Palette Accent: cobalt blue, paper cream, purple

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P10` · Project · อสังหาให้เช่า (B)
```text
# SCENE DESCRIPTION

Scene: Being a small landlord

Main Characters: landlord holding keys, tenants of tiny rooms asking for repairs; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: balancing a leaking ceiling bucket and a rent notebook (blank)

Environment: small apartment building corridor

Visual Irony: passive income with very active problems

Palette Accent: earth brown, sky blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P11` · Project · ดูแลพ่อแม่ (B)
```text
# SCENE DESCRIPTION

Scene: Caring for aging parents

Main Characters: adult child helping an elderly parent, hospital appointment cards (blank) everywhere; exaggerated but realistic and relatable expressions

Character Look: elderly citizen look (cotton shirt, reading glasses, cloth bag); office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: carrying a parent's bag and a work laptop at the same time

Environment: hospital waiting area

Visual Irony: the sandwich generation, pressed from both sides

Palette Accent: leaf green, pale blue, warm sand

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `P12` · Project · ฝึกสติ (B)
```text
# SCENE DESCRIPTION

Scene: Practicing mindfulness in a chaotic city

Main Characters: person meditating calmly, chaos all around: traffic, construction, notifications; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: sitting cross-legged on a rooftop while horns and drills surround them

Environment: city rooftop

Visual Irony: inner peace, outer noise

Palette Accent: leaf green, cobalt blue, sunflower yellow

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-opportunity` · การ์ดโอกาส (ใช้ร่วม) (A)
```text
# SCENE DESCRIPTION

Scene: A rare open door of opportunity

Main Characters: ordinary person peeking through a slightly open door, a crowd with connections already inside; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: squeezing through the gap while a VIP walks through the main entrance

Environment: grand building entrance

Visual Irony: opportunity knocks, but the VIP door is wider

Palette Accent: sunflower yellow, cobalt blue, purple

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-table` · พื้นโต๊ะกะลาแลนด์ (A) — วางที่ `assets/bg/kala-table.webp`
```text
# SCENE DESCRIPTION

Scene: A wide background plate for a game table: a lively, chaotic big-city street corner in a fictional Southeast Asian land, seen slightly from above

Main Characters: none (no people in this image)

Character Look: none

Main Action: tangled overhead power lines, street-food carts with umbrellas, parked motorcycles on the sidewalk, potholes with puddles, campaign posters with faces only, construction pillars of an unfinished elevated train line

Environment: shophouses and a distant temple roofline at the edges; the center 70% of the frame is a calm, softly blurred road surface so game cards can sit on top

Visual Irony: a modern city skyline behind, crumbling everyday infrastructure in front

Palette Accent: warm grey, earth brown, cobalt blue

Composition: Wide, important detail only at the edges, quiet and empty center

Aspect Ratio: 21:9 (16:9 also accepted)

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-era-1` · ยุค I · เริ่มต้น (A)
```text
# SCENE DESCRIPTION

Scene: A fresh graduate starting first job in a chaotic city

Main Characters: young graduate in a new office shirt, hopeful wide eyes, tiny wallet; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: walking proudly toward a giant office tower while bills fly out of the wallet like birds

Environment: crowded big-city street at morning rush, motorcycles on the sidewalk

Visual Irony: the dream career looks huge, the salary is tiny

Palette Accent: orange, sky blue, warm sand

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-era-2` · ยุค II · สร้างตัว (A)
```text
# SCENE DESCRIPTION

Scene: A family trying to build a house brick by brick

Main Characters: tired couple with a toddler, sweating but smiling; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: stacking bricks while a loan officer keeps adding more debt bricks on their backs

Environment: small suburban housing estate under construction

Visual Irony: every brick of the dream comes with an interest rate

Palette Accent: orange, sky blue, warm sand

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-era-3` · ยุค III · จุดสูงสุด (A)
```text
# SCENE DESCRIPTION

Scene: A middle-aged manager at the top of a very small hill

Main Characters: proud manager in a tie, exhausted posture, phone buzzing; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: planting a flag on top of a tiny pile of paperwork while bigger towers of connected people tower behind

Environment: office rooftop with skyscrapers behind

Visual Irony: the peak of your career is the starting point of someone with the right surname

Palette Accent: orange, sky blue, warm sand

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-era-4` · ยุค IV · ส่งต่อ (A)
```text
# SCENE DESCRIPTION

Scene: An elderly person counting retirement money

Main Characters: grandparent with reading glasses, grandchild watching; exaggerated but realistic and relatable expressions

Character Look: elderly citizen look (cotton shirt, reading glasses, cloth bag)

Main Action: counting coins that only cover one day of a calendar

Environment: simple wooden house with a calendar and a medicine box

Visual Irony: a lifetime of work, a pension that lasts until Tuesday

Palette Accent: orange, sky blue, warm sand

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-incident` · การ์ดเคราะห์ (ใช้ร่วม) (A)
```text
# SCENE DESCRIPTION

Scene: Bad luck raining on an ordinary person

Main Characters: ordinary commuter holding an umbrella, resigned face; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: umbrella blocks rain but potholes, bills, fines and smog fall from the sky instead

Environment: busy street corner with traffic and a broken sidewalk

Visual Irony: you can prepare for rain, not for living here

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-echo-bad` · Echo ผลร้าย (ใช้ร่วม) (A)
```text
# SCENE DESCRIPTION

Scene: The past comes back to collect

Main Characters: worried office worker, a ghostly version of their younger self smiling innocently behind; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: the younger self hands over an overdue bill

Environment: dim apartment hallway

Visual Irony: past decisions always send the invoice later

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `kala-echo-good` · Echo ผลดี (ใช้ร่วม) (A)
```text
# SCENE DESCRIPTION

Scene: Rare good luck in Kalaland

Main Characters: surprised person, neighbors peeking enviously; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: catching a single golden leaf falling from a tree full of dry leaves

Environment: small neighborhood alley

Visual Irony: good luck is real, just extremely rare

Palette Accent: leaf green, sunflower yellow, sky blue

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E01` · เงินเดือนแรก (B)
```text
# SCENE DESCRIPTION

Scene: First salary disappears instantly

Main Characters: young worker opening a payslip, shocked face; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: money leaving the envelope toward a queue of landlord, bus, food vendor, phone company

Environment: tiny rental room door

Visual Irony: payday and debt day are the same day

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E02` · คนรู้จักฝากเข้างาน (B)
```text
# SCENE DESCRIPTION

Scene: A relative offers a shortcut into a famous company

Main Characters: smiling relative holding a teacup with an envelope underneath, nervous job seeker; exaggerated but realistic and relatable expressions

Character Look: hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head); office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: handing over a tea set with money tucked inside to a man in a big chair

Environment: company lobby with long queue of applicants behind

Visual Irony: the queue is for people without relatives

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E03` · เพื่อนชวนลงทุน 30% (B)
```text
# SCENE DESCRIPTION

Scene: A friend pitching an investment that is too good

Main Characters: friend in a shiny suit with slicked hair, wide-eyed listener; exaggerated but realistic and relatable expressions

Character Look: hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head); office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: pointing at a chart arrow shooting through the ceiling

Environment: coffee shop table with a laptop

Visual Irony: the only person getting rich is the presenter

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E04` · ประกันที่ไม่มีใครอยากซื้อ (B)
```text
# SCENE DESCRIPTION

Scene: An insurance agent calls during dinner

Main Characters: family eating dinner, agent popping out of the phone screen; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: the agent offering an umbrella while it is sunny

Environment: small home dining table

Visual Irony: you pay for protection you hope never to use

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E05` · ไปเลือกตั้ง (A)
```text
# SCENE DESCRIPTION

Scene: Election day chaos in a fictional land

Main Characters: voter holding a blank ballot between two candidates: a tired worker in overalls and a rich man in silk with a lunch box; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head); both rivals hold a stacked tiffin carrier (pin-to) as the election handout; candidate posters show faces only

Main Action: both candidates pulling the voter's arms

Environment: polling station with endless campaign posters covering a lamp post (blank posters, no text)

Visual Irony: one vote, two very different lunch offers

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E06` · น้ำท่วมใหญ่ (A)
```text
# SCENE DESCRIPTION

Scene: Big flood and donation dilemma

Main Characters: flood victims on a roof, a glamorous influencer filming a selfie with a donation box; exaggerated but realistic and relatable expressions

Character Look: influencer look (trendy outfit, phone on a selfie stick with a blank screen); working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: the influencer smiling at the camera while the boat stays tied up

Environment: flooded neighborhood

Visual Irony: the donation reached the camera before it reached the people

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E07` · เงินทอนประมูลงาน (A)
```text
# SCENE DESCRIPTION

Scene: Public project bidding with a hidden fee

Main Characters: contractor and middleman whispering, an official pretending not to look; exaggerated but realistic and relatable expressions

Character Look: hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head); generic government officer look (plain khaki uniform without insignia)

Main Action: sliding a thick envelope under a blueprint of a road

Environment: government meeting room with blank documents

Visual Irony: the road budget gets thinner before the road is built

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E08` · ค่าดำเนินการเปิดร้าน (B)
```text
# SCENE DESCRIPTION

Scene: Paperwork that needs one more thing

Main Characters: shop owner with a mountain of documents, bored official; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); generic government officer look (plain khaki uniform without insignia); plain envelope prop

Main Action: official tapping an empty envelope while stamps sit unused

Environment: government service counter with ceiling fans

Visual Irony: all documents complete except the invisible one

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E09` · นโยบายแจกเงิน (B)
```text
# SCENE DESCRIPTION

Scene: Handout money and rising prices

Main Characters: crowd holding phones at a crashed app screen (blank), smiling politician figure throwing tiny coins; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head); tiny coins vs giant price balloon

Main Action: small coins fall while a giant price tag balloon rises behind

Environment: street market

Visual Irony: the handout is small, the prices are forever

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E10` · ญาติขอให้ค้ำประกัน (B)
```text
# SCENE DESCRIPTION

Scene: A relative asks you to co-sign a loan

Main Characters: sweet relative with a gift basket, hesitant player holding a pen; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: the gift basket secretly contains a heavy chain

Environment: family living room with relatives watching

Visual Irony: family blood is thick, debt is thicker

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E11` · ลูกต้องเรียนพิเศษ (B)
```text
# SCENE DESCRIPTION

Scene: Free school, paid tutoring

Main Characters: child with a huge backpack, parent counting money; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: the same teacher appears at school and at the evening tutoring desk

Environment: school gate at sunset

Visual Irony: education is free until the afternoon

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E12` · ไม่พอใจรัฐ (A)
```text
# SCENE DESCRIPTION

Scene: Angry citizen about to post online

Main Characters: person typing furiously on a phone, sweat, family members gesturing to stop; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: finger hovering over the post button (blank screen)

Environment: small living room with a TV showing a blank news screen

Visual Irony: freedom of speech comes with a delivery receipt

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E13` · ซื้อเก้าอี้เกรดกราบเรียน (A)
```text
# SCENE DESCRIPTION

Scene: Buying a promotion

Main Characters: employee kneeling with a money bag in front of a gilded office chair, boss presenting it like a car salesman; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head); plain envelope and money bag props

Main Action: price tag shaped object hanging on the chair (no text)

Environment: executive office

Visual Irony: merit is promoted, money gets the seat

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E14` · เมกะโปรเจกต์หน้าบ้าน (B)
```text
# SCENE DESCRIPTION

Scene: A mega train project blocks a house

Main Characters: family wearing masks in front of their house, giant construction pillars; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: dust clouds covering a calendar with many torn pages

Environment: street under endless construction

Visual Irony: the future is coming, every year

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E15` · โรงพยาบาลรัฐ vs เอกชน (B)
```text
# SCENE DESCRIPTION

Scene: Choosing between a long queue and a long bill

Main Characters: patient holding stomach at a fork: left a queue reaching the horizon, right a receipt rolling out like a carpet; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: patient frozen between two choices

Environment: hospital entrance

Visual Irony: pay with time or pay with money

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E16` · ลูกผู้มีอิทธิพลในผับ (A)
```text
# SCENE DESCRIPTION

Scene: Trouble with a powerful family's son at a bar

Main Characters: arrogant young man with bodyguards and champagne, ordinary guest raising hands; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: bodyguards pointing while a waiter hides behind the counter

Environment: nightclub with neon lights (no signs)

Visual Irony: the law is equal, the surnames are not

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E17` · บำนาญที่ไม่พอใช้ (B)
```text
# SCENE DESCRIPTION

Scene: Retirement money that runs out early

Main Characters: elderly worker still wearing a uniform; exaggerated but realistic and relatable expressions

Character Look: elderly citizen look (cotton shirt, reading glasses, cloth bag)

Main Action: balancing a tiny pension coin on a long stack of bills

Environment: night market stall

Visual Irony: retired from work, not from expenses

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E18` · แอปรัฐรุ่นใหม่ (B)
```text
# SCENE DESCRIPTION

Scene: Digital government vs analog citizens

Main Characters: elderly woman holding a phone at arm's length, face scan frame around her; exaggerated but realistic and relatable expressions

Character Look: elderly citizen look (cotton shirt, reading glasses, cloth bag); generic government officer look (plain khaki uniform without insignia)

Main Action: taking the same selfie many times

Environment: government office with a sign pointing to use the app (blank)

Visual Irony: digital government, analog people

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E19` · มรดกที่ดิน (B)
```text
# SCENE DESCRIPTION

Scene: Relatives appear for the inheritance

Main Characters: many relatives with shovels and rulers around a small plot of land; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: measuring the land with tape while glaring at each other

Environment: rural land with one tree

Visual Irony: family reunion sponsored by land titles

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-E20` · ส่งต่อความรู้ (B)
```text
# SCENE DESCRIPTION

Scene: Grandparent and grandchild

Main Characters: grandchild asking a question, grandparent with an awkward smile; exaggerated but realistic and relatable expressions

Character Look: elderly citizen look (cotton shirt, reading glasses, cloth bag)

Main Action: grandparent covering the window that shows a chaotic city

Environment: quiet home veranda

Visual Irony: the same answer passed down every generation

Palette Accent: cobalt blue, orange, paper cream

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X01` · แชร์ล่ม (B)
```text
# SCENE DESCRIPTION

Scene: The investment friend disappears

Main Characters: crowd of victims holding phones (blank screens), empty chair with a suit jacket; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: staring at the empty chair

Environment: empty rented office

Visual Irony: the only one who got rich left early

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X02` · ชนะแต่ถูกตัดสิทธิ์ (A)
```text
# SCENE DESCRIPTION

Scene: The winner disqualified by paperwork

Main Characters: worker-party candidate holding a trophy, a single sheet of paper (blank) knocking it away; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); posters with faces only, one blank sheet of paper as the disqualification

Main Action: the trophy flying off while voters watch with open mouths

Environment: stage with confetti still falling

Visual Irony: you won the vote, but lost to one sheet of paper

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X03` · เครือข่ายชนะ (B)
```text
# SCENE DESCRIPTION

Scene: Networks winning the election

Main Characters: rich candidate standing on a pyramid of handshakes; exaggerated but realistic and relatable expressions

Character Look: hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: shaking hands with many hands from below

Environment: campaign stage

Visual Irony: the network is stronger than the vote

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X03b` · รัฐบาลเอื้อพวกพ้อง (A)
```text
# SCENE DESCRIPTION

Scene: Government favors friends

Main Characters: rich officials sharing a big cake at a long table, workers outside the window; exaggerated but realistic and relatable expressions

Character Look: hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head); working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: workers pressing faces on the glass holding empty lunch boxes

Environment: banquet hall

Visual Irony: public budget, private party

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X04` · ทวงบุญคุณ (B)
```text
# SCENE DESCRIPTION

Scene: The favor needs to be repaid

Main Characters: relative with a long scroll of favors (blank), tired employee; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: the scroll unrolling down the stairs

Environment: office stairwell

Visual Irony: the favor comes with interest

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X05` · Influencer ยักยอกเงินบริจาค (A)
```text
# SCENE DESCRIPTION

Scene: The donation became a luxury car

Main Characters: influencer crying fake tears in front of a shiny new car, donors watching phones (blank); exaggerated but realistic and relatable expressions

Character Look: influencer look (trendy outfit, phone on a selfie stick with a blank screen); working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: holding a tissue while car keys sparkle

Environment: flooded street in the background

Visual Irony: the flood went down, the follower count went up

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X06` · โดนสอบเงินทอน (B)
```text
# SCENE DESCRIPTION

Scene: The payer gets investigated

Main Characters: small contractor tied to a goat, officials who took money relaxing in the background; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); generic government officer look (plain khaki uniform without insignia); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: investigators pointing at the goat

Environment: courtyard of an office building

Visual Irony: the scapegoat is always on duty

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X07` · ญาติหนีหนี้ (B)
```text
# SCENE DESCRIPTION

Scene: Creditors camp at your door

Main Characters: debt collectors sitting on the doorstep with snacks, homeowner peeking out; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: relative waving from a far away bus

Environment: row house street

Visual Irony: the relative left, the debt moved in

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X08` · โดนฟ้องจากโพสต์ (A)
```text
# SCENE DESCRIPTION

Scene: A lawsuit arrives because of a post

Main Characters: citizen holding a huge legal envelope (blank) in one hand and a phone in the other, shrinking in size; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); towering stack of blank paperwork / blank legal envelope

Main Action: a giant gavel shadow over the phone

Environment: small apartment

Visual Irony: you were free to speak, and they were free to sue

Palette Accent: purple, cobalt blue, warm grey

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X09` · ถูกหวย (B)
```text
# SCENE DESCRIPTION

Scene: Winning the lottery

Main Characters: ecstatic person hugging a banana tree, neighbors arriving with plates; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: neighbors forming a long queue for treats

Environment: rural backyard

Visual Irony: the retirement plan of the nation worked once

Palette Accent: leaf green, sunflower yellow, sky blue

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X10` · รถไฟฟ้าเสร็จ (B)
```text
# SCENE DESCRIPTION

Scene: The new train finally opens

Main Characters: commuters with grey hair celebrating, a calendar showing many years torn off; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); elderly citizen look (cotton shirt, reading glasses, cloth bag)

Main Action: cutting a ribbon at a shiny station

Environment: new train station

Visual Irony: faster by fifteen minutes, after seven years

Palette Accent: leaf green, sunflower yellow, sky blue

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-X11` · ผู้มีอิทธิพลเอาคืน (B)
```text
# SCENE DESCRIPTION

Scene: The influential family takes revenge

Main Characters: shop owner sweeping in front of a shop blocked by a big black car; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); hi-so look (purple floral silk shirt, thick gold necklace, sunglasses on head)

Main Action: the car's tinted window slightly open with sunglasses watching

Environment: small shophouse

Visual Irony: nobody saw anything, everybody knows

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, clear subject and readable action, keep focus on the main characters

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I01` · เจอด่าน (A)
```text
# SCENE DESCRIPTION

Scene: Checkpoint that eats half the night

Main Characters: tired driver in a small car, a generic officer in a plain khaki uniform without any insignia waving a flashlight; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); generic government officer look (plain khaki uniform without insignia)

Main Action: the driver rests their chin on the steering wheel while the officer slowly inspects a blank document; a wall clock on a roadside pole shows the hands spinning past midnight (no numbers on the clock face)

Environment: night road lined with traffic cones and a long queue of cars with tail lights glowing

Visual Irony: the checkpoint inspects every tiny thing, while an obviously overloaded truck drives past behind them unchecked

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I02` · คนเมาขับชนแล้วหนี (A)
```text
# SCENE DESCRIPTION

Scene: Hit and run, nobody to blame

Main Characters: the player sitting on the curb next to a bent bicycle with a bandaged arm, a car speeding away in a cartoon dust cloud; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: the player looks up at a street CCTV camera that is hanging loose by its wire, lens cracked, while a medical bill (blank paper) flutters down into their lap

Environment: street corner at night under one flickering streetlight

Visual Irony: the one camera that should have seen everything is broken, as always

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I03` · ซื้อของออนไลน์โดนโกง (A)
```text
# SCENE DESCRIPTION

Scene: Online shopping scam

Main Characters: the player kneeling at their doorstep, opening a parcel box that contains a red brick instead of a phone; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: the player holds up the brick in disbelief; above it five glowing golden stars float proudly like a review rating (stars only, no text)

Environment: condo corridor doorstep with torn tape and bubble wrap scattered

Visual Irony: five-star review, zero-star product

Palette Accent: earth brown, warm grey, mustard yellow

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I04` · งบถนนหายระหว่างทาง (A)
```text
# SCENE DESCRIPTION

Scene: Road budget vanished on the way

Main Characters: the player standing beside their scooter with a flat tire stuck in a deep pothole; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: a freshly paved shiny strip of road ends abruptly one meter in, and the old giant pothole returns right after it; a broken traffic cone floats in the puddle

Environment: suburban road after rain, puddles reflecting the sky

Visual Irony: new road every year, same hole every year

Palette Accent: earth brown, warm grey, red

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I05` · ม็อบปิดถนน (A)
```text
# SCENE DESCRIPTION

Scene: Every road closed for the whole day

Main Characters: the player in a car stuck in gridlock that stretches to the horizon, commuters napping in neighboring cars; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: the player gives up and reclines the car seat, eating instant noodles from a cup, while a delivery rider climbs over car roofs; the cause of the jam is not visible at all, only endless cars

Environment: wide city avenue with a sea of stopped cars under a hazy sunset; no protesters, no crowds, no flags, no banners, no colored ribbons

Visual Irony: you cannot go anywhere, so you finally get to rest

Palette Accent: earth brown, warm grey, sky blue

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I06` · ฝุ่น PM2.5 ทะลุมาตรฐาน (A)
```text
# SCENE DESCRIPTION

Scene: Orange sky smog day

Main Characters: the player walking to work in a thick face mask, buildings fading into orange haze; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); elderly citizen look (cotton shirt, reading glasses, cloth bag)

Main Action: the player stops beside a small child who is drawing a bright blue sky with crayons on blank paper, while the real sky behind them is orange-brown

Environment: school fence and sidewalk in heavy smog, sun reduced to a pale disc

Visual Irony: children only know blue skies from crayons

Palette Accent: burnt orange, warm grey, sky blue

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I07` · งานบวชญาติ (A)
```text
# SCENE DESCRIPTION

Scene: Three relatives celebrating at once

Main Characters: the player at a festive countryside celebration tent, holding three plain blank envelopes fanned out like playing cards; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf); plain blank envelopes

Main Action: the player peeks into a nearly empty wallet while a long, cheerful buffet line and a stack of folding chairs stretch behind them

Environment: front-yard party tent in a village with string lights, round tables and a loudspeaker; no monks, no temple, no religious objects or rituals shown

Visual Irony: joining the celebration is free, the envelopes are not

Palette Accent: mustard yellow, warm grey, red

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I08` · งานแต่งเพื่อนร่วมงาน (A)
```text
# SCENE DESCRIPTION

Scene: Five-star hotel wedding invitation

Main Characters: the player in formal clothes at a fancy hotel ballroom entrance, counting coins into a plain blank envelope; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); plain blank envelope

Main Action: the player glances at a towering dessert display while the envelope in hand is clearly thicker than the tiny plate of food

Environment: glittering hotel ballroom with chandeliers and floral arches

Visual Irony: the envelope costs more than the meal

Palette Accent: mustard yellow, warm grey, red

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I09` · งานศพคนในซอย (A)
```text
# SCENE DESCRIPTION

Scene: Seven nights in a row at the neighborhood hall

Main Characters: the player in black clothes sitting in a row of plastic chairs among neighbors, visibly sleepy; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); elderly citizen look (cotton shirt, reading glasses, cloth bag); plain blank envelopes

Main Action: the player quietly checks a thin wallet while a calendar-like row of seven identical small envelopes is lined up on their lap

Environment: community hall at night with fluorescent lights, rows of chairs and simple white flower decorations; no monks, no religious rituals or objects shown, respectful mood

Visual Irony: the social tax is collected at every life event, every night

Palette Accent: warm grey, dark navy, mustard yellow

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I10` · ไฟดับทั้งเขตตอนส่งงาน (A)
```text
# SCENE DESCRIPTION

Scene: Blackout five minutes before the deadline

Main Characters: the player lit only by a phone flashlight, laptop screen black; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: the player stares at a big shiny backup generator in the corner whose power cable lies unplugged on the floor

Environment: small home office in total darkness, whole neighborhood dark through the window

Visual Irony: the backup exists, the cable does not

Palette Accent: dark navy, warm grey, mustard yellow

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I11` · แก๊งคอลเซ็นเตอร์โทรมา (A)
```text
# SCENE DESCRIPTION

Scene: Scam call claiming an illegal parcel

Main Characters: the player holding a phone in panic at home; on the other half of the frame a scammer in a cramped cubicle wearing an obviously fake costume uniform; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes); generic fake uniform costume with no real insignia

Main Action: a cartoon phone cord stretches across the split frame from the scam cubicle into the player's ear, the phone screen blank

Environment: split scene: cluttered scam office with rows of headsets on the left, small home living room on the right

Visual Irony: the call is fake, the panic is real

Palette Accent: warm grey, red, sky blue

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

## `K-I12` · ค่าไฟขึ้นแบบงงๆ (A)
```text
# SCENE DESCRIPTION

Scene: Electricity bill shock

Main Characters: the player and family around a small table, unrolling a blank electricity bill that is longer than the table; exaggerated but realistic and relatable expressions

Character Look: working-class citizen look (faded denim overalls, red-and-white checked pha khao ma scarf)

Main Action: the blank bill starts smoking and glowing hot in their hands while a single tiny electric fan spins weakly

Environment: small home with one fan and one light bulb, same as always

Visual Irony: same usage, hotter bill

Palette Accent: burnt orange, warm grey, red

Composition: Medium-wide, the player is the main character and the one hit by bad luck, clear subject and readable action

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every paper, bill, envelope, parcel and screen is blank.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

---

## Quality Checklist v3.0 (ตรวจทุกภาพก่อนส่ง)
- [ ] Same visual identity — ดูเป็นฝีมือนักเขียนการ์ตูนคนเดียวกัน
- [ ] Expressive Thai characters — อารมณ์และท่าทางอ่านออกทันที ยังดูเป็นคนจริง
- [ ] Clear Thai context — ฉากดูเป็นไทยชัดเจน
- [ ] Two-layer satire — ขำตอนเห็น แล้วได้คิดต่อ
- [ ] Traditional watercolor look — สีน้ำ/กวอช ระบายเรียบ ไม่มีจุดหมึกเยอะ
- [ ] No text in the image — ไม่มีตัวหนังสือ ตัวเลข โลโก้ ลายน้ำ
- [ ] Safety — หน้าไม่คล้ายคนจริง ไม่มีสีหรือตราของพรรค/หน่วยงานจริง
