//custom adjustments
console.log('my-custom-adjustments');

// self.workbox.routing.registerRoute('/build*', self.workbox.strategies.cacheFirst());


console.log('self.__precacheManifest', self.__precacheManifest);
self.workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// self.workbox.routing.registerRoute('/', self.workbox.strategies.cacheFirst());


/**
 * Helper dla service workera
 */
class WorkerHelper {
    strategy;
    
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    /**
     * Otwórz pamięć podręczną, w której były przechowywane zasoby, i wyszukaj żądany zasób.
     * Zauważ, że w przypadku braku dopasowania, obietnica nadal jest rozpatrywana,
     * ale ma undefinedtaką samą wartość.
     */
    fromCache(request) {
        return caches.open(this.strategy).then(function (cache) {
            return cache.match(request);
        });
    }
    
    /**
     * Aktualizacja polega na otwarciu pamięci podręcznej, wykonaniu żądania sieciowego
     * i zapisaniu nowych danych odpowiedzi.
     */
    update = (request) => {
        return caches.open(this.strategy).then(function (cache) {
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
    refresh = (response) => {
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
    
}


const cacheStrategy = 'cache-update-and-refresh';
// const workerHelper = new WorkerHelper(cacheStrategy);
/**
 * Podczas instalacji buforuj niektóre zasoby - strategia: cache-update-and-refresh
 */
self.addEventListener('install', event => {
    console.log('The service worker is being installed.');
    
    
    /**
     * Otwórz pamięć podręczną i użyj addAll()szeregu zasobów, aby dodać je wszystkie
     * do pamięci podręcznej. Poproś pracownika serwisu, aby kontynuował instalację,
     * dopóki nie zwróci się obietnica powrotu.
     */
    event.waitUntil(
        caches.open(cacheStrategy)
            .then(function (cache) {
                const urls = ['/'];
                self.__precacheManifest.map(item => {
                    urls.push(item.url);
                });
                console.log(urls);
                return cache.addAll(urls);
            }),
    );
    
    /*/
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            const urls = [];
            self.__precacheManifest.map(item => {
                urls.push(item.url);
            });
            console.log(urls);
            return cache.addAll(urls);
        }),
    );
    
    const channel = new BroadcastChannel('service-worker-channel');
    channel.postMessage({promptToReload: true});
    channel.onmessage = message => {
        if (message.data.skipWaiting) {
            self.skipWaiting();
        }
    };
    //*/
    
});

self.addEventListener('fetch', event => {
    /**
     * Otwórz pamięć podręczną, w której były przechowywane zasoby, i wyszukaj żądany zasób.
     * Zauważ, że w przypadku braku dopasowania, obietnica nadal jest rozpatrywana,
     * ale ma undefinedtaką samą wartość.
     */
    const fromCache = (request) => {
        return caches.open(cacheStrategy).then(function (cache) {
            console.group('fetch event SW');
            console.log('request', request);
            console.log('cache', cache);
            console.groupEnd();
            return cache.match(request);
        });
    };
    
    /**
     * Aktualizacja polega na otwarciu pamięci podręcznej, wykonaniu żądania sieciowego
     * i zapisaniu nowych danych odpowiedzi.
     */
    const update = (request) => {
        return caches.open(cacheStrategy).then(function (cache) {
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
    event.waitUntil(
        update(event.request)
        
        /**
         * Na koniec wyślij wiadomość do klienta, aby poinformować go o tym, że zasób jest aktualny.
         */
            .then(refresh),
    );
    /*/ //strategy cache || fetch
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                let responseClone = response.clone();
                caches.open('v1').then((cache) => {
                    cache.put(event.request, responseClone);
                });
                
                return response;
            });
        }).catch(() => {
            return caches.match('./not-found/');
        }),
    );
    //*/
});

self.addEventListener('activate', (event) => {
    var cacheKeeplist = [cacheStrategy];
    
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

