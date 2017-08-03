# Ожидание запросов

Не редко бывает необходимо отрендеить компоненту после отправки и получения какого либо запроса. Для этих целей 
компоненты исполь зуют модель [Wait](../../modules/wait.md)

Допустим у нас есть апи на сервере `/api/user/` возвращающее на GET запрос следующий JSON обеъект
```json
{
  "user": {
    "name": "Tim",
    "age": 19
  }
}
``` 

И мы хотим его вывести в отдельном блоке, запросив данные после загрузки страницы.


```javascript
const Component = require('gap.js/component');
const Request = require('gap.js/request');


module.exports = Component.create('UserView', class extends Component {
    constructor(node) {
        super(node);
        
        
        this.wait(
            Request.get('/api/user/')
        );
    }
    
    
    onReady(response) {
        this.render(require('./user.html'), response.shift(), this.node);
    }
});
```


```jinja
// user.html 

<div>
    <h1>{{ user.name }} <small>{{ user.age }}</small></h1>
</div>
```


```jinja
<div>
    {{ run('UserView') | safe }}
</div>
```

После загрузки страницы, отправится запрос на сервер, компонента дождется возвращения результата и после этого 
заменит содержимое `DIV` элемента в котором была вызвана на новый шаблон из `user.html`


---

Назад: [Работа с потомками/родителями у компонент](parent-childes.md)