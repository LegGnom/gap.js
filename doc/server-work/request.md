# Request
Работа с запросом


### Request.method
Возвращает метод запроса

### Request.url
Возвращает url запроса

### Request.headers
Возвращает заголовки запроса в виде объекта

### Request.params
Возвращает объект [RequestCollection](./request-collection.md)

Если в Router было передано строковое определение пути переменные будт доступны через функцию get()
```javascript
Router.get('/<name>/', function(request){
    let name = request.params.get('name');
    // ...
});
```
 
Если определение пути было задано с помощью регулярных выражений в массив обработанный функцией 
[match](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/match) будет доступен как
 ```javascript
 Router.get(/^(.+)/, function(request){
     let params = request.params.source;
     // ...
 });
 ```
> Методы get и getList будут всегда возвращать значение по умолчанию или `undefiend`


### Request.query
Возращает GET параметры следующие после знака `?` в виде объекта [RequestCollection](./request-collection.md)

### Request.form
Возвращает данные переданные в теле запроса (например методом POST) в виде оъекта [RequestCollection](./request-collection.md)

### Request.files
Возвращает файлы в виде оъекта [RequestCollection](./request-collection.md)

### Request.bodyLength
Возвращает размер переданных данных в теле запроса

### Request.create(http_request=null, fields=null, files=null, params=null)
Создает новый объект Request из текущего 
```javascript
const Router = require('mvc/router');
Router.get('/', function(request, response) {
    
    let new_request = request.create(null, null. null, {
        key: 1
    });
    
    new_request.params // {key: 1}
    
    // ...
});
```