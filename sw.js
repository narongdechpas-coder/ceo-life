// Service worker: ทำให้ติดตั้งเป็นแอปได้ และเปิดเล่นต่อได้ตอนเน็ตหลุด
// หน้าเว็บดึงจากเน็ตก่อน (ได้เวอร์ชันใหม่เสมอ) ไฟล์อื่นตอบจาก cache แล้วอัปเดตเบื้องหลัง
const CACHE = 'lifeceo-v2';

self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', 'manifest.webmanifest', 'assets/icons/icon-192.png'])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', ev => {
  ev.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  const url = new URL(req.url);
  // API (เรื่องเล่าที่ Claude เรียบเรียง) และไฟล์จากเว็บอื่น เช่นฟอนต์ ไม่ผ่าน cache
  if (req.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  if (req.mode === 'navigate') {
    ev.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put('./', copy));
      return res;
    }).catch(() => caches.match('./')));
    return;
  }
  ev.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req);
    const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; });
    if (hit) { ev.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
