  const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/dist/manifest.json",
    "/dist/bundle.js",
    "/db.js",
    "/dist/icon-192x192.png",
    "/dist/icon-512x512.png",
    "/style.css",
    "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
  ];
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("static").then((cache) => {
        return cache.addAll(CACHED_FILES);
      })
    );
    console.log("Install");
    self.skipWaiting();
  });
// retrieve assets from cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});