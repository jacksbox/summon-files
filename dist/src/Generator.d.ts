import { CommandType, ConfigType, ArgsType, TemplateVariablesType, GeneratorType } from './types';
declare class Generator implements GeneratorType {
    configDir: string;
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
    subTypeMap: any[];
    availableSubTypes: string[];
    constructor(command: CommandType, config: ConfigType);
    parseSubType(s: string): string;
    run(): void;
    getInformation(): string;
    getRoot(): string;
    getSrc(): string;
    getPath(): string;
    getFilePath(): string;
    deriveTemplateVariables(): TemplateVariablesType;
    loadTemplate(filename: string): string;
    renderTemplate(tag: string, templateVars: TemplateVariablesType): void;
    renderTemplates(): void;
}
export = Generator;
