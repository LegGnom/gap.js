module.exports = function isIterator(value) {
    return ['[object Iterator]', '[object Map]'].includes(Object.prototype.toString.call(value));
};