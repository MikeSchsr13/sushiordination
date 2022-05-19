const CACHE = "pwabuilder-precache";
//Utilizzeremo il Service Worker in modalità Cache-first
const precacheFiles = ["index.html", "manifest.json", "sw.js","style.css", "/icons/favicon.ico","/icons/icon.png"];
//In quest’array mettiamo tutti I file che devono essere salvati
//nella cache locale per permettere la navigazione offline.
//Essendo file di piccole dimensioni, non mi preoccupo del peso e
//li carico tutti in cache.

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(precacheFiles);
    })
  );
});

//Diamo il permesso al Service Worker di poter avere il controllo
//della pagina corrente
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

//Se il recupero fallisce, cercherà la richiesta nella cache e
//la servirà prima da lì
self.addEventListener("fetch", function (event) { 
  if (event.request.method !== "GET") return;
  event.respondWith(
    fromCache(event.request).then(
      function (response) {      
// La risposta è stata trovata nella cache, quindi rispondiamo e aggiorniamo i dati
// Qui è dove chiamiamo il server per ottenere la versione più recente
// dei file da usare alla prossima visualizzazione
event.waitUntil(
            fetch(event.request).then(function (response) {
            return updateCache(event.request, response);
          })
        );
        return response;
      },

      function () {
        //La risposta non è stata trovata nella cache, quindi la cerchiamo sul server
        return fetch(event.request)
          .then(function (response) {
            //Se la richiesta ha successo, la aggiungiamo o la aggiorniamo nella cache
            event.waitUntil(updateCache(event.request, response.clone()));
            return response;
          })
          .catch(function (error) {
            console.log("Richiesta fallita" + error);
          });
      }
    )
  );
});

function fromCache(request) {
  //Fa un controllo per vedere se c’è nella cache
  //Se non c’è, restituisce la risposta
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }
      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
} 