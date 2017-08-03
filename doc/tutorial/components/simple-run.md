# Определение компоненты из шаблона

Для более гибкого управления компонентой в шаблонизаторе [nunjucks](https://mozilla.github.io/nunjucks/) 
мы предусмотрели глобальную функцию `run` 


```javascript
// phone.js

const Component = require('gap.js/component');
const dom = require('gap.js/dom');

module.exports = Component.create('Phone', class extends Component {
    constructor(node) {
        super(node);
        
        dom.on(node, 'input', function(event) {
            console.log(node.value);          
        });
    }
});
```


```jinja

<input/>
{{ run('Phone') | safe }}
```


Это удобно кода у компоненты нет жесткой привезки к имени класса и в компоненту необходимо 
передавать параметры из шаблона. Например:

```javascript
// phone.js

const Component = require('gap.js/component');
const dom = require('gap.js/dom');

const VALIDATORS = {
    phone: function (value) {
        return /^\d{10}$/.test(value)
    }
};

module.exports = Component.create('Validate', class extends Component {
    constructor(node, type='') {
        super(node);
        
        let validator = VALIDATORS[type.toLowerCase()];
        
        dom.on(node, 'input', function(event) {
            if (validator && !validator(node.value)) {
                console.log('Error validate');
            }
        });
    }
});
```

```jinja

<input/>
{{ run('Phone') | safe }}
{{ run('Validate', [ 'phone' ]) | safe }}
```

> Обратите внимание что на код выше, обе функции `run` привяжутся к инпуту.

---

Назад: [Простая компонента](simple.md)

Далее: [Вложенные компоненты их события](inner-and-events.md)