Isomorphic MVC framework for developing Web applications built on OOP patterns


## Example
```javascript
const Server = require('gap.js/server');
const Router = require('gap.js/router');

Router.get('/', function(req, res) {
    res.send('Hello world');  
});

Server.run();
```

## Installation
```bash
npm install gap.js --save
```


## Features
* Robust routing
* HTTP helpers (redirection, caching, etc)
* Executable for generating applications quickly

## Docs
[Docs](/doc/)


## License
[MIT](LICENSE)
