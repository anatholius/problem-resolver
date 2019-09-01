//custom adjustments
console.log('my-custom-adjustments');
// self.workbox.routing.registerRoute('/build*', self.workbox.strategies.cacheFirst());

// self.workbox.precaching.suppressWarnings();
// self.workbox.precaching.precacheAndRoute([]);
console.log('self.__precacheManifest', self.__precacheManifest);
self.workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
// self.workbox.routing.registerRoute('/', self.workbox.strategies.cacheFirst());


self.addEventListener('install', event => {
    // console.log('skipping waiting');
    // self.skipWaiting();

    const channel = new BroadcastChannel('service-worker-channel');
    channel.postMessage({promptToReload: true});
    channel.onmessage = message => {
        if (message.data.skipWaiting) {
            self.skipWaiting();
        }
    };

});

