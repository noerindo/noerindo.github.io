
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
  console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute(
      [
       {url: '/',revision: '2'},
       {url: '/index.html',revision: '2' },
       {url: '/indah.png',revision: '2' },
       {url: '/icon.png',revision: '2' },
       {url: '/icon (1).png',revision: '2' },
       {url: '/icon (2).png',revision: '2' },
       {url: '/icon (3).png',revision: '2' },
       {url: '/manifest.json',revision: '2' },
       {url:  '/nav.html',revision: '2' },
       {url: '/css/materialize.min.css',revision: '2' },
       {url: '/js/materialize.min.js',revision: '2' },
       {url:  '/js/nav.js',revision: '2' },
       {url:  '/js/api.js',revision: '2' },
       {url:  '/js/idb.js',revision: '2' },
       {url: '/js/indexdb.js',revision: '2' },
       {url: '/pages/standing.html',revision: '2' },
       {url: '/pages/about.html',revision: '2' },
       {url: '/pages/saved tim.html',revision: '2' },
       {url: '/pages/tim.html',revision: '2' },
      ]);
    
      workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


  workbox.routing.registerRoute(
      new RegExp('https://api.football-data.org/'),
      workbox.strategies.staleWhileRevalidate()
      )

// Caching Google Fonts
workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
})
  );

workbox.routing.registerRoute(
/\.(?:js|css)$/,
new workbox.strategies.StaleWhileRevalidate({
  cacheName: 'static-resources',
})
);

workbox.routing.registerRoute(
new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
  })
);

}else{
console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon (1).png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
