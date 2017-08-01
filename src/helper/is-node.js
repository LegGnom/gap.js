"use strict";

module.exports = new Function("try {return this===global;}catch(e){return false;}");