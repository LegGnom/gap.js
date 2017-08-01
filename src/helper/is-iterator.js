module.exports = function isIterator(value) {
    return Object.prototype.toString.call(value) === '[object Iterator]';
};