const CACHE_NAME = 'mysocial-v1';
const ASSETS_TO_CACHE = [
    'offline.html',
    'css/style.css',
    'assets/images/profilepic.png',
    'assets/images/bg-pattern.jpg'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching offline assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // If network fails, serve offline page for HTML requests
            if (event.request.mode === 'navigate') {
                return caches.match('offline.html');
            }
            // Ideally we could return cached assets here too, but for now fallback is key
            return caches.match(event.request);
        })
    );
});
