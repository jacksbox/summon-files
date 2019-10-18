export interface ArgsType {
    subType?: string;
    printInformation?: boolean;
    listGenerators?: boolean;
    force?: boolean;
    configDir?: string;
}
export interface CommandType {
    generator: string;
    name: string;
    args: ArgsType;
}
export interface TypeType {
    type: string;
    desc?: string;
    src?: string;
    defaultTags?: string[];
    defaultVars?: {};
    subTypes?: string[][];
    files: any[];
}
export interface OptionsType {
    root?: string;
    types: TypeType[];
    configDir: string;
}
export interface ConfigType {
    configDir: string;
    root: string;
    type: string;
    desc: string;
    src: string;
    subTypes: string[][];
    files: any[];
    tags: string[];
    vars: {};
}
export declare type StringModifyerType = (string: any) => string;
export declare type renderType = (templateVars: TemplateVariablesType) => string;
export interface TemplateVariablesType {
    name: string;
    name_lower: string;
    name_upper: string;
    name_lcFirst: string;
    name_ucFirst: string;
    path: string;
    subType: string;
    [key: string]: string;
}
export interface GeneratorType {
    name: string;
    type: string;
    desc: string;
    args: ArgsType;
    root: string;
    src: string;
    files: any[];
    tags: string[];
    vars: any;
    subType: string;
    subTypeMap: string[][];
    availableSubTypes: string[];
    parseSubType: (s: string) => string;
    run: () => void;
    getInformation: () => string;
    getRoot: () => string;
    getSrc: () => string;
    getPath: () => string;
    getFilePath: () => string;
    deriveTemplateVariables: () => TemplateVariablesType;
    loadTemplate: (filename: string) => string;
    renderTemplate: (tag: string, templateVars: TemplateVariablesType) => void;
    renderTemplates: () => void;
}
