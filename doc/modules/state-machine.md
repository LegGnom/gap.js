# StateMachine
Работа со стейтом, наследуется от EventEmitter


### StateMachine.constructor(state)
* `state` - *String* хост на котором стартует сервер (поумолчанию 127.0.0.1)
* `port` - *Number* порт (поумолчанию 5000)
* `protocol` - *String* протокол (поумолчанию http)


### StateMachine.state
Возвращает `state` объекта


### StateMachine.action(handler)
Устанавливает обработчик изменений объекта

* `handler(new_state, chunk, old_state)` - *Function*


### StateMachine.changeState(state)
Изменение стейта

* `state` - *Object*


### StateMachine.create(state, handler)
Создание нового стейта

* `state` - *Object*
* `handler(state_instance)` - *Function*
