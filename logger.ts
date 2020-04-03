import {getReadableDate} from "./toolFunctions/getReadableDate";

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

enum logColor {
    green,
    red,
    yellow,
    yellowBG,
    redBG
}

function paint(message: string, color?: logColor): string {
    let logColorStyler = [
        ['\x1B[32m', '\x1B[39m'],
        ['\x1B[31m', '\x1B[39m'],
        ['\x1B[33m', '\x1B[39m'],
        ['\x1B[43m', '\x1B[49m'],
        ['\x1B[41m', '\x1B[49m']
    ];
    if (color!==undefined) {
        return logColorStyler[color][0] + message + logColorStyler[color][1] + " ";
    } else return message;
}

function logger(message: string, color?: logColor) {
    let tp = getReadableDate();
    if (newLog) {
        delLog();
        currentWriteStream = fs.createWriteStream("./log/" + tp + ".txt", {flags: 'a'});
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

export {logger,logColor};