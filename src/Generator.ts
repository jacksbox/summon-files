import fs from 'fs'
import handlebars from 'handlebars'
import helpers from 'handlebars-helpers'
import mkdirp from 'mkdirp'

import { lc, uc, lcFirst, ucFirst } from './utils'

import {
  CommandType,
  ConfigType,
  ArgsType,
  TemplateVariablesType,
  GeneratorType,
  renderType
} from './types'

helpers()

// prettier-ignore
const getInformationString = (type: string, desc: string, availableSubTypes: string[]): string =>
`type    \t${type}${desc ? `\n\t\t${desc}` : ''}
subTypes \t${availableSubTypes.length > 0 ? availableSubTypes.join('|') : 'none'}
`

class Generator implements GeneratorType {
  configDir: string

  name: string
  type: string
  desc: string
  args: ArgsType

  root = ''
  src = ''
  files: any[]
  tags: string[] = []
  vars: any = {}

  subType: string = null
  subTypeMap: any[]
  availableSubTypes: string[]

  constructor(command: CommandType, config: ConfigType) {
    this.configDir = config.configDir
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
    this.availableSubTypes = config.subTypes.map(types => {
      if (Array.isArray(types)) {
        return types[0]
      }
      return types
    })
    this.subType = this.parseSubType(command.args.subType)
  }

  parseSubType(s: string): string {
    if (!s) {
      return null
    }

    try {
      let subType = null
      this.subTypeMap.forEach(types => {
        console.log(types)
        if (Array.isArray(types) && types.includes(s)) {
          ;[subType] = types
          return
        }
        if (types === s) {
          subType = types
        }
      })
      console.log(subType)
      return subType
    } catch (err) {
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

  getPath(): string {
    return `${this.getSrc()}`
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
    const path = `${this.configDir}/templates/${filename}`
    let source: string = null
    try {
      source = fs.readFileSync(path, 'utf-8')
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.message)
      process.exit()
    }

    return source
  }

  renderTemplate(tag: string, templateVars: TemplateVariablesType): void {
    const { template, target } = this.files.find(({ tag: ownTag }) => ownTag === tag)

    const renderPath: renderType = handlebars.compile(target)
    const relPath: string = renderPath(templateVars)
    const absPath = `${process.cwd()}${relPath}`

    const source: string = this.loadTemplate(template)
    const renderFile: renderType = handlebars.compile(source)
    const content: string = renderFile(templateVars)

    try {
      const dir: string = absPath
        .split('/')
        .slice(0, -1)
        .join('/')
      mkdirp.sync(dir)
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.message)
      process.exit()
    }

    if (!this.args.force && fs.existsSync(absPath)) {
      console.log('%s\x1b[33m%s\x1b[0m%s', `${tag}\t\t`, ' already exists at', `\t ${relPath}`)
      return
    }

    try {
      const stream = fs.createWriteStream(absPath)
      stream.once('open', function() {
        stream.write(content)
        stream.end()
      })
    } catch (error) {
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
