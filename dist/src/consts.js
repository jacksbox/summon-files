"use strict";
var OPTIONS_DIR = '/.summon';
var USAGE_OUTPUT = "usage: yarn summon <type> <name> [-s <subType>] [-l] [-i] [-f]\n\ntype \t genarator type\n     \t    (use 'yarn summon -l' to output a list of all available types)\n     \t    (use 'yarn summon <type> -i' to output more information about the choosen types)\nname \t will be used as file / component / class / etc. name\n\n-s   \t defines the subType\n     \t     (use 'yarn summon <type> -i' to print available types)\n-f   \t overwrite existing files\n-l   \t output a list of all available generator types\n-i   \t output information for the generator type\n     \t     (<type> must be specified)\n\n\n'yarn summon help' prints usage information\n";
module.exports = {
    OPTIONS_DIR: OPTIONS_DIR,
    USAGE_OUTPUT: USAGE_OUTPUT
};
