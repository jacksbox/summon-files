"use strict";
var parseCommand = require('./cli');
var _a = require('./config'), loadOptions = _a.loadOptions, deriveConfig = _a.deriveConfig;
var Generator = require('./Generator');
var USAGE_OUTPUT = require('./consts').USAGE_OUTPUT;
var listGenerators = function (options) {
    return "Available generator Types [available subTypes]:\n" + options.types.map(function (t) {
        var subTypesStr = t.subTypes ? "\n    [" + t.subTypes.map(function (t) {
            if (Array.isArray(t)) {
                return t[0];
            }
            return t;
        }).join('|') + "]" : '';
        return "  " + t.type + subTypesStr;
    }).join('\n') + "\n";
};
var summon = function () {
    var command = parseCommand();
    var options = loadOptions(command);
    if (command.args.listGenerators) {
        console.log(listGenerators(options));
        process.exit();
    }
    if (!options.types.find(function (t) { return t.type === command.generator; })) {
        var output = "type '" + command.generator + "' does not exist";
        console.log('\x1b[31mError:\x1b[0m %s\n', output);
        console.log(USAGE_OUTPUT);
        process.exit();
    }
    var config = deriveConfig(options, command.generator);
    var generator = new Generator(command, config);
    if (command.args.printInformation) {
        console.log(generator.getInformation());
        process.exit();
    }
    generator.run();
    return true;
};
module.exports = summon;
