# Работа с потомками/родителями у компонент

События это конечно очень мощьный и гибкий инструмент, но не всегда хватает его возможностей при проектировании 
сложных систем. 

В некторых случаях вам может понадобится обратится к родителю или потомку напрямую и вызвать у него метод.


```javascript
module.exports = Component.create('Phone', class extends Component {
    constructor(node) {
        super(node);
    }
    
    getValue() {
        return this.node.value;
    }
    
    setValue(value) {
        this.node.value = value;
    }
});
``` 

```javascript
module.exports = Component.create('Filter', class extends Component {
    constructor(node) {
        super(node);
    }
    
    onReady() {
        let phone = this.getChildren('Phone');
        
        if (phone) {
            phone.setValue('+7 999 888-77-66');
        }
    }
});
```

```jinja
<div>
    {{ run('Filter') | safe }}

    <input/>
    {{ run('Phone') | safe }}
</div>
```

В примере выше мы использовали метод `this.getChildren`, при помощи которого обратились к потомку и вызвали метод
`setValue`. Метод `this.getChildren` возвращает первого найденого потомка или **undefined**.
 
Но здесь есть одна тонкость, этот метод сработает правильно только если он будет вызван после отрисовки всего DOM и
срабатывание всех конструкторов компонент. Такого эффекта можно добится например при помощи setTimeout(handler, 0) 
или воспользовавшись функцией `onReady` у компоненты.  

Метод `onReady` вызывается после того как все компоненты будут созданы и все запросы добавленные в `this.wait` 
будут обработанны [подробнее про методы компоненты](../../modules/component.md).


У компоненты есть ряд методов для работы с родителями/потомками:

* `getChildren(name)` - получение первого потомка по ключу
* `getChildrens(name)` - получение списка потомков по ключи (если ключ не задан, вернет вообще всех потомков)
* `getParent(name)` - получение первого родителя по ключу 
* `getParents(name)` - получение всех продителей по ключу (аналогично `getChildrens(name)`, если ключ не задан 
вернет всех родителей)

> Методы `getParent` и `getParents` работают корректно и без `onReady` или обертывания в setTimeout


--- 
Назад: [Вложенные компоненты их события](inner-and-events.md)

Далее: [Ожидание запросов](request-wait.md)