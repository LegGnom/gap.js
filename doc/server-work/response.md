# Response
Работа с ответом


### Response.abort(body, code=404)
Прервать обработку страницы


### Response.send(body, code=200)
Завершить обработку запроса 

### Response.render(template, context, code=200)
Отрендерить шаблон и завершить обработку запроса
* `template` - путь до файла или require шаблона
* `context` - объект с данными передаваемый в шаблон
* `code` - код ответа


### Response.renderString(template, context, code=200)
Аналогично функции `render`, но в template принимается строка шаблона


### Response.json(data, code=200)
Прерывает запрос и возвращает json объект
* `data` - объект
* `code` - код ответа


### Response.redirect(path, code=301)
Перенаправлиене на указанный адресс


### Response.getBody()
Получить тело запроса


### Response.setBody(body)
Установить тело запроса (при вызове функций `send`, `render`, `renderString` и `json` тело запроса перезапишется)


### Response.removeHeader(name)
Удалить заголовок


### Response.setHeader(name, value)
Установить заголовок


### Response.getHeader(name, _default)
Получить заголовок
* `name` - имя заголовка
* `default` - значение по умолчанию если заголовок не найден


### Response.setHeaders(headers)
Заменяет все заголовки на переданные
* `headers` - объект вида ключь значение, где ключом является имя заголовка


### Response.getHeaders()
Получить все заголовки в виде объекта


### Response.setStatus(status)
Установить статус ответа (при вызове функций `send`, `render`, `renderString` и `json` статус ответа будет перезаписан)


### Response.getStatus()
Получить статус ответа


### Response.wait(...promise)
Добавить список ожиданий, запроса не будет прерван пока все ожидания не будут завершены


### Response.then(handler)
Аналогично функции Promise.then


### Response.catch(handler)
Аналогично функции Promise.catch


### Response.promise()
Возвращает объект Promise