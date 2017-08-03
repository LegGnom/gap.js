# Component

### Component.constructor(node)
При создании конструктора первым аргументов система всегда передает 
*HTMLElement* к которому относится компонента

### Component.render(template, context, node=null)
Создает HTMLString из переданного шаблона
* `template` - *Template* шаблон
* `context` - *Object* контекст
* `node` - *HTMLElement* - ссылка на DOM элемент в котором будет заменен контент

```javascript
this.render(
    require('/path/to/template'),
    { name: '' },
    document.getElementById('id')
)
```


### Component.getParents(name)
Получить список родительских компонент по имени 

### Component.getParent(name)
Получить родительскую компоненту по имени

### Component.getChildrens(name)
Получить список потомков по имени, дочерние компоненты доступны только в методе onReady

```javascript
Component.create('MyComponent', class extends Comment {
    constructor(node) {
        super(node);
    }
    
    onReady() {
        let childCompoents = this.getChildrens('chile');
        ...
    }
})
```

### Component.getChildren(name)
Аналогично `getChildrens`, но возвращает первый сомпонент с соответствующим именем


### Component.on(event_name, handler)
Подписыться на событие компонент
* `event_name` - *String* название события
* `handler` - *Function* обработчик события

### Component.once(event_name, handler)
Аналогично `on`, но срабатывает только один раз


### Component.emit(event_name, ...params)
Возбудить событие компоненты (не DOMEvents)
* `event_name` - *String* название события
* `params` - деструкторизованный список параметров передаваемый в событие


### Component.removeEvent(event_name, handler)
Удаление события с компоненты


### Component.wait(...promise)
Добавляет в ожидание список промисов
* `promise` - Деструкторизованный список промисов


### Component.then(handler)
Переданный обработчик вызывается после того как все ожидания переданные в `wait` будут завершены


### Component.catch(handler)
Переданный обработчик вызывается в случае если одно из ожиданий возбудило ошибку


### Component.finally(handler)
Запускает механиз ожиданий


### Component.promise() `get`
Возвращет ссылку на `Promise.all` в который будет добавлены все ожидания переданные в метод `wait`.
Также как и `finally` запускает обработку ожиданий


### Component.create(name, _class) `static`
Создание компоненты
* `name` - *String* название компоненты
* `_class` - *Class* класс компоненты


### Component.load(parent=document.body) `static`
Загружает компоненты на странице или внутри определенного DOM элемента