# Server

Запускаем сервер одной командой 
 
```javascript
const Server = require('mvc/server');

Server.run();
```

Вообщем-то этом все что нужно чтобы ваш сервер на Node.js заработал и стал отвечать на запросы. По умолчанию сервер 
доступен по адресу [http://127.0.0.1:5000/](http://127.0.0.1:5000/)


### Изменение настроек сервера с помощью конфигов 
```javascript
const Server = require('mvc/server');
const Config = require('mvc/config');

Config.set('server.host', 'site.com');
Config.set('server.port', 80);
Config.set('server.protocol', 'https');

Server.run();
```


### Принудительное задание настроек сервера: 
```javascript
const Server = require('mvc/server');

Server.run('site.com', 80, 'https');
```