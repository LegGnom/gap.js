# Config

### Config.delimiter `defult: .`
Разделитель используется в установке получении значения

### Config.get(key, _default)
Получить значение из хранилища по ключу
* `key` - *String* ключ вида `name` чтобы получить вложенный объект используется `delimiter`
* `_default` - если по ключу в хранилище ничего не найдено вернется значение по умолчанию или `undefined`

```javascript
Config.set('user', {
    first_name: 'Tim',
    last_name: 'Towdi'
});

Config.get('user'); // {first_name: 'Tim', last_name: 'Towdi'}
Config.get('user.first_name'); // Tim
Config.get('user.name'); // undefined
Config.get('user.name', 'Tom'); // Tom

Config.set('user.name', 'Tom');
Config.get('user.name', 'Tom'); // Tom
```

### Config.set(key, value)
Установка занчение в хранилище
* `key` - *String* ключ
* `value` - значение


### Config.load(...argv)
Загрузка конфигов в хранилище из файла или объекта.

Форматы:
* js
* json
* yaml

Если файл по указанному пути не найден, ошибка не будет возбуждена.

```javascript
Config.load(
    __dirname + '/config/default.js',
    __dirname + '/config/development.js',
    __dirname + '/config/production.js',
    {
        ...
    }
)
```