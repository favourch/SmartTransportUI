var dataCacheName = 'laraData-v1';
var cacheName = 'lara-v4-cache';
var filesToCache = [
	'https://lara.ng/',
	'index-2.html',
	'favicon.ico',
	'lara.json',
	'js/localforage.min.js',
	'js/script.js',
	'js/jquery-2.2.3.min.js',
	'js/doT.min.js',
	'css/style.css',
	'images/logo.svg',
	'images/bg.png',
	'images/bgbgt.png',
	'images/bgbwt.png',
	'images/icons/cool.svg',
	'images/icons/emoji.svg',
	'images/icons/facebook.svg',
	'images/icons/happy-1.svg',
	'images/icons/happy-2.svg',
	'images/icons/happy.svg',
	'images/icons/in-love.svg',
	'images/icons/link.svg',
	'images/icons/location.svg',
	'images/icons/menu.svg',
	'images/icons/ninja.svg',
	'images/icons/quiet.svg',
	'images/icons/read.svg',
	'images/icons/sad.svg',
	'images/icons/sendbgt.svg',
	'images/icons/sendbwt.svg',
	'images/icons/send.svg',
	'images/icons/share.svg',
	'images/icons/smile.svg',
	'images/icons/surprised.svg',
	'images/icons/suspicious.svg',
	'images/icons/twitter.svg',
	'images/icons/unhappy.svg',
	'images/icons/walk.svg',
	'images/icons/whatsapp.svg',
	'images/icons/wtf.svg',
];

self.addEventListener('install', function(e) {
	//console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			//console.log('[ServiceWorker] Caching App Shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function(e) {
	//console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				//console.log('[ServiceWorker] Removing old cache', key);
				if (key !== cacheName && key !== dataCacheName) {
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	//console.log('[ServiceWorker] Fetch', e.request.url);
//		e.respondWith(
			caches.match(e.request).then(function(response) {
				return response || fetch(e.request);
			});
			/*.catch(function() {
					// Do nothing.
				})
		);
*/
});