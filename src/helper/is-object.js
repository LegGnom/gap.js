module.exports = function isObject(value) {
    return value ? Object.prototype.toString.call(value) === '[object Object]' : false;
};
