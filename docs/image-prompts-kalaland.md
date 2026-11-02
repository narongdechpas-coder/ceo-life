# KALALAND — Image Prompts (โหมดกะลาแลนด์)

ทุก prompt ใช้ template ของ **KALALAND Image Style Lock v2.0** (`docs/kalaland-style-lock.md`) วาง Style Lock เต็มไว้ก่อน แล้วต่อด้วยบล็อก Scene ของแต่ละภาพ

**สเปกไฟล์:** 16:9 ส่งมาขนาดไหนก็ได้ ผมแปลงเป็น 1600×900 WebP เอง · วางที่ `assets/art/kala/<ไฟล์>.webp` · ห้ามมีตัวหนังสือ ป้าย ตัวเลข หรือโลโก้ในภาพ · ของสำคัญอยู่ช่วงกลาง 60% ของความสูง

**ข้อควรระวัง:** ตัวละครทุกตัวเป็นคนสมมติ ห้ามหน้าคล้ายนักการเมืองหรือคนดังจริง ห้ามสี โลโก้ หรือสัญลักษณ์ของพรรคหรือหน่วยงานจริง เครื่องแบบเจ้าหน้าที่ให้เป็นแบบกลางๆ ไม่มีตรา

**ลำดับ:** ทำกลุ่ม **A** (17 ภาพ) ก่อน แค่นี้เกมก็มีภาพครบทุกยุค และครอบคลุมเคราะห์กับ Echo แบบใช้ร่วม ส่วนกลุ่ม **B** ทยอยเติมทีหลัง การ์ดที่ยังไม่มีภาพเฉพาะจะใช้ภาพร่วมแทน

| ไฟล์ | กลุ่ม | การ์ด |
|---|---|---|
| `kala-era-1` | A | ยุค I · เริ่มต้น |
| `kala-era-2` | A | ยุค II · สร้างตัว |
| `kala-era-3` | A | ยุค III · จุดสูงสุด |
| `kala-era-4` | A | ยุค IV · ส่งต่อ |
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
| `K-I01` | B | เจอด่าน |
| `K-I02` | B | เมาขับชนแล้วหนี |
| `K-I03` | B | ซื้อของออนไลน์โดนโกง |
| `K-I04` | B | งบถนนหาย |
| `K-I05` | B | ม็อบปิดถนน |
| `K-I06` | B | ฝุ่น PM2.5 |
| `K-I07` | B | งานบวช |
| `K-I08` | B | งานแต่ง |
| `K-I09` | B | งานศพในซอย |
| `K-I10` | B | ไฟดับตอนส่งงาน |
| `K-I11` | B | แก๊งคอลเซ็นเตอร์ |
| `K-I12` | B | ค่าไฟขึ้น |

---

## `kala-era-1` · ยุค I · เริ่มต้น (A)
```text
# SCENE DESCRIPTION

Scene: A fresh graduate starting first job in a chaotic city

Main Characters: young graduate in a new office shirt, hopeful wide eyes, tiny wallet

Main Action: walking proudly toward a giant office tower while bills fly out of the wallet like birds

Environment: crowded Bangkok-like street at morning rush, motorcycles on the sidewalk

Visual Irony: the dream career looks huge, the salary is tiny

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `kala-era-2` · ยุค II · สร้างตัว (A)
```text
# SCENE DESCRIPTION

Scene: A family trying to build a house brick by brick

Main Characters: tired couple with a toddler, sweating but smiling

Main Action: stacking bricks while a loan officer keeps adding more debt bricks on their backs

Environment: small suburban housing estate under construction

Visual Irony: every brick of the dream comes with an interest rate

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `kala-era-3` · ยุค III · จุดสูงสุด (A)
```text
# SCENE DESCRIPTION

Scene: A middle-aged manager at the top of a very small hill

Main Characters: proud manager in a tie, exhausted posture, phone buzzing

Main Action: planting a flag on top of a tiny pile of paperwork while bigger towers of connected people tower behind

Environment: office rooftop with skyscrapers behind

Visual Irony: the peak of your career is the starting point of someone with the right surname

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `kala-era-4` · ยุค IV · ส่งต่อ (A)
```text
# SCENE DESCRIPTION

Scene: An elderly person counting retirement money

Main Characters: grandparent with reading glasses, grandchild watching

Main Action: counting coins that only cover one day of a calendar

Environment: simple wooden house with a calendar and a medicine box

Visual Irony: a lifetime of work, a pension that lasts until Tuesday

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `kala-incident` · การ์ดเคราะห์ (ใช้ร่วม) (A)
```text
# SCENE DESCRIPTION

Scene: Bad luck raining on an ordinary person

Main Characters: ordinary commuter holding an umbrella, resigned face

Main Action: umbrella blocks rain but potholes, bills, fines and smog fall from the sky instead

Environment: busy street corner with traffic and a broken sidewalk

Visual Irony: you can prepare for rain, not for living here

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `kala-echo-bad` · Echo ผลร้าย (ใช้ร่วม) (A)
```text
# SCENE DESCRIPTION

Scene: The past comes back to collect

Main Characters: worried office worker, a ghostly version of their younger self smiling innocently behind

Main Action: the younger self hands over an overdue bill

Environment: dim apartment hallway

Visual Irony: past decisions always send the invoice later

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `kala-echo-good` · Echo ผลดี (ใช้ร่วม) (A)
```text
# SCENE DESCRIPTION

Scene: Rare good luck in Kalaland

Main Characters: surprised person, neighbors peeking enviously

Main Action: catching a single golden leaf falling from a tree full of dry leaves

Environment: small neighborhood alley

Visual Irony: good luck is real, just extremely rare

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E01` · เงินเดือนแรก (B)
```text
# SCENE DESCRIPTION

Scene: First salary disappears instantly

Main Characters: young worker opening a payslip, shocked face

Main Action: money leaving the envelope toward a queue of landlord, bus, food vendor, phone company

Environment: tiny rental room door

Visual Irony: payday and debt day are the same day

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E02` · คนรู้จักฝากเข้างาน (B)
```text
# SCENE DESCRIPTION

Scene: A relative offers a shortcut into a famous company

Main Characters: smiling relative holding a teacup with an envelope underneath, nervous job seeker

Main Action: handing over a tea set with money tucked inside to a man in a big chair

Environment: company lobby with long queue of applicants behind

Visual Irony: the queue is for people without relatives

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E03` · เพื่อนชวนลงทุน 30% (B)
```text
# SCENE DESCRIPTION

Scene: A friend pitching an investment that is too good

Main Characters: friend in a shiny suit with slicked hair, wide-eyed listener

Main Action: pointing at a chart arrow shooting through the ceiling

Environment: coffee shop table with a laptop

Visual Irony: the only person getting rich is the presenter

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E04` · ประกันที่ไม่มีใครอยากซื้อ (B)
```text
# SCENE DESCRIPTION

Scene: An insurance agent calls during dinner

Main Characters: family eating dinner, agent popping out of the phone screen

Main Action: the agent offering an umbrella while it is sunny

Environment: small home dining table

Visual Irony: you pay for protection you hope never to use

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E05` · ไปเลือกตั้ง (A)
```text
# SCENE DESCRIPTION

Scene: Election day chaos in a fictional land

Main Characters: voter holding a blank ballot between two candidates: a tired worker in overalls and a rich man in silk with a lunch box

Main Action: both candidates pulling the voter's arms

Environment: polling station with endless campaign posters covering a lamp post (blank posters, no text)

Visual Irony: one vote, two very different lunch offers

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E06` · น้ำท่วมใหญ่ (A)
```text
# SCENE DESCRIPTION

Scene: Big flood and donation dilemma

Main Characters: flood victims on a roof, a glamorous influencer filming a selfie with a donation box

Main Action: the influencer smiling at the camera while the boat stays tied up

Environment: flooded neighborhood

Visual Irony: the donation reached the camera before it reached the people

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E07` · เงินทอนประมูลงาน (A)
```text
# SCENE DESCRIPTION

Scene: Public project bidding with a hidden fee

Main Characters: contractor and middleman whispering, an official pretending not to look

Main Action: sliding a thick envelope under a blueprint of a road

Environment: government meeting room with blank documents

Visual Irony: the road budget gets thinner before the road is built

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E08` · ค่าดำเนินการเปิดร้าน (B)
```text
# SCENE DESCRIPTION

Scene: Paperwork that needs one more thing

Main Characters: shop owner with a mountain of documents, bored official

Main Action: official tapping an empty envelope while stamps sit unused

Environment: government service counter with ceiling fans

Visual Irony: all documents complete except the invisible one

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E09` · นโยบายแจกเงิน (B)
```text
# SCENE DESCRIPTION

Scene: Handout money and rising prices

Main Characters: crowd holding phones at a crashed app screen (blank), smiling politician figure throwing tiny coins

Main Action: small coins fall while a giant price tag balloon rises behind

Environment: street market

Visual Irony: the handout is small, the prices are forever

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E10` · ญาติขอให้ค้ำประกัน (B)
```text
# SCENE DESCRIPTION

Scene: A relative asks you to co-sign a loan

Main Characters: sweet relative with a gift basket, hesitant player holding a pen

Main Action: the gift basket secretly contains a heavy chain

Environment: family living room with relatives watching

Visual Irony: family blood is thick, debt is thicker

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E11` · ลูกต้องเรียนพิเศษ (B)
```text
# SCENE DESCRIPTION

Scene: Free school, paid tutoring

Main Characters: child with a huge backpack, parent counting money

Main Action: the same teacher appears at school and at the evening tutoring desk

Environment: school gate at sunset

Visual Irony: education is free until the afternoon

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E12` · ไม่พอใจรัฐ (A)
```text
# SCENE DESCRIPTION

Scene: Angry citizen about to post online

Main Characters: person typing furiously on a phone, sweat, family members gesturing to stop

Main Action: finger hovering over the post button (blank screen)

Environment: small living room with a TV showing a blank news screen

Visual Irony: freedom of speech comes with a delivery receipt

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E13` · ซื้อเก้าอี้เกรดกราบเรียน (A)
```text
# SCENE DESCRIPTION

Scene: Buying a promotion

Main Characters: employee kneeling with a money bag in front of a gilded office chair, boss presenting it like a car salesman

Main Action: price tag shaped object hanging on the chair (no text)

Environment: executive office

Visual Irony: merit is promoted, money gets the seat

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E14` · เมกะโปรเจกต์หน้าบ้าน (B)
```text
# SCENE DESCRIPTION

Scene: A mega train project blocks a house

Main Characters: family wearing masks in front of their house, giant construction pillars

Main Action: dust clouds covering a calendar with many torn pages

Environment: street under endless construction

Visual Irony: the future is coming, every year

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E15` · โรงพยาบาลรัฐ vs เอกชน (B)
```text
# SCENE DESCRIPTION

Scene: Choosing between a long queue and a long bill

Main Characters: patient holding stomach at a fork: left a queue reaching the horizon, right a receipt rolling out like a carpet

Main Action: patient frozen between two choices

Environment: hospital entrance

Visual Irony: pay with time or pay with money

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E16` · ลูกผู้มีอิทธิพลในผับ (A)
```text
# SCENE DESCRIPTION

Scene: Trouble with a powerful family's son at a bar

Main Characters: arrogant young man with bodyguards and champagne, ordinary guest raising hands

Main Action: bodyguards pointing while a waiter hides behind the counter

Environment: nightclub with neon lights (no signs)

Visual Irony: the law is equal, the surnames are not

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E17` · บำนาญที่ไม่พอใช้ (B)
```text
# SCENE DESCRIPTION

Scene: Retirement money that runs out early

Main Characters: elderly worker still wearing a uniform

Main Action: balancing a tiny pension coin on a long stack of bills

Environment: night market stall

Visual Irony: retired from work, not from expenses

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E18` · แอปรัฐรุ่นใหม่ (B)
```text
# SCENE DESCRIPTION

Scene: Digital government vs analog citizens

Main Characters: elderly woman holding a phone at arm's length, face scan frame around her

Main Action: taking the same selfie many times

Environment: government office with a sign pointing to use the app (blank)

Visual Irony: digital government, analog people

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E19` · มรดกที่ดิน (B)
```text
# SCENE DESCRIPTION

Scene: Relatives appear for the inheritance

Main Characters: many relatives with shovels and rulers around a small plot of land

Main Action: measuring the land with tape while glaring at each other

Environment: rural land with one tree

Visual Irony: family reunion sponsored by land titles

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-E20` · ส่งต่อความรู้ (B)
```text
# SCENE DESCRIPTION

Scene: Grandparent and grandchild

Main Characters: grandchild asking a question, grandparent with an awkward smile

Main Action: grandparent covering the window that shows a chaotic city

Environment: quiet home veranda

Visual Irony: the same answer passed down every generation

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X01` · แชร์ล่ม (B)
```text
# SCENE DESCRIPTION

Scene: The investment friend disappears

Main Characters: crowd of victims holding phones (blank screens), empty chair with a suit jacket

Main Action: staring at the empty chair

Environment: empty rented office

Visual Irony: the only one who got rich left early

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X02` · ชนะแต่ถูกตัดสิทธิ์ (A)
```text
# SCENE DESCRIPTION

Scene: The winner disqualified by paperwork

Main Characters: worker-party candidate holding a trophy, a single sheet of paper (blank) knocking it away

Main Action: the trophy flying off while voters watch with open mouths

Environment: stage with confetti still falling

Visual Irony: you won the vote, but lost to one sheet of paper

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X03` · เครือข่ายชนะ (B)
```text
# SCENE DESCRIPTION

Scene: Networks winning the election

Main Characters: rich candidate standing on a pyramid of handshakes

Main Action: shaking hands with many hands from below

Environment: campaign stage

Visual Irony: the network is stronger than the vote

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X03b` · รัฐบาลเอื้อพวกพ้อง (A)
```text
# SCENE DESCRIPTION

Scene: Government favors friends

Main Characters: rich officials sharing a big cake at a long table, workers outside the window

Main Action: workers pressing faces on the glass holding empty lunch boxes

Environment: banquet hall

Visual Irony: public budget, private party

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X04` · ทวงบุญคุณ (B)
```text
# SCENE DESCRIPTION

Scene: The favor needs to be repaid

Main Characters: relative with a long scroll of favors (blank), tired employee

Main Action: the scroll unrolling down the stairs

Environment: office stairwell

Visual Irony: the favor comes with interest

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X05` · Influencer ยักยอกเงินบริจาค (A)
```text
# SCENE DESCRIPTION

Scene: The donation became a luxury car

Main Characters: influencer crying fake tears in front of a shiny new car, donors watching phones (blank)

Main Action: holding a tissue while car keys sparkle

Environment: flooded street in the background

Visual Irony: the flood went down, the follower count went up

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X06` · โดนสอบเงินทอน (B)
```text
# SCENE DESCRIPTION

Scene: The payer gets investigated

Main Characters: small contractor tied to a goat, officials who took money relaxing in the background

Main Action: investigators pointing at the goat

Environment: courtyard of an office building

Visual Irony: the scapegoat is always on duty

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X07` · ญาติหนีหนี้ (B)
```text
# SCENE DESCRIPTION

Scene: Creditors camp at your door

Main Characters: debt collectors sitting on the doorstep with snacks, homeowner peeking out

Main Action: relative waving from a far away bus

Environment: row house street

Visual Irony: the relative left, the debt moved in

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X08` · โดนฟ้องจากโพสต์ (A)
```text
# SCENE DESCRIPTION

Scene: A lawsuit arrives because of a post

Main Characters: citizen holding a huge legal envelope (blank) in one hand and a phone in the other, shrinking in size

Main Action: a giant gavel shadow over the phone

Environment: small apartment

Visual Irony: you were free to speak, and they were free to sue

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X09` · ถูกหวย (B)
```text
# SCENE DESCRIPTION

Scene: Winning the lottery

Main Characters: ecstatic person hugging a banana tree, neighbors arriving with plates

Main Action: neighbors forming a long queue for treats

Environment: rural backyard

Visual Irony: the retirement plan of the nation worked once

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X10` · รถไฟฟ้าเสร็จ (B)
```text
# SCENE DESCRIPTION

Scene: The new train finally opens

Main Characters: commuters with grey hair celebrating, a calendar showing many years torn off

Main Action: cutting a ribbon at a shiny station

Environment: new train station

Visual Irony: faster by fifteen minutes, after seven years

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-X11` · ผู้มีอิทธิพลเอาคืน (B)
```text
# SCENE DESCRIPTION

Scene: The influential family takes revenge

Main Characters: shop owner sweeping in front of a shop blocked by a big black car

Main Action: the car's tinted window slightly open with sunglasses watching

Environment: small shophouse

Visual Irony: nobody saw anything, everybody knows

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I01` · เจอด่าน (B)
```text
# SCENE DESCRIPTION

Scene: A checkpoint on the way

Main Characters: driver holding documents, officer figure with a flashlight (generic, no insignia)

Main Action: flashlight pointing at an empty wallet

Environment: night road with traffic cones

Visual Irony: the checkpoint checks everything except what matters

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I02` · เมาขับชนแล้วหนี (B)
```text
# SCENE DESCRIPTION

Scene: Hit and run

Main Characters: injured cyclist on the road, a car speeding away leaving a cloud

Main Action: onlookers filming with phones (blank screens)

Environment: street corner at night with a broken CCTV camera

Visual Irony: the camera was broken, as always

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I03` · ซื้อของออนไลน์โดนโกง (B)
```text
# SCENE DESCRIPTION

Scene: Online shopping scam

Main Characters: customer opening a box containing a brick

Main Action: five shining stars floating above the brick

Environment: home doorstep

Visual Irony: five-star review, zero-star product

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I04` · งบถนนหาย (B)
```text
# SCENE DESCRIPTION

Scene: Pothole road

Main Characters: driver with a broken wheel, road full of potholes shaped like coins

Main Action: a new paved road ending abruptly after one meter

Environment: suburban road

Visual Irony: new road every year, same hole every year

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I05` · ม็อบปิดถนน (B)
```text
# SCENE DESCRIPTION

Scene: Traffic stopped for hours

Main Characters: commuters sleeping in their cars

Main Action: a delivery rider climbing over cars

Environment: city intersection gridlock

Visual Irony: you can't go anywhere, so you finally rest

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I06` · ฝุ่น PM2.5 (B)
```text
# SCENE DESCRIPTION

Scene: Smog city

Main Characters: people wearing masks, buildings fading into orange haze

Main Action: a child drawing a blue sky with crayons

Environment: school playground

Visual Irony: breathing is the new extreme sport

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I07` · งานบวช (B)
```text
# SCENE DESCRIPTION

Scene: Ordination party envelope

Main Characters: guest holding an envelope, a long buffet line

Main Action: envelope thinner than the plate

Environment: village temple fair grounds (no religious mockery, festive setting only)

Visual Irony: merit is priceless, the envelope is not

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I08` · งานแต่ง (B)
```text
# SCENE DESCRIPTION

Scene: Wedding envelope

Main Characters: office worker in formal clothes counting coins at a fancy hotel entrance

Main Action: looking at the dessert tower

Environment: hotel ballroom

Visual Irony: the envelope costs more than the food

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I09` · งานศพในซอย (B)
```text
# SCENE DESCRIPTION

Scene: Neighborhood funeral

Main Characters: neighbors in black holding envelopes, sitting in rows

Main Action: checking their wallets quietly

Environment: community hall

Visual Irony: social tax, collected at every life stage

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I10` · ไฟดับตอนส่งงาน (B)
```text
# SCENE DESCRIPTION

Scene: Power outage at deadline

Main Characters: worker lit by phone light, laptop dark

Main Action: staring at a big backup generator that is not connected

Environment: small home office

Visual Irony: the backup exists, the cable doesn't

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I11` · แก๊งคอลเซ็นเตอร์ (B)
```text
# SCENE DESCRIPTION

Scene: Scam call

Main Characters: elderly man on the phone, scammer in a cubicle wearing a fake uniform

Main Action: phone cord stretching from the scam room to the house

Environment: split scene: scam office and home

Visual Irony: the call is fake, the panic is real

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```

## `K-I12` · ค่าไฟขึ้น (B)
```text
# SCENE DESCRIPTION

Scene: Electricity bill shock

Main Characters: family reading a bill that is longer than the table

Main Action: the bill catching fire by itself

Environment: small home with one fan

Visual Irony: same usage, hotter bill

Composition: Medium-wide

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v2.0.
```
