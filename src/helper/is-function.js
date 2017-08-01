module.exports = function isFunction(value) {
    return value ? [
        '[object Function]',
        '[object GeneratorFunction]'
    ].includes(Object.prototype.toString.call(value)) : false;
};
