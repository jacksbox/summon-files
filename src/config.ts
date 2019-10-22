import fs from 'fs'
import { OptionsType, ConfigType, CommandType } from './types'


import { OPTIONS_DIR } from './consts'

const getConfigPath: (configDir: string) => string = configDir => `${process.cwd()}/${configDir}`

export const loadOptions = (command: CommandType): OptionsType => {
  let options = null

  const configDir = command.args.configDir
    ? getConfigPath(command.args.configDir)
    : getConfigPath(OPTIONS_DIR)
  try {
    if (fs.existsSync(configDir)) {
      options = JSON.parse(fs.readFileSync(`${configDir}/config.json`))
      options.configDir = configDir
    } else {
      throw new Error(`No config file found at ${configDir}`)
    }
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', error.message)
    process.exit()
  }
  return options
}

export const deriveConfig = (options: OptionsType, generator: string): ConfigType => {
  const generatorOption = options.types.find(option => option.type === generator)

  const config: ConfigType = {
    configDir: options.configDir,
    root: options.root,
    type: generatorOption.type,
    desc: generatorOption.desc || null,
    src: generatorOption.src,
    subTypes: generatorOption.subTypes || [],
    files: generatorOption.files,
    tags: generatorOption.defaultTags || [],
    vars: generatorOption.defaultVars || []
  }

  return config
}
