# View

    Работает только на сервере

### View.render(template, context)
Рендер шаблона
* `template` - *String|Module* путь до шаблона или require html шаблона
* `context` - *Object* контекст

### View.renderString(template_string, context)
В отличие от функции `render` обрабатывает строку 
```javascript
const view = new View();
view.renderString('<h1>{{ name }}</h1>', {
    name: 'Tim'
}); // <h1>Tim</h1>
```