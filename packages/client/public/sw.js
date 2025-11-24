// !!!имена папок в public не должны совпадать с названием url-ов!!!
const CACHE_NAME = 'magic_type-cache-v4';

const URLS = [
  '/',
  // '/App.tsx',
  // '/index.scss',
  // '/mainPage/index.ts',
  // '/mainPage/ui/MainPage.tsx',
  // '/mainPage/ui/MainPage.module.scss',

  '/game',
  
  '/forum',
  // '/forum/create',
  // '/forum/:topicId', // ???

  '/profile',
  // '/src/pages/ProfilePage.tsx',

  '/leaderboard',

  '/login',
  '/register',

  // '/public/main/logo.svg',
  // '/avatar/tip.png',
  // '../../../../public/gameImg/startGame.png'
  // '/public/gameImg/startGame.png',
];
  
this.addEventListener("install", event => {
  console.log("install");
  // console.log(event);
  event.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");
        return cache.addAll(URLS);
      })
      .catch(err => { 
        console.log(err);
        throw err;
      })
  );
});

this.addEventListener("activate", event => {
  console.log("activate");
  // console.log(event);
  event.waitUntil( 
    caches.keys().then(cacheNames => { 
      return Promise.all( 
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))  
      ) 
    })
  );
});

this.addEventListener('fetch', event => {
  console.log('fetch')
  // console.log(event)
  // console.log(caches.keys())
  event.respondWith( 
    // Пытаемся найти ответ на такой запрос в кеше 
    caches.match(event.request) 
      .then(response => {
        // console.log(response)
        // Если ответ найден, выдаём его 
        if (response) { 
          return response; 
        } 

        const fetchRequest = event.request.clone(); 
        // В противном случае делаем запрос на сервер 
        return fetch(fetchRequest) 
          // Можно задавать дополнительные параметры запроса, если ответ вернулся некорректный. 
          .then(response => { 
            // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш 
            if(!response || response.status !== 200 || response.type !== 'basic') { 
              return response; 
            } 

            const responseToCache = response.clone(); 
            // Получаем доступ к кешу по CACHE_NAME 
            caches.open(CACHE_NAME) 
            .then(cache => { 
              // Записываем в кеш ответ, используя в качестве ключа запрос 
              cache.put(event.request, responseToCache); 
            }); 
            // Отдаём в основной поток ответ 
            return response; 
         } 
        ); 
    }) 
  ); 
});
