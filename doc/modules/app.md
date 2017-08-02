# App

### App.addComponent(name, _class)
Добавить компоненту в общий стек
* `name` - *String* название компонеты
* `_class` - *Class* класс компоненты

### App.getComponents()
Получить список компонент, возвращает объект вида key: value, 
где `key` это название компоненты, `value` класс компоненты

### App.getComponent(name)
Возвращает класс компоненты по его имени

### App.removeComponent(name)
Удоляет компоненту из общего списка

### App.getTemplateEngine()
Возвращает `engine` шаблонизатора

### App.setTemplateEngine(engine)
Устанавливает `engine`