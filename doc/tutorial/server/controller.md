# Контроллеры для обработки запросов

Модуль `Controller` расширяет возможности обработки запросов и позволяет внедрить наследование.

```javascript
// index.js

const Server = require('gap.js/server');
const Router = require('gap.js/router');

require('./routes');

Server.run();
```

```javascript
// routes.js

const Router = require('gap.js/router');
const Controller = require('gap.js/controller');

Router.any('/', class extends Controller {
    get() {
        this.render('./view.html');
    }
    
    post(req) {
        let email = req.form.get('email');
        let password = req.form.get('password');
        
        this.render('./view.html', {
            auth: email && password
        });
    }
});
```

```jinja
// view.html
<!DOCTYPE>
<html>
    <head>
    </head>
    <body>
        {% if auth %}
            <h1>Your auth</h1>
        {% else %}
            <form metgod="POST">
                <input name="email" placeholder="Your email"/>
                <input name="password" placeholder="Your password"/>
                <button type="submit">send</button>
            </form>
        {% endif %}
    </body>
</html>
```

> Здесь стоит обратить внимание на две вещи:
> * Чтобы в контроллере работали все методы `get`, `post`, `put` итд, в роутере необходимо выбрать
метод `any`
> * На сервере в метод рендер можно передавать не только модули (require('./view.html')) но и пути до
шаблона, если вы не планируете использовать клиентский рендеринг контроллеров, это наиболее простой 
и удобный способ указать приложение какой файл необходимо отрендерить.

В этом небольшом примере мы создали страницу с формой, по сабмиту которой мы отправляем POST запрос 
на сервер.

Если поля формы были заполнены, вместо формы на странице появится текст `<h1>Your auth</h1>`

---
Назад: [Быстрый старт](fast-start.md)

Далее: [Отправляем куки, делаем авторизацию](cookie-and-auth.md)