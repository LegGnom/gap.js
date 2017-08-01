module.exports = function isClass(value) {
    return value.toString().split('\n').shift().includes('class ');
};