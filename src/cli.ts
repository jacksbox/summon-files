const minimist = require('minimist')

const { USAGE_OUTPUT } = require('./consts')

import { CommandType, ArgsType } from './types'

const parseArguments = (argv): ArgsType =>
{
  const args: ArgsType = {}
  args.subType = argv.s || null
  args.printInformation = argv.i || null
  args.listGenerators = argv.l || null
  args.force = argv.f || null
  return args
}

const parseCommand = (): CommandType => {
  const argv = minimist(process.argv.slice(2))

  if (argv._.length === 1 && argv._[0] === 'help') {
    console.log(USAGE_OUTPUT)
    process.exit()
  }

  let typoInformationCommand = false
  if (argv.i) {
    typoInformationCommand = true
  }
  let listGeneratorsCommand = false
  if (argv.l) {
    listGeneratorsCommand = true
  }

  if (argv._.length !== 2 && !typoInformationCommand && !listGeneratorsCommand) {
    const output: string = `wrong number of arguments`
    console.log('\x1b[31mError:\x1b[0m %s\n', output)
    console.log(USAGE_OUTPUT)
    process.exit()
  }

  const command: CommandType = {
    generator: argv._[0],
    name: argv._[1] || '',
    args: parseArguments(argv)
  }

  return command
}

export = parseCommand
