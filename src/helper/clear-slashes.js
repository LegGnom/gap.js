/**
 * Удаление слушей в начале и конце строки
 * @param path
 * @returns {string}
 */
module.exports = function clearSlashes(path) {
    return '' + path.toString().replace(/\/$/, '').replace(/^\//, '');
};