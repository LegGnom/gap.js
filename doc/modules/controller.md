# Controller

### Controller.constructor(http_request, http_response)
При создании конструктора первым аргументов всегда передается `http.Request` вторым `http.Response`


### Controller.get(http_request, http_response)
Обработка `GET` запроса, список передаваемых параметров аналогично `constructor`


### Controller.post(http_request, http_response)
Обработка `POST` запроса, список передаваемых параметров аналогично `constructor`


### Controller.put(http_request, http_response)
Обработка `PUT` запроса, список передаваемых параметров аналогично `constructor`


### Controller.delete(http_request, http_response)
Обработка `DELETE` запроса, список передаваемых параметров аналогично `constructor`


### Controller.patch(http_request, http_response)
Обработка `PATCH` запроса, список передаваемых параметров аналогично `constructor`


### Controller.wait(...promise)
Добавляет в ожидание список промисов
* `promise` - Деструкторизованный список промисов

### Controller.then(handler)
Переданный обработчик вызывается после того как все ожидания переданные в `wait` будут завершены


### Controller.catch(handler)
Переданный обработчик вызывается в случае если одно из ожиданий возбудило ошибку


### Controller.promise() `get`
Возвращет ссылку на `Promise.all` в который будет добавлены все ожидания переданные в метод `wait`.


### Controller.render(template, context)
Рендер шаблона
* `template` - *String|Module* путь до шаблона или require html шаблона
* `context` - *Object* контекст

### Controller.renderString(template_string, context)
В отличие от функции `render` обрабатывает строку 
```javascript
this.renderString('<h1>{{ name }}</h1>', {
    name: 'Tim'
}); // <h1>Tim</h1>
```

### Controller.setCharset(charset)
Устанавливает кодировку ответа (по умолчанию `utf-8`)


### Controller.send(body, code)
Завершает отправку запроса и отправляет ответ 
* `body` - *String* тело ответа
* `code` - *Number* код ответа (по умолчанию `200`)


### Controller.abort(body, code)
Прерывание запроса
* `body` - *String* тело ответа
* `code` - *Number* код ответа (по умолчанию `404`)

### Controller.json(data, code)
Формирует ответ  с заголовком `application/json`
* `body` - *Object* тело ответа
* `code` - *Number* код ответа (по умолчанию `200`)

### Controller.redirect(path, code)
Переадресация запроса
* `path` - *String* указание пути на который необходимо переадресовать запрос
* `code` - *Number* код ответа (по умолчанию `301`)


### Controller.getBody()
Получение текущего тела ответа


### Controller.setBody(body)
Установа тела ответа


### Controller.removeHeader(name)
Удаление заголовка по имени

### Controller.setHeader(name, value)
Установка заголовка 
* `name` - *String* название заголовка
* `value` - *String|Array* занчение заголовка

```javascript
this.setHeader('sid', '...');
```


### Controller.getHeader(name, _default)
Получение заголовка по имени
* `name` - *String* название заголовка
* `_default` - если заголовок не будет найден вернется дефолтное значение или `undefined`


### Controller.getCookie(cookie_name, _default)
Получение куки из запроса по имени
* `cookie_name` - название
* `_default` - если кука не будет найден вернется дефолтное значение или `undefined`


### Controller.getCookies()
Возвращает весь объект cookies 


### Controller.setCookie(name, value, expires=false, path='/', domain=false)
Утсановка `Cookie` в ответ
* `name` - *String* название
* `value` - *String* занчение
* `expires` - *String* время в течении которого будет доступна
* `path` - *String* путь на котором будет установлена
* `domain` - *String* домен на который необходимо установить 


### Controller.removeCookie(name)
Удаляет `Cookie` (возвращяет значение с заданным параметром **expires**)


### Controller.setHeaders(headers)
Устанавливает заголовки (заменяет предыдущие)
* `headers` - *Object* объект headers


### Controller.getHeaders()
Получить весь объект headers


### Controller.setStatus(status)
Установить статус ответа
* `status` - *Number* - код ответа


### Controller.getStatus()
Получить статус ответа


### Controller.getStatusMessage()
Получить расшифровку статуса ответа
```javascript
this.setStatus(200);
this.getStatusMessage(); // OK

this.setStatus(404);
this.getStatusMessage(); // Not Found
```
