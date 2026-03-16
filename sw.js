const CACHE_NAME = 'robot-cache-vFINAL';
const ASSETS = [
  'index.html',
  'cours.html',
  'lecteur.html',
  'style.css',
  'script.js',
  'users.js',
  'manifest.json'
];

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation (nettoie les anciens caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Stratégie : Cache d'abord, puis Réseau (Idéal pour le hors-ligne)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        // Optionnel : mettre en cache les PDF consultés au fur et à mesure
        if (event.request.url.includes('.pdf')) {
          let responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return response;
      });
    })
  );
});
