const parseCommand = require('./cli')
const { loadOptions, deriveConfig } = require('./config')
const Generator = require('./Generator')

const { USAGE_OUTPUT } = require('./consts')

import {
  CommandType,
  ConfigType,
  GeneratorType,
  OptionsType
} from './types'

const listGenerators = options =>
`Available generator Types [available subTypes]:
${options.types.map(t => {
  const subTypesStr = t.subTypes ? `\n    [${t.subTypes.map(t => {
    if(Array.isArray(t)) {
      return t[0]
    }
    return t
  }).join('|')}]` : ''
  return `  ${t.type}${subTypesStr}`
}).join('\n')}
`

const summon = (): boolean => {
  const command: CommandType = parseCommand()
  const options: OptionsType = loadOptions(command)

  if (command.args.listGenerators) {
    console.log(listGenerators(options))
    process.exit()
  }

  if (!options.types.find(t => t.type === command.generator)) {
    const output: string = `type '${command.generator}' does not exist`
    console.log('\x1b[31mError:\x1b[0m %s\n', output)
    console.log(USAGE_OUTPUT)
    process.exit()
  }

  const config: ConfigType = deriveConfig(options, command.generator)
  const generator: GeneratorType = new Generator(command, config)

  if (command.args.printInformation) {
    console.log(generator.getInformation())
    process.exit()
  }

  generator.run()
  return true
}

export = summon