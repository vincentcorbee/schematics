"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
class Emitter {
    events;
    constructor() {
        this.events = {};
    }
    on(event, listener, ...args) {
        const { events } = this;
        if (typeof listener !== 'function')
            throw new TypeError(listener + ' is not a function');
        if (events[event] === undefined) {
            events[event] = [[listener, args]];
        }
        else if (events[event]?.every(([fn]) => fn !== listener)) {
            events[event]?.push([listener, args]);
        }
        return this;
    }
    off(event, listener) {
        const { events } = this;
        if (events[event]) {
            events[event] = events[event]?.filter(([fn]) => fn !== listener);
        }
        return this;
    }
    emit(event, ...payload) {
        const { events } = this;
        if (events[event]) {
            events[event]?.forEach(([listener, args = []]) => {
                try {
                    listener.apply(this, [...payload, ...args]);
                }
                catch (error) {
                    if (events.error && events.error.length > 0) {
                        events.error.forEach(([listener]) => listener.apply(this, [error]));
                    }
                    else {
                        throw error;
                    }
                }
            });
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map