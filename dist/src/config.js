"use strict";
var fs = require('fs');
var OPTIONS_DIR = require('./consts').OPTIONS_DIR;
var BASE_CONFIG_PATH = "" + process.cwd() + OPTIONS_DIR + "/options.json";
var loadOptions = function () {
    var options = null;
    try {
        if (fs.existsSync(BASE_CONFIG_PATH)) {
            options = JSON.parse(fs.readFileSync(BASE_CONFIG_PATH));
        }
        else {
            throw new Error("No config file found at " + BASE_CONFIG_PATH);
        }
    }
    catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message);
        process.exit();
    }
    return options;
};
var deriveConfig = function (options, generator) {
    var generatorOption = options.types.find(function (option) { return option.type === generator; });
    var config = {
        root: options.root,
        type: generatorOption.type,
        desc: generatorOption.desc || null,
        src: generatorOption.src,
        subTypes: generatorOption.subTypes || [],
        files: generatorOption.files,
        tags: generatorOption.defaultTags || [],
        vars: generatorOption.defaultVars || []
    };
    return config;
};
module.exports = { loadOptions: loadOptions, deriveConfig: deriveConfig };
