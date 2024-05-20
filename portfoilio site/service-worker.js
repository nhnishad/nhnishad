const CACHE_NAME = 'website-cache-v1';
const urlsToCache = [
  '/', // Cache the root URL
  '/index.html', // Cache the index page
  '/styles/main.css', // Cache CSS files
  '/scripts/main.js', // Cache JavaScript files
  '/images/logo.png' // Cache image files
  // Add more URLs to cache as needed
];

self.addEventListener('install', function(event) {
  console.log('Service Worker installed');

  // Perform tasks required during installation
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch intercepted for:', event.request.url);

  // Respond with cached resources if available, otherwise fetch from the network
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
