// Mëso shqip! service worker: keeps the whole game on the device so it runs without internet.
// Raise VERSION whenever you upload changed files, so every device fetches the new set.
const VERSION = 'meso-shqip-v3';
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'fonts/grandstander.woff2',
  'fonts/andika-400.woff2',
  'fonts/andika-700.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
  'audio/index.json'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(ASSETS);
    // Voices listed in audio/index.json are stored too, so toddlers hear them offline
    try {
      const list = await (await fetch('audio/index.json', { cache: 'no-store' })).json();
      await cache.addAll(list.map(id => `audio/${id}.wav`));
    } catch (e) {}
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Pages: answer from the device at once, refresh the stored copy in the background
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = (await cache.match(req, { ignoreSearch: true })) || (await cache.match('index.html'));
      const fresh = fetch(req)
        .then(res => { if (res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => null);
      if (cached) { event.waitUntil(fresh); return cached; }
      return (await fresh) || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    })());
    return;
  }

  // Fonts, icons and other files: device first, network only for anything new
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => cached || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(cache => cache.put(req, copy)); }
      return res;
    }))
  );
});
