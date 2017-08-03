# Sequelize

Выбираем Sequelize в качестве базы данных для нашего приложения

```javascript
const Server = require('gap.js/server/index');
const Router = require('gap.js/router');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});


Router.any('/', function *(request, response) {
    let users = yield user.findAll();
    
    response.json(users);
}); 
```
