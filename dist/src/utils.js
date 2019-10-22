"use strict";
exports.__esModule = true;
exports.lcFirst = function (string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
};
exports.ucFirst = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.lc = function (string) { return string.toLowerCase(); };
exports.uc = function (string) { return string.toUpperCase(); };
