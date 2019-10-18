# summon-files

NodeJs cli application to autogenerate boilerplate files:
Specify and templatye the files you need to generate in your project,
e.g. when working on a react project you may want `index.js`, `style.css` and `test.js` files.

You can specify multiple types of generators which can use a different set of template files.

## install

`npm install summon-files --save` or `yarn add summon-files --save`

## usage

### configuration

Create a `.summon/config.json`file to specify your configuration and put templates in `.summon/templates`.
_You can also use a custom location for the 'config' and 'templates' which can be set via the '-c' flag_

__Examples:__ see the `.summon-example` directory inside the package

#### config.json

```
{
  "root": "",               // string | entry folder of your source code
  "types": [                // specify different generator types here
    {
      "type": "",           // string | type of the generator
      "desc": "",           // string | optional | description
      "src": "",            // string | optional | path for this generator inside <root>
      "defaultTags": [],    // string[] | files to generate (based on their tag value)
      "defaultVars": {},    // object | optional | additional variables usable in the template files
      "subTypes": [],       // string[] | optional | subTypes availabe for this generator
                            // entries can be either string or string[] | first value is the subType, following ones are aliases
      "files": [            // array of file/template descriptors
        {
          "tag": "",        // string | specify which tag triggers this file to be created
          "template": "",   // string | name of file in the `.summon/templates` folder
          "target": ""      // string | handlebars template | specify the path/filename for file creation
                            // accepts handlebar template strings (e.g. with {{path}}, {{name}})
                            // available variables can be found in the template section of this README.md
        }
      ]
    }
  ]
}
```

### cli commands

__basic command__
```
yarn summon <type> <name>

type    genarator type
           (use 'yarn summon -l' to output a list of all available types)
           (use 'yarn summon <type> -i' to output more information about the choosen types)
name    will be used as file / component / class / etc. name
```

__cli usage info__
```
yarn summon help
```

__cli flags__
```
yarn summon <type> <name> [-s <subType>] [-l] [-i] [-f] [-c <configPath>]

type  genarator type
        (use 'yarn summon -l' to output a list of all available types)
        (use 'yarn summon <type> -i' to output more information about the choosen types)
name  will be used as file / component / class / etc. name

-s    defines the subType
        (use 'yarn summon <type> -i' to print available types)
-f    overwrite existing files
-l    output a list of all available generator types
-i    output information for the generator type
        (<type> must be specified)
-c    relative path to the config directory
```

## templates

File `templates` and the `target` property in the options file use [handlebars](https://handlebarsjs.com/) templates with [handlebars-helpers](https://github.com/helpers/handlebars-helpers) available.

In the template files you have access to following variables
```
name: string          // name passed to the cli
type: string          // generator type
subType: string       // generator subType (can be null)
name_lower: string    // name in lowercase,
name_upper: string    // name in UPPERCASE
name_lcFirst: string  // name with lowerCase first letter
name_ucFirst: string  // name with UpperCase first letter
path: string          // relative path to the file "<root>/<src>/<target>"
tags: array           // tags used for this generator
...                   // defaultVars set in the config.json
```