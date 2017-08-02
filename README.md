###  


Isomorphic MVC framework for developing Web applications built on OOP patterns

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Appveyor][appveyor-image]][appveyor-url]
[![Coveralls][coveralls-image]][coveralls-url]

### Example
```javascript
const Server = require('gap.js/server');
const Router = require('gap.js/router');

Router.get('/', function(req, res) {
    res.send('Hello world');  
});

Server.run();
```

### Installation
```bash
npm install gap.js --save
```


### Features
* Robust routing
* HTTP helpers (redirection, caching, etc)
* Executable for generating applications quickly

### Docs
[Документация](/doc/)