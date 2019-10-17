const fs = require('fs')
const handlebars = require('handlebars')
const helpers = require('handlebars-helpers')
const mkdirp = require('mkdirp');

const { OPTIONS_DIR } = require('./consts')

helpers()

const {
  lc,
  uc,
  lcFirst,
  ucFirst
} = require('./utils')

import {
  CommandType,
  ConfigType,
  ArgsType,
  TemplateVariablesType,
  GeneratorType,
  renderType
} from './types'

const getInformationString = (type: string, desc: string, availableSubTypes: string[]): string =>
`type    \t${type}${desc ? `\n\t\t${desc}` : ''}
subTypes \t${availableSubTypes.length > 0 ? availableSubTypes.join('|') : 'none'}
`

class Generator implements GeneratorType{
  name: string
  type: string
  desc: string
  args: ArgsType

  root: string = ''
  src: string = ''
  files: any[]
  tags: string[] = []
  vars: any = {}

  subType: string = null
  subTypeMap: string[][]
  availableSubTypes: string[]

  constructor(command: CommandType, config: ConfigType) {
    this.name = command.name
    this.args = command.args

    this.type = config.type
    this.desc = config.desc

    this.root = config.root
    this.src = config.src
    this.files = config.files
    this.tags = config.tags
    this.vars = config.vars

    this.subTypeMap = config.subTypes
    this.availableSubTypes = config.subTypes.map(list => list[0])
    this.subType = this.parseSubType(command.args.subType)
  }

  parseSubType(s: string): string {
    if (!s) {
      return null
    }

    try {
      const subType = this.subTypeMap.find(type => type.includes(s))[0]
      return subType
    } catch(err) {
      throw new Error(`-s must be one of ${this.availableSubTypes.join('|')} instead got ${s}`)
    }
  }

  run(): void {
    this.renderTemplates()
  }

  getInformation(): string {
    return getInformationString(this.type, this.desc, this.availableSubTypes)
  }

  getRoot(): string {
    return this.root ? `${this.root}/` : ''
  }

  getSrc(): string {
    return this.src ? `${this.src}/` : ''
  }

  getSubTypePath(): string {
    return this.subType ? `${this.subType}/` : ''
  }

  getPath(): string {
    return `${this.getSrc()}${this.getSubTypePath()}${this.name}`
  }

  getFilePath(): string {
    return `/${this.getRoot()}${this.getPath()}`
  }

  deriveTemplateVariables(): TemplateVariablesType {
    return {
      name: this.name,
      name_lower: lc(this.name),
      name_upper: uc(this.name),
      name_lcFirst: lcFirst(this.name),
      name_ucFirst: ucFirst(this.name),
      path: this.getFilePath(),
      type: this.type,
      subType: this.subType,
      tags: this.tags,
      ...this.vars
    }
  }

  loadTemplate(filename: string): string {
    const path: string = `${process.cwd()}${OPTIONS_DIR}/templates/${filename}`;
    let source: string = null
    try {
      source = fs.readFileSync(path, 'utf-8')
    } catch(error) {
      console.log('\x1b[31m%s\x1b[0m', error.message)
      process.exit()
    }

    return source
  }

  renderTemplate(tag: string, templateVars: TemplateVariablesType): void {
    const { template, target } = this.files.find(({ tag: ownTag }) => ownTag === tag)

    const renderPath: renderType = handlebars.compile(target);
    const relPath: string = renderPath(templateVars);
    const absPath: string = `${process.cwd()}${relPath}`

    const source: string = this.loadTemplate(template)
    const renderFile: renderType = handlebars.compile(source);
    const content: string = renderFile(templateVars);

    try {
      const dir: string = absPath.split('/').slice(0, -1).join('/')
      mkdirp.sync(dir)
    } catch(error) {
      console.log('\x1b[31m%s\x1b[0m', error.message)
      process.exit()
    }

    if(!this.args.force && fs.existsSync(absPath)) {
      console.log('%s\x1b[33m%s\x1b[0m%s', `${tag}\t\t`, ' already exists at', `\t ${relPath}`)
      return
    }

    try {
      const stream = fs.createWriteStream(absPath);
      stream.once('open', function() {
        stream.write(content)
        stream.end()
      })
    } catch(error) {
      console.log('\x1b[31m%s\x1b[0m', error.message)
      process.exit()
    }

    console.log('%s\x1b[32m%s\x1b[0m%s', `${tag}\t\t`, ' created at', `\t\t ${relPath}`)
  }

  renderTemplates(): void {
    console.log(`SUMMON\ncreating files for \x1b[32m${this.name} ${this.type}\x1b[0m\n`)
    const templateVars = this.deriveTemplateVariables()
    this.tags.forEach(tag => this.renderTemplate(tag, templateVars))
  }
}

export = Generator