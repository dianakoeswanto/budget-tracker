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

const CACHE_NAME = "static-cache";
const DATA_CACHE_NAME = "data-cache";

// install
self.addEventListener("install", (evt) => {
	evt.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(FILES_TO_CACHE);
		})
	);

	self.skipWaiting();
});

// activate
self.addEventListener("activate", (evt) => {
	evt.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(
				keyList.map(key => {
					if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
						console.log("Removing old cache data", key);
						return caches.delete(key);
					}
				})
			);
		})
	);

	self.clients.claim();
});

// fetch
self.addEventListener("fetch", (evt) =>{
	if (evt.request.url.includes("/api/")) {
		evt.respondWith(
			caches.open(DATA_CACHE_NAME).then(cache => {
				return fetch(evt.request)
					.then(response => {
						// If the response was good, clone it and store it in the cache.
						if (response.status === 200) {
							cache.put(evt.request.url, response.clone());
						}

						return response;
					})
					.catch(err => {
						// Network request failed, try to get it from the cache.
						console.log(err);
						return cache.match(evt.request);
					});
			}).catch(err => console.log(err))
		);

		return;
	}

	evt.respondWith(
		caches.open(CACHE_NAME).then(cache => {
			return cache.match(evt.request).then(response => {
				return response || fetch(evt.request);
			});
		})
	);
});