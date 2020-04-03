"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mime = require('./mime');
const fs = require('fs');
const path = require('path');
/**
 * response a download File;
 * @param res  response
 * @param dfp Download File Path
 * @param dfn Download File Name
 */
function responseDownloadFile(res, dfp, dfn) {
    dfn = dfn ? dfn : path.basename(dfp);
    let ext = path.extname(dfn);
    ext = ext ? ext.slice(1) : 'unknown';
    let contentType = mime[ext] || 'text/plain';
    res.writeHead(200, {
        'Content-Type': contentType,
        'content-length': fs.statSync(dfp).size,
        'Content-Disposition': ('attachment;filename=' + dfn)
    });
    let stream = fs.createReadStream(dfp);
    stream.pipe(res);
}
exports.responseDownloadFile = responseDownloadFile;
