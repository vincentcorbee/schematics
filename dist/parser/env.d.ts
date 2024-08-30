export declare class Env {
    private data;
    parent: Env | null;
    constructor(data?: Map<any, any>, parent?: Env | null);
    get(key: string): any;
    set(key: string, value: any): void;
}
//# sourceMappingURL=env.d.ts.map