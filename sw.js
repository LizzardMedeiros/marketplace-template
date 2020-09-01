const staticCacheName = 'noivasja-201907112';

// Cache on install
this.addEventListener("install", event => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
        	'/mstatic/css/materialize.min.css',
          '/mstatic/css/bride.css',
          '/mstatic/css/provider.css',
          '/mstatic/fonts/ACaslonPro-Semibold.otf',
          '/mstatic/jquery/jquery-3.3.1.min.js'
        ]);
    })
  )
});

// Clear cache on activate
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('noivasja-')))
          .filter(cacheName => (cacheName !== staticCacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

//Serve from Cache
this.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('');//página offline
      })
  )
});