# Router


### Router.group(name, manager)
Создание группы запросов
* `name` - *String* ключь группы, становится префиксом  для группы
* `manager` - *Object|Function* 

```javascript
const Router = require('gap.js/router');

Router.group('/', {
    'about': function(request, response){
        response.send('Hello');
    },
    ...
});

Router.group('/', function(route) {
    route.any('about', function(request, response) {
        response.send('Hello');
    });
    ...
});
```


### Router.error(handler)
Устанавливает обработчик страниц ошибок
* `handler` - *Function|Class*


### Router.any(key, handler)
Установить обработчик на все типы запросов по данному ключу
* `key` - *String* ключь зпроса (путь к старнице)
* `handler` - *Function|Class*


### Router.get(key, handler)
Установить обработчик на GET запрос по ключу
* `key` - *String* ключь зпроса (путь к старнице)
* `handler` - *Function|Class*


### Router.post(key, handler)
Установить обработчик на POST запрос по ключу
* `key` - *String* ключь зпроса (путь к старнице)
* `handler` - *Function|Class*


### Router.put(key, handler)
Установить обработчик на PUT запрос по ключу
* `key` - *String* ключь зпроса (путь к старнице)
* `handler` - *Function|Class*


### Router.delete(key, handler)
Установить обработчик на DELETE запрос по ключу
* `key` - *String* ключь зпроса (путь к старнице)
* `handler` - *Function|Class*


### Router.patch(key, handler)
Установить обработчик на PATCH запрос по ключу
* `key` - *String* ключь зпроса (путь к старнице)
* `handler` - *Function|Class*


### Router.route(key, methods, handler)
Установить обработчик определенные типы запросов по ключу
* `key` - *String* ключь зпроса (путь к старнице)
* `methods` - *Array* список методов
* `handler` - *Function|Class*