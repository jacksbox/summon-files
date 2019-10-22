"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var cli_1 = __importDefault(require("./cli"));
var config_1 = require("./config");
var Generator_1 = __importDefault(require("./Generator"));
var consts_1 = require("./consts");
var listGenerators = function (options) {
    return "Available generator Types [available subTypes]:\n" + options.types.map(function (t) {
        var subTypesStr = t.subTypes ? "\n    [" + t.subTypes.map(function (sT) {
            if (Array.isArray(sT)) {
                return sT[0];
            }
            return sT;
        }).join('|') + "]" : '';
        return "  " + t.type + subTypesStr;
    }).join('\n') + "\n";
};
var summon = function () {
    var command = cli_1["default"]();
    var options = config_1.loadOptions(command);
    if (command.args.listGenerators) {
        console.log(listGenerators(options));
        process.exit();
    }
    if (!options.types.find(function (t) { return t.type === command.generator; })) {
        var output = "type '" + command.generator + "' does not exist";
        console.log('\x1b[31mError:\x1b[0m %s\n', output);
        console.log(consts_1.USAGE_OUTPUT);
        process.exit();
    }
    var config = config_1.deriveConfig(options, command.generator);
    var generator = new Generator_1["default"](command, config);
    if (command.args.printInformation) {
        console.log(generator.getInformation());
        process.exit();
    }
    generator.run();
    return true;
};
module.exports = summon;
