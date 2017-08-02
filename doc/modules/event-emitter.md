# EventEmitter

### EventEmitter.on(event_name, handler)
Подписаться на событие
* `event_name` - *String* название события
* `handler` - *Function* обработчик

### EventEmitter.once(event_name, handler)
Устанавливает событие, срабатывает 1 раз
* `event_name` - *String* название события
* `handler` - *Function* обработчик

### EventEmitter.emit(event_name, ...params)
Возбудить событие
* `event_name` - *String* название события
* `params` - список параметров


### EventEmitter.remove_event(event_name, handler)
Удаление события
* `event_name` - *String* название события
* `handler` - *Function* обработчик


```javascript
const EventEmitter = require('gap.js/event-emitter');
const event = new EventEmitter();

event.on('my-event', function(key) {
    console.log(key) // Hello
});

event.emit('my-event', 'Hello');
```


