importScripts("/build/precache-manifest.026f3362401a8c5075bc044a9b08a43e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

//custom adjustments
console.log('my-custom-adjustments');

// self.workbox.routing.registerRoute('/build*', self.workbox.strategies.cacheFirst());


console.log('self.__precacheManifest', self.__precacheManifest);
self.workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
// self.workbox.precaching.precacheAndRoute([]);

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('install', event => {
    console.log('The service worker is being installed.');
    
    /**
     * Otwórz pamięć podręczną i użyj addAll()szeregu zasobów, aby dodać je wszystkie
     * do pamięci podręcznej. Poproś pracownika serwisu, aby kontynuował instalację,
     * dopóki nie zwróci się obietnica powrotu.
     */
    event.waitUntil(
        caches.open('precache-app-page')
            .then(function (cache) {
                const urls = ['/'];
                self.__precacheManifest.map(item => {
                    urls.push(item.url);
                });
                console.log(urls);
                return cache.addAll(urls);
            }),
    );
});

self.addEventListener('appinstalled', (evt) => {
    console.log('a2hs installed');
});

self.addEventListener('activate', (event) => {
    var cacheKeeplist = ['precache-app-page'];
    
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        }),
    );
});

self.addEventListener('fetch', event => {
    console.log('fetching event');
        /**
         * Aktualizacja polega na otwarciu pamięci podręcznej, wykonaniu żądania sieciowego
         * i zapisaniu nowych danych odpowiedzi.
         */
        const update = (request) => {
            return caches.open('precache-app-page').then(function (cache) {
                return fetch(request).then(function (response) {
                    return cache.put(request, response.clone()).then(function () {
                        return response;
                    });
                });
            });
        };
        
        /**
         * Wysyła wiadomość do klientów.
         */
        const refresh = (response) => {
            return self.clients.matchAll().then(function (clients) {
                clients.forEach(function (client) {
                    
                    /**
                     * Zakoduj, który zasób został zaktualizowany. Poprzez włączenie ETag klient
                     * może sprawdzić, czy zawartość została zmieniona.
                     */
                    var message = {
                        type: 'refresh',
                        url:  response.url,
                        
                        /**
                         * Zauważ, że nie wszystkie serwery zwracają nagłówek ETag. Jeśli nie jest to
                         * przewidziane, powinieneś użyć innych nagłówków pamięci podręcznej lub polegać
                         * na własnych środkach, aby sprawdzić, czy zawartość się zmieniła.
                         */
                        eTag: response.headers.get('ETag'),
                    };
                    
                    /**
                     * Poinformuj klienta o aktualizacji.
                     */
                    client.postMessage(JSON.stringify(message));
                });
            });
        };
        
        console.log('The service worker is serving the asset.');
        
        /**
         * Możesz użyć respondWith()odpowiedzi ASAP…
         */
        // event.respondWith(fromCache(event.request));
        /**
         * lub użyć strategii cache then request(check)
         */
        event.respondWith(caches.match(event.request)
            .then(cache => {
                return cache || fetch(event.request);
            }),
        );
        
        
        /**
         * … I waitUntil()aby zapobiec zabiciu pracownika do czasu aktualizacji pamięci podręcznej.
         */
        // event.waitUntil(
        //     update(event.request)
        //    
        //     /**
        //      * Na koniec wyślij wiadomość do klienta, aby poinformować go o tym, że zasób jest aktualny.
        //      */
        //         .then(refresh),
        // );
});
