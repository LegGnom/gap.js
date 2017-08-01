module.exports = function isNode() {
    try {
        return this === global;
    } catch(e) {
        return false;
    }
};