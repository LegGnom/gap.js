# Helper

### helper.attachEvent(node_list, event_name, handler) `deprecated`
Обертка над addEventListener, принимает как одну так и список HTMLElements


### helper.clearSlashes(path)
Удаление слешей в начале и конце строки


### helper.DataForm
Аналог FormDate
В конструктор принимает HTMLElement, поддерживает методы
* `append(name, value)` - добавление значения в форму
* `delete(name)` - удаление значения из формы
* `get(name)` - получение значения по имени из формы
* `set(name, value)` - установка значения в форму, аналог append
* `has(name)` - проверка существования значения в форме
* `getAll()` - получение списка всех значений формы, массив формата `[{name: ..., value: ...}]`
* `make()` - возврящает объект FormDate


### helper.dictToQueryString(dict, prefix)
Преоразует объект в `query string`

```javascript
const helper = require('gap.js/helper');

helper.dictToQueryString({
    name: "Tom",
    age: 19
}); 
// name=Tom&age=19
```

### helper.dictToStringJSON(data)
Аналог JSON.stringify с подавление ошибки


### helper.each(list, handler)
Аналог forEach, поддерживает как обычные массивы так и `NodeList` и итераторы


### helper.execGenerator(generator, yieldValue)
Обработка функций генераторов, вызывает все yield


### helper.generatePassword(password)
Генерация пароля (секретный ключь берется из Config.get('secret'))


### helper.getComponent(node, component_name=false)
Получение компоненты из HTMLElement


### helper.isArray(value)
Промерка значение на Array


### helper.isClass(value)
Промерка значение на Class


### helper.isElement(value)
Промерка значение на HTMLElement


### helper.isFunction(value)
Промерка значение на Function


### helper.isIterator(value)
Промерка значение на Iterator


### helper.isNode()
Возвращяет True если код исполняется на сервере


### helper.isNumber(value) 
Промерка значение на Number


### helper.isObject(value)
Промерка значение на Object

### helper.isString(value)
Промерка значение на String


### helper.parseQueryString(query_string)
Преобразует query string в Object
```javascript
const helper = require('gap.js/helper');

helper.parseQueryString('name=Tom&age=19'); // {name: 'Tom', age: 19}
```


### helper.removeEvent(node_list, event_name, handler) `deprecated`
Удаление событий


### helper.resolvePath(...uri_list)
Возвращает путь относительно текущего корня приложения


### helper.toJSON(string)
Аналог JSON.parse, если строка не валидна вернет пустой объект


### helper.unique(length=6)
Возвращяет уникальный ключ