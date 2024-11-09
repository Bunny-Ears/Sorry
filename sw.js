const CACHE_NAME = `sorry-jar-v1`;
const PRE_CACHED_RESOURCES = ['/Sorry', 'script.js', 'styles.css', 'jar.svg', 'jar.webp'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(PRE_CACHED_RESOURCES);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        const fetchResponse = await fetch(event.request);

        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        console.log('Offline');
      }
    }
  })());
});

self.addEventListener("activate", event => {
  console.log("WORKER ACTIVATED");
});