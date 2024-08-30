import { EnvironmentInterface } from "./types";
export declare class Environment implements EnvironmentInterface {
    parent: Environment | null;
    private variables;
    constructor(parent?: Environment | null, variables?: Map<any, any>);
    get(key: string): any;
    set(key: string, value: any): void;
}
//# sourceMappingURL=environment.d.ts.map