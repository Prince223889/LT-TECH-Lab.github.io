const CACHE_NAME = 'robot-club-v1';
const ASSETS = [
  './',
  './index.html',
  './cours.html',
  './lecture.html',
  './style.css',
  './script.js',
  './users.js'
];

// Installation : Mise en cache des fichiers
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Interception des requêtes pour servir le cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

