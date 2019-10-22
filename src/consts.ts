export const OPTIONS_DIR = '.summon'

// prettier-ignore
export const USAGE_OUTPUT =
`usage: yarn summon <type> <name> [-s <subType>] [-l] [-i] [-f] [-c <configPath>]

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
-c   \t relative path to the config directory


'yarn summon help' prints usage information
`
