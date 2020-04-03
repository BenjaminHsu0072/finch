"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getReadableDate_1 = require("./toolFunctions/getReadableDate");
const fs = require('fs');
const path = require('path');
const maxCount = 10000;
const maxLogFiles = 500;
const logDir = "./log";
let newLog = true;
let currentWriteStream = undefined;
let count = 0;
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
function delLog() {
    let list = fs.readdirSync(logDir);
    while (list.length > maxLogFiles) {
        let f = null;
        for (let a in list) {
            if (path.extname(list[a]) === '.txt') {
                f = list[a];
                fs.unlinkSync(path.join(logDir, f));
                break;
            }
        }
        list = fs.readdirSync(logDir);
    }
}
var logColor;
(function (logColor) {
    logColor[logColor["green"] = 0] = "green";
    logColor[logColor["red"] = 1] = "red";
    logColor[logColor["yellow"] = 2] = "yellow";
    logColor[logColor["yellowBG"] = 3] = "yellowBG";
    logColor[logColor["redBG"] = 4] = "redBG";
})(logColor || (logColor = {}));
exports.logColor = logColor;
function paint(message, color) {
    let logColorStyler = [
        ['\x1B[32m', '\x1B[39m'],
        ['\x1B[31m', '\x1B[39m'],
        ['\x1B[33m', '\x1B[39m'],
        ['\x1B[43m', '\x1B[49m'],
        ['\x1B[41m', '\x1B[49m']
    ];
    if (color !== undefined) {
        return logColorStyler[color][0] + message + logColorStyler[color][1] + " ";
    }
    else
        return message;
}
function logger(message, color) {
    let tp = getReadableDate_1.getReadableDate();
    if (newLog) {
        delLog();
        currentWriteStream = fs.createWriteStream("./log/" + tp + ".txt", { flags: 'a' });
        newLog = false;
    }
    if (currentWriteStream) {
        let theInfo = tp + ' : ' + message;
        currentWriteStream.write(theInfo + '\r\n');
        console.log(paint(tp, logColor.yellow) + " : " + paint(message, color));
        count++;
        if (count > maxCount) {
            currentWriteStream.end();
            newLog = true;
            count = 0;
        }
    }
}
exports.logger = logger;
