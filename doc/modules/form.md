# Form

### Form.create(fields_object)
Создание формы 
* `fields_object` - *Object* объект формы

### Form.field
Список типов 
* `Form.field.STRING`
* `Form.field.NUMBER`
* `Form.field.BOOLEAN`
* `Form.field.DATE`

### Form.validator
Список валидаторов
* `Form.validator.EMAIL`
* `Form.validator.MIN(value)`
* `Form.validator.MAX(value)`
* `Form.validator.EQUAL(value)`
* `Form.validator.REQUIRED`
* `Form.validator.NUMERIC`


```javascript
const Form = require('gap.js/form');
const field = Form.field;
const validator = Form.validator;


module.exports = Form.create({
    email: field.STRING({
        validators: [
            validator.REQUIRED,
            validator.EMAIL
        ]
    }),
    password: field.STRING({
        validators: [
            validator.REQUIRED
        ]
    }),
});
```