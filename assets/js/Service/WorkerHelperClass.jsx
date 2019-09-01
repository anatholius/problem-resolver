export default class WorkerHelperClass {
    strategies = [];
    
    /**
     * Otwórz pamięć podręczną, w której były przechowywane zasoby, i wyszukaj żądany zasób.
     * Zauważ, że w przypadku braku dopasowania, obietnica nadal jest rozpatrywana,
     * ale ma undefinedtaką samą wartość.
     */
    fromCache = (request) => {
        return caches.open(this.CACHE).then(function (cache) {
            return cache.match(request);
        });
    };
    
    /**
     * Aktualizacja polega na otwarciu pamięci podręcznej, wykonaniu żądania sieciowego
     * i zapisaniu nowych danych odpowiedzi.
     */
    update = (request) => {
        return caches.open(this.CACHE).then(function (cache) {
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
    
    
    /**
     * @depreceapted - ta funkcja zostanie usunięta po zaimplementowaniu funkcji pomocników
     */
    install = (strategy) => {
        this.strategies.push(strategy);
        
        self.addEventListener('install', event => {
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
            
        });
    };
}