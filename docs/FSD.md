1. **Общая архитектура клиента**
    src/
    ├── app/                    # Инициализация приложения
    │   ├── const/             
    │   │   └── index.tsx      # Константы приложения
    │   ├── routes/            
    │   │   └── index.tsx      # Маршрутизация
    │   ├── styles/            
    │   │   └── variables.scss # SCSS переменные
    │   ├── App.tsx            # Главный компонент
    │   ├── index.scss         # Глобальные стили
    │   ├── index.tsx          # Точка входа
    │   └── store.ts           # Store 
    ├── assets/                # Статические файлы
    ├── pages/                 # Страницы приложения
    │   ├── LoginPage/             # Пример страницы логина
    │   │   ├── model/         
    │   │   │   ├── consts.ts
    │   │   │   ├── schemas.ts
    │   │   │   └── types.ts
    │   │   ├── ui/
    │   │   │   ├── LoginPage.tsx
    │   │   │   ├── LoginForm.tsx
    │   │   │   └── LoginPage.module.scss
    │   │   └── index.ts
    │   └── index.ts           # Публичный API всех страниц
    ├── shared/                # Переиспользуемый код
    │   ├── config/           # Конфиг  
    │   ├── lib/               # Дополнительные библиотеки
    │   └── ui/                # UI компоненты
    │       ├── Header/        # Пример UI компонента
    │       │   ├── index.tsx
    └──     └── └── style.module.scss
