// import { precacheAndRoute } from 'workbox-precaching';

// Эта переменная заменится на список файлов при сборке
const manifest = self.__WB_MANIFEST
// precacheAndRoute(manifest);

const URLS = ['/'];

// console.log(manifest);
manifest.forEach((item) => {
  if (!item.url.includes('server')) {
    URLS.push(`/${item.url.split('/').splice(1).join('/')}`)
  }
});
// console.log(URLS);

const CACHE_NAME = 'magic_type-cache-v5';

// const URLS = [

//   '/',
  
//   '/assets/index.css',
//   '/assets/index.js',
//   '/assets/logo.svg',

//   '/avatar/tip.png',

//   '/charactes/main-character.png',
//   '/charactes/sceleton-mage.png',
//   '/charactes/sceleton.png',

//   '/gameImg/imgGame.png',
//   '/gameImg/startGame.png',

//   '/mainImg/logo.svg',

//   '/sprites/background-with-wall-and-keyboard.png',
//   '/sprites/background-with-wall.png',
//   '/sprites/only-grass.png',

//   '/index.html'
// ];
  
this.addEventListener("install", event => {
  event.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS);
      })
      .catch(err => { 
        console.log(err);
        throw err;
      })
  );
});

this.addEventListener("activate", event => {
  event.waitUntil( 
    caches.keys().then(cacheNames => { 
      return Promise.all( 
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))  
      ) 
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith( 
    caches.match(event.request) 
      .then(response => {

        if (response) { 
          return response; 
        } 

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest) 
          .then(response => { 
            if(!response || response.status !== 200 || response.type !== 'basic') { 
              return response; 
            } 

            const responseToCache = response.clone();

            caches.open(CACHE_NAME) 
              .then(cache => { 
                cache.put(event.request, responseToCache); 
              }); 
            return response; 
         } 
        ); 
    }) 
  ); 
});
