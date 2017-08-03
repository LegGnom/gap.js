# Вложенные компоненты их события 

Компоненты на странице выстраиваются в цепочки для облегчения общения между ними.

```jinja
<div>
    {{ run ('A') | safe }}
    ...
    
    <div>
        {{ run ('B') | safe }}
        
    </div>
</div>
```


Например в примере выше компонента **B** вложена в компоненту **A**. Вложенность определяется структорой DOM и позицией 
HTMLElement в нем.

У компонет имеются свои события, которые умеют всплывать по цепочки вверх, вплоть до объект 
[Client](../../modules/client.md), это делает возможным обмен сообщениями между комопонентами как в примере ниже:

```jinja
<div>
    {{ run('Filter') | safe }}
    
    
    <input type="checkbox"/>
    {{ run('FilterCheckbox') | safe }}
    
    
    <button disabled="disabled">Применить</button>
</div>
```


```javascript
module.exports = Component.create('Filter', class extends Component {
    constructor(node, type='') {
        super(node);
        
        let button = node.querySelector('button');
        
        this.on('cahnge', (event, state) => {
            if (state) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
            }
        });
    }
});
```

```javascript
const dom = require('gap.js/dom');
module.exports = Component.create('FilterCheckbox', class extends Component {
    constructor(node, type='') {
        super(node);
        
        dom.on(node, 'change', event => {
            this.emit('change', node.checked);            
        });
    }
});
```

Это простой пример отправки сообщений вверх (аналог всплытия событий в `DOM Events`). 
Пройдя по всем компонентам в стеке, событие всплывет в модуль `Client` и завершится. 

Если вы заметили первым аргуметом в обработчике события стоит event, это системный объэект с помощью которого можно 
получить ссылку на компонету возбудившую событие (первая компонента в стеке) `event.target` и остановить всплытие, 
вызвазв методо `event.stop()`.

##### AJAX отправка формы и отлавливание соботия в `Client`

Разберем небольшой пример как отлавливать собтие всплывшее до объекта `Client`, это даст нам большую гибкость в работе 
над приложением и возможность прерывать к примеру перезагрузку страницы

```javascript
const Component = require('gap.js/component');
const Request = require('gap.js/request');
const Client = require('gap.js/client');
const dom = require('gap.js/dom');


module.exports = Component.create('AjaxForm', class extends Component {
    constructor(node) {
        super(node);
        
        dom.on(node, 'submit', this.submit.bind(this));
        
        Client.on('AjaxForm.submit', event => {
            if (event.target === this) {
                window.location.reload();
            }
        });
    }
    
    
    submit(event) {
        let form = new FormData(this.node);
        let method = this.node.getAttribute('method') || 'GET';
        let action = this.node.getAttribute('action') || window.location.pathname;
        
        event.preventDefault();
        
        Request[method.toLowerCase()](action, form).then(response => {
            this.emit('AjaxForm.submit', response);
        }).catch(console.error);
    }
});
```


```javascript
const Component = require('gap.js/component');


module.exports = Component.create('Filter', class extends Component {
    constructor(node) {
        super(node);
        
        this.on('AjaxForm.submit', event => {
            event.stop();
            
            node.innerHTML = "<h1>Success</h1>";
        });
    }
});
```

```jinja
<div>
    {{ run('Filter') | safe }}
    
    <form action="/path/">
        {{ run('AjaxForm') | safe }}
        <input/>
        <button type="submit">send</button>
    </form>
</div>
```


По итогу, форма будет отправленна на указанный адресс, но перезагрузка страници не произойдет, так как событие 
перехватывается и останавливается всплытие в компоненте **Filter**. Вместо этого форма будет удалена со страници, 
а на ее месте отрисуется текст `<h1>Success</h1>`.

> В примере выше мы обратились к переменной `this.node` но нигде ее не определили. Это не ошибка, при создании 
компоненты, это та самая пременная переданная в `super(node)`.


---

Назад: [Определение компоненты из шаблона](simple-run.md)

Далее: [Работа с потомками/родителями у компонент](parent-childes.md) 
 


