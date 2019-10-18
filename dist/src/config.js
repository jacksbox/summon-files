"use strict";
var fs = require('fs');
var OPTIONS_DIR = require('./consts').OPTIONS_DIR;
var getConfigPath = function (configDir) { return process.cwd() + "/" + configDir; };
var loadOptions = function (command) {
    var options = null;
    var configDir = command.args.configDir ? getConfigPath(command.args.configDir) : getConfigPath(OPTIONS_DIR);
    try {
        if (fs.existsSync(configDir)) {
            options = JSON.parse(fs.readFileSync(configDir + "/config.json"));
            options.configDir = configDir;
        }
        else {
            throw new Error("No config file found at " + configDir);
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
        configDir: options.configDir,
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
