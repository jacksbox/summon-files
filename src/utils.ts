import { StringModifyerType } from './types'

const lcFirst: StringModifyerType = string => string.charAt(0).toLowerCase() + string.slice(1)
const ucFirst: StringModifyerType = string => string.charAt(0).toUpperCase() + string.slice(1)
const lc: StringModifyerType = string => string.toLowerCase()
const uc: StringModifyerType = string => string.toUpperCase()

export = {
  lcFirst,
  ucFirst,
  lc,
  uc
}
