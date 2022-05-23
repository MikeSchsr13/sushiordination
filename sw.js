const timestamp = 1649406365635;
const CACHE = 'pwabuilder-precache';
//Utilizzeremo il Service Worker in modalità Cache-first
const files = [
	'index.html',
	'manifest.json',
	'sw.js',
	'style.css',
	'./icons/favicon.png',
	'./icons/icon.png'
];
//In quest’array mettiamo tutti I file che devono essere salvati
//nella cache locale per permettere la navigazione offline.
//Essendo file di piccole dimensioni, non mi preoccupo del peso e
//li carico tutti in cache.
const ASSETS = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);

self.addEventListener('install', function(event) {
	self.skipWaiting();
	event.waitUntil(
		caches.open(CACHE).then(function(cache) {
			return cache.addAll(precacheFiles);
		})
	);
});

//Diamo il permesso al Service Worker di poter avere il controllo
//della pagina corrente
self.addEventListener('activate', function(event) {
	event.waitUntil(self.clients.claim());
});

async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});



