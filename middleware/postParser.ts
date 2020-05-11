import {nextFunc, parsedRequest, postFileInfo} from "../finch";
import {ServerResponse} from "http";
import {getRandomString} from "finch-tools";
import fs = require("fs");
import path = require("path");
import Busboy = require("busboy");
const maxPostMessageSize = 2*1024*1024;

function postParser(req:parsedRequest, res:ServerResponse, next:nextFunc) {
    if(req.method!=="POST")
    {
        next();
        return;
    }
    req.postFields={};
    req.postFiles=[];
    if(!fs.existsSync("./upload"))
    {
        fs.mkdirSync('./upload');
    }
    let busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype)
    {
        let FN = getRandomString();
        let saveTo = path.join("./upload", FN);
        file.pipe(fs.createWriteStream(saveTo));
        let fi:postFileInfo = {fileName:FN,orgName:filename};
        req.postFiles.push(fi);
        console.log(fi);
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype)
    {
        req.postFields[fieldname] = val;
    });
    busboy.on('finish', function ()
    {
        // console.log('Done parsing form!');
        next();
    });
    req.pipe(busboy);
}

export {postParser}