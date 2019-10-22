"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var minimist_1 = __importDefault(require("minimist"));
var consts_1 = require("./consts");
var parseArguments = function (argv) {
    var args = {};
    args.subType = argv.s || null;
    args.printInformation = argv.i || null;
    args.listGenerators = argv.l || null;
    args.force = argv.f || null;
    args.configDir = argv.c || null;
    return args;
};
var parseCommand = function () {
    var argv = minimist_1["default"](process.argv.slice(2));
    if (argv._.length === 1 && argv._[0] === 'help') {
        console.log(consts_1.USAGE_OUTPUT);
        process.exit();
    }
    var typoInformationCommand = false;
    if (argv.i) {
        typoInformationCommand = true;
    }
    var listGeneratorsCommand = false;
    if (argv.l) {
        listGeneratorsCommand = true;
    }
    if (argv._.length !== 2 && !typoInformationCommand && !listGeneratorsCommand) {
        var output = "wrong number of arguments";
        console.log('\x1b[31mError:\x1b[0m %s\n', output);
        console.log(consts_1.USAGE_OUTPUT);
        process.exit();
    }
    var command = {
        generator: argv._[0],
        name: argv._[1] || '',
        args: parseArguments(argv)
    };
    return command;
};
module.exports = parseCommand;
