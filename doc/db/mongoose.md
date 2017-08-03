# Mongoose

Выбираем Mongoose в качестве базы данных для нашего приложения


```javascript
const Server = require('gap.js/server/index');
const Router = require('gap.js/router');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my-db');
const db = mongoose.connection;


// Переопределяем промисы в библиотеке на стандартные
// Это понадобится для нормальной работы ожиданий в объектах Response
mongoose.Promise = global.Promise;


db.on('error', console.error.bind(console, 'connection error:'));


const UserModel = mongoose.model('user', {
    name: String
});


new UserModel({name: "Tim"}).save()


Router.any('/', function *(request, response) {
 
    let users = yield UserModel.find({})
    response.json(users);
   
});


Server.run();
```

