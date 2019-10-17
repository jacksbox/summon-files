"use strict";
var minimist = require('minimist');
var USAGE_OUTPUT = require('./consts').USAGE_OUTPUT;
var parseArguments = function (argv) {
    var args = {};
    args.subType = argv.s || null;
    args.printInformation = argv.i || null;
    args.listGenerators = argv.l || null;
    args.force = argv.f || null;
    return args;
};
var parseCommand = function () {
    var argv = minimist(process.argv.slice(2));
    if (argv._.length === 1 && argv._[0] === 'help') {
        console.log(USAGE_OUTPUT);
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
        console.log(USAGE_OUTPUT);
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
