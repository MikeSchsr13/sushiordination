// Evento install
self.addEventListener('install', (event) => {
	// Codice da eseguire su installazione
	console.log('Service Worker Installato');
});
// Evento activate
self.addEventListener('activate', (event) => {
	// Codice da eseguire su attivazione
	console.log('Service Worker Attivo');
});
// Evento fetch
// self.addEventListener('fetch', (event) => {
// 	// Codice da eseguire su fetch di risorse
// 	console.log('Richiesta URL: ' + event.request.url);
// });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(fetch(event.request));
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
        })
    );
});