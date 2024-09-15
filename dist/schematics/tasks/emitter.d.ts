type Listener = (...args: any[]) => void;
type EmitterEvents<Events extends string> = 'error' | Events;
export declare class Emitter<Events extends string> {
    private events;
    constructor();
    on(event: EmitterEvents<Events>, listener: Listener, ...args: any[]): this;
    off(event: EmitterEvents<Events>, listener: Listener): this;
    emit(event: EmitterEvents<Events>, ...payload: any[]): boolean;
}
export {};
//# sourceMappingURL=emitter.d.ts.map