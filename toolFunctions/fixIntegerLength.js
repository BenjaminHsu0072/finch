"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fixIntegerLength(theNumber, length) {
    let s = theNumber.toString();
    let zl = length - s.length;
    let r = "";
    while (r.length < zl)
        r += "0";
    r += theNumber;
    return r;
}
exports.fixIntegerLength = fixIntegerLength;
