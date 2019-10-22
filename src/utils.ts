import { StringModifyerType } from './types'

export const lcFirst: StringModifyerType = string => string.charAt(0).toLowerCase() + string.slice(1)
export const ucFirst: StringModifyerType = string => string.charAt(0).toUpperCase() + string.slice(1)
export const lc: StringModifyerType = string => string.toLowerCase()
export const uc: StringModifyerType = string => string.toUpperCase()
