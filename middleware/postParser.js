"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomString_1 = require("../toolFunctions/getRandomString");
const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");
const maxPostMessageSize = 2 * 1024 * 1024;
function postParser(req, res, next) {
    req.postFields = {};
    req.postFiles = [];
    if (!fs.existsSync("./upload")) {
        fs.mkdirSync('./upload');
    }
    let busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        let FN = getRandomString_1.getRandomString();
        let saveTo = path.join("./upload", FN);
        file.pipe(fs.createWriteStream(saveTo));
        let fi = { fileName: FN, orgName: filename };
        req.postFiles.push(fi);
        console.log(fi);
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        req.postFields[fieldname] = val;
    });
    busboy.on('finish', function () {
        // console.log('Done parsing form!');
        next();
    });
    req.pipe(busboy);
}
exports.postParser = postParser;
