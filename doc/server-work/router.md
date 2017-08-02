# Router

Простой пример обработки http запроса по url

```javascript
const Router = require('gap.js/router');

Router.get("/", function(request, response) {
    response.send("Hello world");
});
```

Выше мы определили маршрут для **URL(/)** и привязали к нему обработчик. С помощью метода **response.send** мы вернули
ответ "Hello world".


Не всегда удбно использовать функции в обработке запросов, реальные приложения намного сложнее примера и требуют более 
удобного взаимодействия с API вреймворка.

Для более удобной работы над вашим проектом обработчиком запроса может служить **ES2015** классы
  

```javascript
const Router = require('gap.js/router');

class HelloWorld {
    constructor(request, response) {
        response.send('Hello world');
    }
}

Router.get("/", HelloWorld);
```

Но получить более удобное апи для работы с http запросами и возможность наследования вам поможет класс Controller


```javascript
const Router = require('gap.js/router');
const Controller = require('gap.js/controller');

class HelloWorld extends Controller {
    constructor(request, response) {
        super();
        
        this.send('Hello world');
    }
}

Router.get("/", HelloWorld);
```

## Определение url
Для определения пути можно использовать как строки так и регулярные вырожения

Стрококвое определение пути:
* /
* /path/
* /path/<key>/
* /path/<key:number>/

В строковом представлении пути доступны переменные с возможностью их типизации (`string`, `number`). Переменные после 
объявления становятся достыпными в объекте `request.params`
 
Определение при помощи регулярных выражений

```javascript
const Router = require('gap.js/router');
Router.get(/^(.+)/, function() {
    // ...
});
```

Ниболее распространеные патерны:
```javascript
Router.get(/^articles$/, handler);
Router.get(/^articles\/([0-9]{4})$/, handler);
Router.get(/^articles\/(.+)/, handler);
```



## HTTP методы
HTTP методы определяют тип запроса.
 
Класический пример HTTP методов это форма, в которой мы определяем метод POST, так как мы хотим безопасно отправить 
 данные формы на сервер

| Метод    | Router метод   |
|----------|----------------|
| GET      | Router.get     |
| POST     | Router.post    |
| PUT      | Router.put     |
| DELETE   | Router.delete  |
| PATcH    | Router.patch   |


### Router.route(key, methods, handler)

```javascript
const Router = require('gap.js/router');

Router.get("/", function(request, ['GET'], response) {
    response.send("Hello world");
});
```


### Router.any(key, handler)
Для того чтобы обработать любой тип запроса можно воспользоваться методом **any** 
```javascript
const Router = require('gap.js/router');

Router.get("/", function(request, response) {
    response.send("Hello world");
});
```


### Router.group(name, manager)
Группировака маршрутов требуется когда вы хотите, чтобы куча маршрутов имела одни и теже атрибуты или обработчик, не 
определяя их снова и снова.

```javascript
const Router = require('gap.js/router');

class ApiHandler {
    // ...
}

Router.group("/api/v1", function(group_router) {
    group_router.get('/user', function(request, response) {
        // ...
    });
}).handler(ApiHandler);
```

Здесь важно отметить что обработчик группы будет выполнен после того как выполнятся основные обработчики.