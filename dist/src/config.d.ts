import { OptionsType, ConfigType, CommandType } from './types';
export declare const loadOptions: (command: CommandType) => OptionsType;
export declare const deriveConfig: (options: OptionsType, generator: string) => ConfigType;
