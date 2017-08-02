const Component = require('../component');
const each = require('../helper/each');


module.exports = {


    /**
     * Вставка html в DOM с последующим поиском компонет
     * @param parent_node
     * @param html_string
     * @param to
     */
    insert(parent_node, html_string, to=false) {
        parent_node.insertAdjacentHTML(to ? 'afterBegin' : 'beforeEnd', html_string);
        Component.load(parent_node);
    },


    /**
     * Получение индекса элемента внутри родителя
     * @param node
     * @returns {Number|number|*}
     */
    index(node) {
        return node ? Array.prototype.slice.call( node.parentNode.children ).indexOf (node) : -1;
    },


    /**
     * Поиск ноды по селектору от текущей ноды вверх, с перебором всех родителей
     * @param node
     * @param selector
     * @returns {*}
     */
    closest(node, selector) {
        let result = null;

        while(node) {
            if (node.matches(selector)) {
                result = node;
                break;
            }

            node = node.parentElement;
        }

        return result;
    },


    /**
     * Удалить обертку (родителя) у элемента
     * @param element
     */
    unwrap(element) {
        each(element.childNodes, child => {
            element.parentNode.insertBefore(child, element);
        });
        element.parentNode.removeChild(element);
    },


    /**
     * Обертка над addEventListener, принимает как одну так и список HTMLElements
     * @param node_list
     * @param event_name
     * @param handler
     */
    on(node_list, event_name, handler) {
        if (node_list instanceof HTMLElement) {
            node_list = [node_list];
        }

        each(node_list, function (node) {
            node.addEventListener(event_name, handler);
        });
    },

    /**
     * Удаление событий
     * @param node_list
     * @param event_name
     * @param handler
     */
    off(node_list, event_name, handler) {
        if (node_list instanceof HTMLElement) {
            node_list = [node_list];
        }

        each(node_list, function (node) {
            node.removeEventListener(event_name, handler);
        });
    }
};