const CACHE_NAME = 'shimpi-milan-cache-v4';
const urlsToCache = [
  '/site.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable.png'
];

// Hostnames that should NEVER be intercepted by the SW
const API_HOSTS = ['shimpi-bandhan-backend.onrender.com'];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        urlsToCache.map(url =>
          cache.add(url).catch(err => console.warn(`Failed to cache ${url}:`, err))
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // take control of all open tabs immediately
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // ── Rule 1: Never intercept non-GET requests (POST, PUT, DELETE, etc.)
  if (req.method !== 'GET') return;

  // ── Rule 2: Never intercept cross-origin API requests (backend host)
  if (API_HOSTS.includes(url.hostname)) return;

  // ── Rule 3: Never intercept chrome-extension or non-http requests
  if (!url.protocol.startsWith('http')) return;

  // ── Rule 4: Never intercept paths that look like API routes
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/auth/')) return;

  // ── For everything else (static assets): cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      return cached || fetch(req);
    }).catch(() => fetch(req))
  );
});
