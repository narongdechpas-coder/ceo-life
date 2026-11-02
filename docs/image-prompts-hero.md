# LIFE CEO — ภาพ hero หน้าปก (2 ภาพคู่)

ปกใช้ key message เดียว "บริหารชีวิตให้เหมือนบริหารบริษัท · ทุกการตัดสินใจมีราคา" ภาพ hero จะเปลี่ยนตามโลกที่ผู้เล่นเลือก
ภาพทั้งสองต้องเป็น **คนเดิม ระเบียงเดิม มุมกล้องเดิม** ต่างกันแค่สไตล์และความจริงของเมือง พอสลับโลกแล้วผู้เล่นจะรู้สึกว่าเป็นเมืองเดียวกันคนละความจริง ไม่ใช่การเปลี่ยนรูป และเส้นแบ่งเทียบภาพบน desktop จะใช้ได้ด้วย

| ไฟล์ | โลก | Style Lock |
|---|---|---|
| `hero-base` | ชีวิตตามแผน | `docs/style-lock-base.md` (Thai Slice of Life) |
| `hero-kala` | ชีวิตในกะลาแลนด์ | `docs/kalaland-style-lock.md` (v3.0) |

---

## 1. สเปกไฟล์

| เรื่อง | ค่า |
|---|---|
| สัดส่วน | 16:9 แนวนอน |
| ขนาด | ส่งมาขนาดไหนก็ได้ ยิ่งใหญ่ยิ่งดี ผมแปลงเป็น 2400×1350 WebP เอง |
| ชื่อไฟล์ | `hero-base.jpg`, `hero-kala.jpg` อัปขึ้น branch `art-inbox` |
| ตัวหนังสือ | ห้ามมี ทั้งป้าย โลโก้ ตัวเลข และลายน้ำ |

## 2. พื้นที่ปลอดภัย (สำคัญที่สุด)

ภาพเดียวถูกครอปต่างกันตามจอ
- **มือถือ** ครอปเป็น 4:3 ตรงกลาง แล้วมีแถบเข้มไล่จากขอบล่าง
- **desktop** ใช้ภาพเกือบสี่เหลี่ยมจัตุรัสที่ครึ่งซ้ายของจอ แล้วมีแถบเข้มไล่จากขอบขวา

ตัวละคร สมุด และราวระเบียงจึงต้องอยู่ใน **สี่เหลี่ยมจัตุรัสกลางภาพ** (กลาง 56% ของความกว้าง) ส่วนนอกกรอบนั้นใส่ได้แค่เมืองกับท้องฟ้าที่โดนตัดได้

```
┌──────────┬─────────────────────────┬──────────┐
│ เมือง/ฟ้า  │  ท้องฟ้า (โดนบังได้นิดหน่อย)  │ เมือง/ฟ้า  │
│ (โดนตัดได้) │                         │ (โดนตัดได้) │
│          │   ตัวละคร + สมุด + ราวระเบียง  │          │
│          │   ← สี่เหลี่ยมจัตุรัสกลางภาพ →   │          │
│          │                         │          │
│          │   พื้นระเบียง (โดนแถบเข้มบัง)   │          │
└──────────┴─────────────────────────┴──────────┘
     22%               56%                22%
```

## 3. ขั้นตอนเจน

1. เจน **hero-base ก่อน** จนได้ภาพที่ชอบ
2. เจน **hero-kala โดยแนบ hero-base เป็นภาพอ้างอิง** แล้วใช้ prompt ข้อ 5
   - ChatGPT / Gemini: แนบภาพแล้วพิมพ์ prompt ต่อท้าย
   - Midjourney: ใส่ URL ของ hero-base ไว้หน้า prompt (image prompt) และใช้ `--cref` กับภาพเดียวกันเพื่อล็อกตัวละคร
3. ถ้าองค์ประกอบยังไม่ตรง ให้สั่งซ้ำว่า "keep the exact same composition, camera angle, character pose, railing position and skyline layout as the reference image; only change the art style and the condition of the city"

---

## 4. hero-base · ชีวิตตามแผน

วาง Scene ด้านล่าง แล้วต่อด้วย Style Lock เต็มจาก `docs/style-lock-base.md` (หรือ Reusable Short Prompt ท้ายไฟล์นั้น)

```
SCENE DESCRIPTION

A Thai young professional in their late twenties stands at the railing of a small rooftop garden on top of an old shophouse at golden hour, holding an open planner notebook with blank pages against their chest, looking out over the city with a calm, confident smile.

Character: medium shot from waist up to full body, standing in the exact center of the frame, three-quarter view facing slightly left toward the city, neat casual work clothes (light shirt with rolled sleeves, a lanyard tucked in the pocket), natural Thai features.

Environment: a tidy rooftop garden with potted plants, a small wooden bench and string lights not yet lit; behind the character an orderly city skyline with modern towers, an elevated skytrain gliding smoothly along finished tracks, tree-lined streets and a calm river reflecting the warm sky; clear soft clouds.

Mood and meaning: everything is going according to plan; the path ahead is clear and within the player's control.

Composition: wide 16:9; the character, the planner and the railing all sit inside the central square of the frame (the middle 56% of the width); the left and right edges hold only city and sky; keep the bottom 15% as simple rooftop floor and the top 15% as open sky, because both may be covered by interface gradients.

No text, no letters, no numbers, no logos, no flags, no watermark; the planner pages are blank.
```

---

## 5. hero-kala · ชีวิตในกะลาแลนด์

แนบ hero-base เป็นภาพอ้างอิง วาง Style Lock v3.0 เต็มจาก `docs/kalaland-style-lock.md` ไว้ก่อน แล้วต่อด้วยบล็อกนี้

```text
# SCENE DESCRIPTION

Reference: use the attached image for composition only. Keep the exact same camera angle, the same rooftop and railing position, the same character pose and position in the center of the frame, and the same skyline layout. Redraw everything in the Kalaland style and change only the condition of the city.

Scene: The same rooftop at the same golden hour, but life in Kalaland does not follow the plan

Main Characters: the same young Thai professional holding the same open planner against their chest, now with a dry, slightly forced smile and one eyebrow raised; exaggerated but realistic and relatable expressions

Character Look: office worker look (pale short-sleeve shirt, lanyard, dark circles under the eyes)

Main Action: blank bills and receipts blow in on the wind and stick to the planner pages one by one while the character keeps holding the plan steady

Environment: the same skyline, but the skytrain tracks stop mid-air on unfinished concrete pillars, tangled overhead power lines cross the view, an orange haze of dust hangs over the towers, a potted plant on the rooftop has tipped over, and the street below shows potholes and a long traffic jam; campaign posters on a nearby wall show only blank faces with no colors or symbols of any real party

Visual Irony: the plan is the same, the world just refuses to cooperate

Palette Accent: earth brown, sunflower yellow, red, warm grey

Composition: Wide 16:9; the character, the planner and the railing sit inside the central square of the frame (the middle 56% of the width); left and right edges hold only city and sky; keep the bottom 15% as rooftop floor and the top 15% as sky because interface gradients may cover them

Aspect Ratio: 16:9

Text Policy: Absolutely no text, no letters, no numbers, no logos, no watermarks, and no speech bubbles. Every bill, receipt, poster and page is blank. No real national or party flags, no temples, no monks.

Apply the complete KALALAND — BOLD THAI SATIRICAL CARTOON — IMAGE STYLE LOCK v3.0.
```

---

## 6. Checklist ก่อนส่ง

- [ ] ตัวละคร สมุด และราวระเบียงอยู่ในสี่เหลี่ยมจัตุรัสกลางภาพทั้งสองภาพ
- [ ] วางสองภาพซ้อนกันแล้วดู: ตำแหน่งหัวตัวละคร ราวระเบียง และเส้นขอบฟ้าใกล้เคียงกัน (คลาดกันได้เล็กน้อย)
- [ ] ไม่มีตัวหนังสือ ตัวเลข โลโก้ หรือธงในภาพไหนเลย
- [ ] hero-kala: ป้ายหาเสียงหน้าว่างและไม่มีสีพรรค ไม่มีวัดหรือพระ หน้าตัวละครไม่คล้ายคนจริง
- [ ] hero-base อบอุ่นและเป็นระเบียบ ส่วน hero-kala ตลกร้ายแต่ยังเป็นเมืองเดียวกัน
