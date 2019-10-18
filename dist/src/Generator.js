"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var fs = require('fs');
var handlebars = require('handlebars');
var helpers = require('handlebars-helpers');
var mkdirp = require('mkdirp');
var OPTIONS_DIR = require('./consts').OPTIONS_DIR;
var getConfigPath = function (configDir) { return process.cwd() + "/" + configDir + "/config.json"; };
helpers();
var _a = require('./utils'), lc = _a.lc, uc = _a.uc, lcFirst = _a.lcFirst, ucFirst = _a.ucFirst;
var getInformationString = function (type, desc, availableSubTypes) {
    return "type    \t" + type + (desc ? "\n\t\t" + desc : '') + "\nsubTypes \t" + (availableSubTypes.length > 0 ? availableSubTypes.join('|') : 'none') + "\n";
};
var Generator = (function () {
    function Generator(command, config) {
        this.root = '';
        this.src = '';
        this.tags = [];
        this.vars = {};
        this.subType = null;
        this.configDir = config.configDir;
        this.name = command.name;
        this.args = command.args;
        this.type = config.type;
        this.desc = config.desc;
        this.root = config.root;
        this.src = config.src;
        this.files = config.files;
        this.tags = config.tags;
        this.vars = config.vars;
        this.subTypeMap = config.subTypes;
        this.availableSubTypes = config.subTypes.map(function (list) { return list[0]; });
        this.subType = this.parseSubType(command.args.subType);
    }
    Generator.prototype.parseSubType = function (s) {
        if (!s) {
            return null;
        }
        try {
            var subType = this.subTypeMap.find(function (type) { return type.includes(s); })[0];
            return subType;
        }
        catch (err) {
            throw new Error("-s must be one of " + this.availableSubTypes.join('|') + " instead got " + s);
        }
    };
    Generator.prototype.run = function () {
        this.renderTemplates();
    };
    Generator.prototype.getInformation = function () {
        return getInformationString(this.type, this.desc, this.availableSubTypes);
    };
    Generator.prototype.getRoot = function () {
        return this.root ? this.root + "/" : '';
    };
    Generator.prototype.getSrc = function () {
        return this.src ? this.src + "/" : '';
    };
    Generator.prototype.getPath = function () {
        return "" + this.getSrc() + this.name;
    };
    Generator.prototype.getFilePath = function () {
        return "/" + this.getRoot() + this.getPath();
    };
    Generator.prototype.deriveTemplateVariables = function () {
        return __assign({ name: this.name, name_lower: lc(this.name), name_upper: uc(this.name), name_lcFirst: lcFirst(this.name), name_ucFirst: ucFirst(this.name), path: this.getFilePath(), type: this.type, subType: this.subType, tags: this.tags }, this.vars);
    };
    Generator.prototype.loadTemplate = function (filename) {
        var path = this.configDir + "/templates/" + filename;
        var source = null;
        try {
            source = fs.readFileSync(path, 'utf-8');
        }
        catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message);
            process.exit();
        }
        return source;
    };
    Generator.prototype.renderTemplate = function (tag, templateVars) {
        var _a = this.files.find(function (_a) {
            var ownTag = _a.tag;
            return ownTag === tag;
        }), template = _a.template, target = _a.target;
        var renderPath = handlebars.compile(target);
        var relPath = renderPath(templateVars);
        var absPath = "" + process.cwd() + relPath;
        var source = this.loadTemplate(template);
        var renderFile = handlebars.compile(source);
        var content = renderFile(templateVars);
        try {
            var dir = absPath.split('/').slice(0, -1).join('/');
            mkdirp.sync(dir);
        }
        catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message);
            process.exit();
        }
        if (!this.args.force && fs.existsSync(absPath)) {
            console.log('%s\x1b[33m%s\x1b[0m%s', tag + "\t\t", ' already exists at', "\t " + relPath);
            return;
        }
        try {
            var stream_1 = fs.createWriteStream(absPath);
            stream_1.once('open', function () {
                stream_1.write(content);
                stream_1.end();
            });
        }
        catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message);
            process.exit();
        }
        console.log('%s\x1b[32m%s\x1b[0m%s', tag + "\t\t", ' created at', "\t\t " + relPath);
    };
    Generator.prototype.renderTemplates = function () {
        var _this = this;
        console.log("SUMMON\ncreating files for \u001B[32m" + this.name + " " + this.type + "\u001B[0m\n");
        var templateVars = this.deriveTemplateVariables();
        this.tags.forEach(function (tag) { return _this.renderTemplate(tag, templateVars); });
    };
    return Generator;
}());
module.exports = Generator;
