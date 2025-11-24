const CACHE_NAME = 'magic_type-cache-v4';

const URLS = [

  '/',
  
  '/assets/index-22f406cc.css',
  '/assets/index-e4be429c.js',
  '/assets/logo-a158fc4d.svg',

  '/avatar/tip.png',

  '/charactes/main-character.png',
  '/charactes/sceleton-mage.png',
  '/charactes/sceleton.png',

  '/gameImg/imgGame.png',
  '/gameImg/startGame.png',

  '/main/logo.svg',

  '/sprites/background-with-wall-and-keyboard.png',
  '/sprites/background-with-wall.png',
  '/sprites/only-grass.png',

  '/index.html'
];
  
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
