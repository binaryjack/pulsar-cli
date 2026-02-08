/**
 * Generate Command Type Definitions
 */
/**
 * Generator types
 */
export declare const GeneratorType: {
    readonly COMPONENT: "component";
    readonly STORE: "store";
    readonly RESOURCE: "resource";
    readonly ROUTE: "route";
    readonly HOOK: "hook";
    readonly CONTEXT: "context";
};
export type GeneratorTypeType = typeof GeneratorType[keyof typeof GeneratorType];
/**
 * Generate command options
 */
export interface IGenerateCommandOptions {
    path?: string;
    typescript?: boolean;
    test?: boolean;
}
//# sourceMappingURL=generate-command.types.d.ts.map