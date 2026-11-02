// Netlify Function: ให้ Claude เรียบเรียงบทสรุปชีวิตจากข้อเท็จจริงของเกม แล้วส่งข้อความกลับแบบทยอย (streaming)
// API key อยู่ใน env ANTHROPIC_API_KEY ฝั่ง server เท่านั้น หน้าเว็บไม่เคยเห็น key
import Anthropic from '@anthropic-ai/sdk';

export const config = { path: '/api/life-story' };

const MODEL = 'claude-opus-5-5';
const MAX_BODY = 24000; // ตัวอักษร — เกม 8 บทจริงใช้ราว 3–6 พัน
const END = '\n[[END]]';
const FAIL = '\n[[ERROR]]';

const SYSTEM = `คุณเป็นนักเขียนไทยที่เล่าเรื่องชีวิตคนได้อบอุ่นและจริงใจ งานนี้คือเขียนบทสรุปชีวิตของตัวละครในเกมจำลองชีวิต LIFE CEO จากข้อเท็จจริงที่เกมบันทึกไว้

ข้อมูลจะมาเป็น JSON ประกอบด้วย ชื่อตัวละคร อาชีพ เป้าหมายชีวิต เหตุการณ์แต่ละยุค (เรียงตามบท) ผลที่ย้อนกลับมาจากการตัดสินใจเก่า (Echo) ค่าสถานะตอนจบ และคะแนน

วิธีเขียน
- เล่าเป็นเรื่องเดียวที่ต่อเนื่อง เรียกตัวละครด้วยชื่อที่ให้มา (ถ้าไม่มีชื่อให้ใช้ "คุณ") ไม่ไล่ทีละบทแบบรายการ
- แบ่งเป็น 4 ช่วงตามยุค ขึ้นต้นแต่ละช่วงด้วยบรรทัด "## " ตามด้วยชื่อยุคและช่วงอายุ เช่น "## ยุค I เริ่มต้น · อายุ 22–30"
- ให้เห็นว่าตัวละครเติบโตหรือเปลี่ยนไปอย่างไร และการตัดสินใจในยุคก่อนส่งผลมาถึงยุคหลังอย่างไร โดยเฉพาะ Echo ที่ย้อนกลับมา
- ปิดท้ายด้วยช่วง "## สิ่งที่ได้มา และสิ่งที่แลกไป" เขียนเป็นร้อยแก้วสั้นๆ ว่าชีวิตนี้ได้อะไรมา ต้องแลกอะไรไป และอะไรที่ยังค้างคาใจ
- ความยาวรวมราว 450–700 คำ ย่อหน้าสั้น อ่านง่าย

ข้อห้าม
- ใช้เฉพาะเหตุการณ์และตัวเลขที่อยู่ในข้อมูล ห้ามแต่งเหตุการณ์ ชื่อคน สถานที่ หรือตัวเลขเพิ่ม บรรยายความรู้สึกและบรรยากาศได้
- ไม่ต้องอ้างถึงกลไกเกม เช่น แต้ม ช่องเวลา การ์ด หรือสัญลักษณ์อีโมจิ ให้เล่าเป็นชีวิตจริง
- ภาษาไทยต้องเป็นธรรมชาติเหมือนคนไทยเขียน ไม่ใช้สำนวนแปล เช่น "สิ่งที่ X ให้จริงๆ คือ...", "นี่ไม่ใช่แค่ A แต่คือ B", "ในแง่ของการ...", "มันเป็นสิ่งสำคัญที่จะต้อง..."
- ไม่ใส่คำนำหรือคำลงท้ายนอกเรื่อง ตอบเป็นเนื้อเรื่องอย่างเดียว`;

// โหมดกะลาแลนด์: เล่ากวนแบบตลกร้าย ล้อระบบ ไม่ด่าคนจริง
const SYSTEM_KALA = `คุณเป็นนักเขียนคอลัมน์ตลกร้ายสไตล์ไทย เล่าชีวิตตัวละครในเกม LIFE CEO โหมด "กะลาแลนด์ แดนซิวิไลซ์" ซึ่งเป็นประเทศสมมติ "ดินแดนที่ทุกอย่างเป็นไปได้ ยกเว้นสิ่งที่ควรจะเป็น"

ข้อมูลจะมาเป็น JSON เหมือนโหมดปกติ และมีเพิ่ม quips (ประโยคกวนที่ผู้เล่นเจอระหว่างเกม) กับ incidents (เคราะห์ที่โดนแบบเลือกไม่ได้)

วิธีเขียน
- เล่าเป็นเรื่องเดียวต่อเนื่อง เรียกตัวละครด้วยชื่อที่ให้มา (ไม่มีชื่อให้ใช้ "คุณ") น้ำเสียงเหมือนเพื่อนเล่าให้ฟังในวงข้าว กวน ประชด แต่มีความเห็นใจ
- แบ่ง 4 ช่วงตามยุค ขึ้นต้นด้วย "## " ตามด้วยชื่อยุคและช่วงอายุ
- หยิบ quips มาใช้เป็นมุกในจังหวะที่เหมาะ ไม่ต้องใช้ครบทุกอัน และแต่งมุกใหม่ในโทนเดียวกันได้
- ให้เห็นว่าการตัดสินใจในยุคก่อนย้อนมาเล่นงานอย่างไร โดยเฉพาะโซ่ "ซวยซ้ำซ้อน" และเคราะห์ที่หลบไม่ได้
- ปิดท้ายด้วยช่วง "## ได้อะไรมา เสียอะไรไป ในกะลาแลนด์" สรุปแบบขำขื่น
- ความยาวรวมราว 450–700 คำ ย่อหน้าสั้น

ข้อห้าม
- ใช้เฉพาะเหตุการณ์และตัวเลขที่อยู่ในข้อมูล ห้ามแต่งเหตุการณ์ ตัวเลข หรือคนเพิ่ม
- ทุกอย่างอยู่ในกะลาแลนด์ ห้ามเอ่ยชื่อจริงของประเทศ จังหวัด พรรค หน่วยงาน หรือบุคคล
- ห้ามแตะสถาบันและศาสนา ห้ามเหยียดเชื้อชาติ ภูมิภาค เพศ หรือคนกลุ่มเปราะบาง ล้อที่ระบบและสถานการณ์เท่านั้น
- ไม่อ้างถึงกลไกเกม แต้ม หรืออีโมจิ
- ภาษาไทยต้องเป็นธรรมชาติ ไม่ใช้สำนวนแปล
- ไม่ใส่คำนำหรือคำลงท้ายนอกเรื่อง`;

const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');
const list = (v, max, fn) => (Array.isArray(v) ? v.slice(0, max).map(fn) : []);

// รับเฉพาะโครงที่หน้าเกมส่งมา ตัดส่วนเกินทิ้ง เพื่อไม่ให้ใครใช้ endpoint นี้สั่งงานอื่น
function clean(b) {
  return {
    name: str(b.name, 20),
    career: str(b.career, 60),
    goal: str(b.goal, 60),
    goalResult: str(b.goalResult, 40),
    ending: str(b.ending, 40),
    tier: str(b.tier, 40),
    total: Number.isFinite(b.total) ? b.total : 0,
    eras: list(b.eras, 4, e => ({ title: str(e && e.title, 60), lines: list(e && e.lines, 30, l => str(l, 400)) })),
    echoes: list(b.echoes, 20, l => str(l, 400)),
    final: list(b.final, 12, l => str(l, 120)),
    score: list(b.score, 12, l => str(l, 120)),
    mode: b.mode === 'kala' ? 'kala' : 'base',
    quips: list(b.quips, 40, l => str(l, 160)),
    incidents: list(b.incidents, 12, l => str(l, 80)),
  };
}

export default async req => {
  if (req.method !== 'POST') return new Response('ใช้ POST เท่านั้น', { status: 405 });
  // กันเว็บอื่นเรียกใช้ (Netlify ใส่ URL ของเว็บไว้ใน env URL ให้อัตโนมัติ)
  const origin = req.headers.get('origin');
  const site = process.env.URL;
  const local = origin && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  if (origin && site && !local && origin !== site && origin !== process.env.DEPLOY_PRIME_URL) {
    return new Response('ไม่อนุญาต', { status: 403 });
  }
  if (!process.env.ANTHROPIC_API_KEY) return new Response('ยังไม่ได้ตั้ง ANTHROPIC_API_KEY', { status: 503 });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return new Response('ข้อมูลยาวเกินไป', { status: 413 });
  let facts;
  try { facts = clean(JSON.parse(raw)); } catch { return new Response('ข้อมูลไม่ถูกต้อง', { status: 400 }); }
  if (!facts.eras.length) return new Response('ไม่มีเรื่องให้เล่า', { status: 400 });

  const client = new Anthropic();
  const enc = new TextEncoder();
  const body = new ReadableStream({
    async start(ctrl) {
      try {
        const stream = client.beta.messages.stream({
          model: MODEL,
          max_tokens: 8000,
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default',
          output_config: { effort: 'low' },
          system: facts.mode === 'kala' ? SYSTEM_KALA : SYSTEM,
          messages: [{ role: 'user', content: `ข้อมูลชีวิตจากเกม:\n${JSON.stringify(facts, null, 1)}` }],
        });
        for await (const ev of stream) {
          if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') ctrl.enqueue(enc.encode(ev.delta.text));
        }
        const msg = await stream.finalMessage();
        // ถูกปฏิเสธหรือโดนตัดกลางทาง ถือว่าไม่สำเร็จ หน้าเกมจะใช้เรื่องเล่าแบบเดิม
        ctrl.enqueue(enc.encode(msg.stop_reason === 'end_turn' ? END : FAIL));
      } catch (err) {
        console.error('life-story', err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
        ctrl.enqueue(enc.encode(FAIL));
      }
      ctrl.close();
    },
  });
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });
};
