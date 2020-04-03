"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mime = require('./mime');
const fs = require('fs');
const path = require('path');
/**
 * response a html file;
 * @param res  response
 * @param staticFilePath Static File Path
 */
function responseStaticFiles(res, staticFilePath) {
    let ext = path.extname(staticFilePath);
    ext = ext ? ext.slice(1) : 'unknown';
    let contentType = mime[ext] || 'text/plain';
    res.writeHead(200, {
        'Content-Type': contentType,
        'content-length': fs.statSync(staticFilePath).size,
    });
    let stream = fs.createReadStream(staticFilePath);
    stream.pipe(res);
}
exports.responseStaticFiles = responseStaticFiles;
