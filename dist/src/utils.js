"use strict";
var lcFirst = function (string) { return string.charAt(0).toLowerCase() + string.slice(1); };
var ucFirst = function (string) { return string.charAt(0).toUpperCase() + string.slice(1); };
var lc = function (string) { return string.toLowerCase(); };
var uc = function (string) { return string.toUpperCase(); };
module.exports = {
    lcFirst: lcFirst,
    ucFirst: ucFirst,
    lc: lc,
    uc: uc
};
