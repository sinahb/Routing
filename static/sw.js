const CACHE_NAME = 'azadi-navigator-v2';
const urlsToCache = [
  '/',
  '/static/manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request).catch(() => {
        // در صورت آفلاین و عدم وجود در کش، صفحه اصلی را برگردان
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      }))
  );
});
