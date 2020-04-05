"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//node.js modules
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
//build in modules
const logger_1 = require("./logger");
const response_1 = require("./response");
class Finch {
    constructor() {
        this.handles = {};
        this.allFunctions = [];
        this.server = http.createServer(createRequestListener(this));
    }
    listen(port) {
        this.server.listen(port);
        console.log(`Finch is Listening Http Request At ${port}`);
    }
    use(handle, middleWare) {
        if (!this.handles.hasOwnProperty(handle)) {
            this.handles[handle] = [];
            for (let a in this.allFunctions) {
                this.handles[handle].push(this.allFunctions[a]);
            }
        }
        this.handles[handle].push(middleWare);
    }
    all(middleWare) {
        this.allFunctions.push(middleWare);
        for (let a in this.handles) {
            this.handles[a].push(middleWare);
        }
    }
}
exports.Finch = Finch;
function prc(req, res, handles) {
    let i = 0;
    function callNext() {
        let crt = handles[i];
        crt(req, res, () => {
            if (i < handles.length - 1) {
                i++;
                callNext();
            }
        });
    }
    callNext();
}
function checkStaticFile(app, pathname) {
    if (!app.staticDir) {
        return false;
    }
    if (!fs.existsSync(app.staticDir)) {
        return false;
    }
    if (!fs.statSync(app.staticDir).isDirectory()) {
        return false;
    }
    let staticFilePath = path.join(app.staticDir, pathname);
    if (!fs.existsSync(staticFilePath)) {
        return false;
    }
    if (fs.statSync(staticFilePath).isFile()) {
        return staticFilePath;
    }
}
function createRequestListener(app) {
    return function (req, res) {
        // req.setEncoding("utf8");
        let decodeUrl = url.parse(decodeURIComponent(req.url), true);
        //解析url路径名
        let pathname = decodeUrl.pathname;
        //解析url请求
        let theQuery = decodeUrl.query;
        let staticFilePath = checkStaticFile(app, pathname);
        req.query = theQuery;
        req.pathName = pathname;
        if (app.handles.hasOwnProperty(pathname)) {
            logger_1.logger(`HANDLE: ${pathname}`, logger_1.logColor.green);
            try {
                prc(req, res, app.handles[pathname]);
            }
            catch (e) {
                console.error(e);
            }
            return;
        }
        if (staticFilePath) {
            logger_1.logger(`HANDLE: STATIC:: ${pathname}`);
            response_1.responseStaticFiles(res, staticFilePath);
            return;
        }
        logger_1.logger(`NO_HANDLE! ${pathname}`, logger_1.logColor.red);
        response_1.response404(res);
    };
}
