const OPTIONS_DIR: string = '/.summon'

const USAGE_OUTPUT: string =
`usage: yarn summon <type> <name> [-s <subType>] [-l] [-i] [-f]

type \t genarator type
     \t    (use 'yarn summon -l' to output a list of all available types)
     \t    (use 'yarn summon <type> -i' to output more information about the choosen types)
name \t will be used as file / component / class / etc. name

-s   \t defines the subType
     \t     (use 'yarn summon <type> -i' to print available types)
-f   \t overwrite existing files
-l   \t output a list of all available generator types
-i   \t output information for the generator type
     \t     (<type> must be specified)


'yarn summon help' prints usage information
`

export = {
  OPTIONS_DIR,
  USAGE_OUTPUT
}