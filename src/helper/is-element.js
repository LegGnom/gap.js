/**
 * Проверка на HTMLElement
 * @param element
 * @returns {boolean}
 */
module.exports = function isElement(element) {
    try {
        return element instanceof HTMLElement;
    }
    catch(e){
        return (typeof element === "object") &&
               (element.nodeType === 1) &&
               (typeof element.style === "object") &&
               (typeof element.ownerDocument === "object");
    }
};