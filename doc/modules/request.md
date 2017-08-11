# Request


### Request.get(path, body, headers)
Отправлет запрос методом `GET`
* `path` - *String* 
* `body` - *Object* параметры запроса
* `headers` - *Object* заголовки запроса


### Request.post(path, body, headers, files)
Отправлет запрос методом `POST`
* `path` - *String*
* `body` - *Object|FormData* - тело запроса
* `headers` - *Object* - заголовки запроса
* `files` - *Object|FormData* - список файлов (работает только на сервере)


### Request.put(path, body, headers, files)
Отправлет запрос методом `PUT`
* `path` - *String*
* `body` - *Object|FormData* - тело запроса
* `headers` - *Object* - заголовки запроса
* `files` - *Object|FormData* - список файлов (работает только на сервере)


### Request.delete(path, body, headers, files)
Отправлет запрос методом `DELETE`
* `path` - *String*
* `body` - *Object|FormData* - тело запроса
* `headers` - *Object* - заголовки запроса
* `files` - *Object|FormData* - список файлов (работает только на сервере)



### Request.patch(path, body, headers, files)
Отправлет запрос методом `PATCH`
* `path` - *String*
* `body` - *Object|FormData* - тело запроса
* `headers` - *Object* - заголовки запроса
* `files` - *Object|FormData* - список файлов (работает только на сервере)



### Request.send(method, path, body, headers, files)
Отправлет запрос
* `method` - *String* метод запроса
* `path` - *String*
* `body` - *Object|FormData* - тело запроса
* `headers` - *Object* - заголовки запроса
* `files` - *Object|FormData* - список файлов (работает только на сервере)


### Request.setProxy(from, to)
Перенаправление запроса 
* `from` - *String|RegExp* искомое значени, если является стракой ищет от начала строки точное совподение
* `to` - *String* куда следует перенаправить

```javascript
Request.setProxy('/api/', 'http://my-site.com/api/');
Request.get('/api/user') // -> http://my-site.com/api/user

Request.setProxy(/^\/api\//, 'http://my-site.com/api/');
Request.get('/api/user') // -> http://my-site.com/api/user
```

