# Простая компонента 

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
    
    // Статичный метод query должен вернуть строку поиска формата query string
    static query() {
        return '.phone'
    }
});
```


```jinja
// view.html

<input class="phone"/>
```


```javascript
// client.js

const Client = require('gap.js/client');

require('./phone.js');

Client.run();
```


---


Это простой пример определения компоненты и поиска ее в DOM по средствам `Query string`

Для более гибкой работы с компонентами, определения их в DOM дереве и передачи параметров из шаблона 
внутрь конструктора можно воспользоваться функцией `run` в шаблонизаторе.


---

Далее: [Определение компоненты из шаблона](simple-run.md)