console.log('Service worker registered');

// sw.js

const CACHE_NAME = 'my-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          // Add other static assets you want to cache
        ]);
      })
  );
});

// Push Notifications
// https://developers.google.com/web/fundamentals/codelabs/push-notifications/
self.addEventListener('fetch', (event) => {
  console.log('SERVICE WORKER: Fetch intercepted for:', event.request.url);
});

self.addEventListener('push', (event) => {
  const options = { body: event.data.text(), icon: '/logo.png', vibrate: [100, 50, 100] 
  
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );

  console.log('Push event received:', event);
});


self.__WB_MANIFEST