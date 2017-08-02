# Logger

### Logger.constructor(prefix = '', level = Logger.code.MESSAGE)
* `prefix` - *String*

### Logger.code() `static` `get`
* `Logger.code.MESSAGE`
* `Logger.code.DEBUG`
* `Logger.code.INFO`
* `Logger.code.WARNING`
* `Logger.code.ERROR`


### Logger.debug(message, ...options)
Возбуждает отладочное сообщение


### Logger.info(message, ...options)
Возбуждает обычное сообщение


### Logger.warning(message, ...options)
Возбуждает предупреждение


### Logger.error(message, ...options)
Возбуждает сообщение об ошибке


---

```javascript
const Logger = require('gap.js/logger');
const log = new Logger('My: ');

log.debug('test'); // My: test
```

Управление отображением сообщений осуществляется при помощи объекта Config

```javascript
const Config = require('gap.js/config');
const Logger = require('gap.js/logger');

Config.set('debug', true);
// Включает отладочную информацию

Config.set('logger', Logger.code.MESSAGE); 
// Выводит только сообщение с данным кодом (info/debug)

Config.set('logger', [Logger.code.WARNING, Logger.code.ERROR]);
// Выводит только сообщения об ошибках и предупреждениях
```