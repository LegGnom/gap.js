# DOM

### dom.insert(parent_node, html_string, to=false)
Вставка html в DOM с последующим поиском компонет

### dom.index(node)
Получение индекса элемента внутри родителя

### dom.closest(node, selector)
Поиск ноды по селектору от текущей ноды вверх, с перебором всех родителей

### dom.unwrap(element)
Удалить обертку (родителя) у элемента

### dom.on(node_list, event_name, handler)
Обертка над addEventListener, принимает как одну так и список HTMLElements

### dom.off(node_list, event_name, handler)
Удаление событий