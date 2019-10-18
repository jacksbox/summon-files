const fs = require('fs')

const { OPTIONS_DIR } = require('./consts')

import { OptionsType, ConfigType } from './types'

const BASE_CONFIG_PATH: string = `${process.cwd()}${OPTIONS_DIR}/config.json`

const loadOptions = (): OptionsType => {
  let options = null
  try {
    if (fs.existsSync(BASE_CONFIG_PATH)) {
      options = JSON.parse(fs.readFileSync(BASE_CONFIG_PATH))
    } else {
        throw new Error(`No config file found at ${BASE_CONFIG_PATH}`)
    }
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', error.message)
    process.exit()
  }
  return options
}

const deriveConfig = (options: OptionsType, generator: string): ConfigType => {
    const generatorOption = options.types.find(option => option.type === generator)

    const config: ConfigType = {
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

export = { loadOptions, deriveConfig }
