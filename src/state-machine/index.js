const EventEmitter = require('../event-emitter');

const STATE = Symbol('state');
const CHANGE_STATE_EVENT = Symbol('change state event');


module.exports = class StateMachine extends EventEmitter {
    constructor(state) {
        super();

        this[STATE] = state;
    }


    get state() {
        return this[STATE];
    }

    action(handler) {
        this.on(CHANGE_STATE_EVENT, function (new_state, old_state, chunk) {
            handler(new_state, chunk, old_state);
        });

        return this;
    }

    changeState(state) {
        const new_state = Object.assign({}, this[STATE], state);
        this.emit(CHANGE_STATE_EVENT, new_state, this[STATE], state);
        this[STATE] = new_state;
        return this;
    }

    static create(state, handler) {
        const state_instance = new StateMachine(state);

        if (handler) {
            handler.apply(state_instance);
        }

        return state_instance;
    }
};