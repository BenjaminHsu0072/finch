const mime = require('./mime');
const fs = require('fs');
const path = require('path');
import {ServerResponse} from "http";


/**
 * response a download File;
 * @param res  response
 * @param dfp Download File Path
 * @param dfn Download File Name
 */
function responseDownloadFile(res:ServerResponse, dfp:string, dfn?:string)
{
    dfn = dfn ? dfn:path.basename(dfp);
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
export {responseDownloadFile} ;