import { OptionsType, ConfigType, CommandType } from './types';
declare const _default: {
    loadOptions: (command: CommandType) => OptionsType;
    deriveConfig: (options: OptionsType, generator: string) => ConfigType;
};
export = _default;
