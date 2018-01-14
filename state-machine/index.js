'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('../event-emitter');

var STATE = Symbol('state');
var CHANGE_STATE_EVENT = Symbol('change state event');

module.exports = function (_EventEmitter) {
    _inherits(StateMachine, _EventEmitter);

    function StateMachine(state) {
        _classCallCheck(this, StateMachine);

        var _this = _possibleConstructorReturn(this, (StateMachine.__proto__ || Object.getPrototypeOf(StateMachine)).call(this));

        _this[STATE] = state;
        return _this;
    }

    _createClass(StateMachine, [{
        key: 'action',
        value: function action(handler) {
            this.on(CHANGE_STATE_EVENT, function (new_state, old_state, chunk) {
                handler(new_state, chunk, old_state);
            });

            return this;
        }
    }, {
        key: 'changeState',
        value: function changeState(state) {
            var new_state = Object.assign({}, this[STATE], state);
            this.emit(CHANGE_STATE_EVENT, new_state, this[STATE], state);
            this[STATE] = new_state;
            return this;
        }
    }, {
        key: 'state',
        get: function get() {
            return this[STATE];
        }
    }], [{
        key: 'create',
        value: function create(state, handler) {
            var state_instance = new StateMachine(state);

            if (handler) {
                handler.apply(state_instance);
            }

            return state_instance;
        }
    }]);

    return StateMachine;
}(EventEmitter);