"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var consts_1 = require("./consts");
var getConfigPath = function (configDir) { return process.cwd() + "/" + configDir; };
exports.loadOptions = function (command) {
    var options = null;
    var configDir = command.args.configDir
        ? getConfigPath(command.args.configDir)
        : getConfigPath(consts_1.OPTIONS_DIR);
    try {
        if (fs_1["default"].existsSync(configDir)) {
            options = JSON.parse(fs_1["default"].readFileSync(configDir + "/config.json", 'utf8'));
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
exports.deriveConfig = function (options, generator) {
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
