# Быстрый старт

```javascript
const Server = require('gap.js/server');
const Router = require('gap.js/router');

Router.get('/', function(req, res) {
    res.send('Hello world');
});

Server.run();
```

Выше мы написали минимальное серверное приложение, и подняли сервер Node.js. 
По умолчанию сервер стартует на `5000` порте и страница будет доступна по адрессу
[http://127.0.0.1:5000/]()

Модуль `Router` отвечает за обработку урлов и вызов обработчеков


--- 
Далее: [Контроллеры для обработки запросов](tutorial/server/controller.md)