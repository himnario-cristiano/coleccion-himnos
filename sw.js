const CACHE_NAME = 'audiohub-v1';
// Aquí agregamos los archivos base que queremos que carguen rápido
const urlsToCache = [
  './',
  './index.html',
  './datos.json',
  './manifest.json'
];

// Instalar Service Worker y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las peticiones para usar el caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, devuélvelo, si no, búscalo en internet
        return response || fetch(event.request);
      })
  );
});
