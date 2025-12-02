
const manifest = self.__WB_MANIFEST

const URLS = ['/', '/profile', '/login', '/register', '/game', '/leaderboard', '/forum'];

manifest.forEach((item) => {
  const {url} = item
  if (!url.includes('server')) {
    URLS.push(`/${url.split('/').splice(1).join('/')}`)
  }
});

const CACHE_NAME = 'magic_type-cache-v1';
  
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
