export type Listener<T = any> = (...args: T[]) => void;
type EmitterEvents<Events extends string> = 'error' | Events;
export declare class Emitter<Events extends string> {
    private events;
    constructor();
    on<T = any, A = any>(event: EmitterEvents<Events>, listener: Listener<T>, ...args: A[]): this;
    off(event: EmitterEvents<Events>, listener: Listener): this;
    emit(event: EmitterEvents<Events>, ...payload: any[]): boolean;
}
export {};
//# sourceMappingURL=emitter.d.ts.map