//node.js modules
import http = require('http');
import url = require('url');
import fs = require('fs');
import path = require('path');

//node.js class and interfaces
import {IncomingMessage, Server, ServerResponse} from 'http';
//build in modules
import {logColor, logger} from "./logger";
import {response404, responseStaticFiles} from "./response";

interface parsedRequest extends IncomingMessage
{
    pathName: string;
    query: object;
    postFiles: postFileInfo[];
    postFields: any;
    cookie:any;
}
interface postFileInfo
{
    fileName:string;
    orgName:string;
}


interface middleWareFunction
{
    (req: parsedRequest, res: ServerResponse, next?: nextFunc): void;
}

interface nextFunc
{
    (): void
}

interface handles
{
    [index: string]: Array<middleWareFunction>
}

class Finch
{
    public server: Server;
    public handles: handles = {};
    public staticDir: string;
    public allFunctions: middleWareFunction[] = [];

    constructor()
    {
        this.server = http.createServer(createRequestListener(this));
    }

    public listen(port: number): void
    {
        this.server.listen(port);
        console.log(`Finch is Listening Http Request At ${port}`);
    }

    public use(handle: string, middleWare: middleWareFunction): void
    {
        if (!this.handles.hasOwnProperty(handle))
        {
            this.handles[handle] = [];
            for(let a in this.allFunctions)
            {
                this.handles[handle].push(this.allFunctions[a]);
            }
        }
        this.handles[handle].push(middleWare);
    }
    public all(middleWare: middleWareFunction):void
    {
        this.allFunctions.push(middleWare);
        for(let a in this.handles)
        {
            this.handles[a].push(middleWare);
        }
    }
}

function prc(req: parsedRequest, res: ServerResponse, handles: Array<middleWareFunction>): void
{
    let i = 0;
    function callNext()
    {
        let crt = handles[i];
        crt(req, res, () =>
        {
            if (i < handles.length - 1)
            {
                i++;
                callNext();
            }
        });
    }
    callNext();
}


function checkStaticFile(app: Finch, pathname: string): false | string
{
    if (!app.staticDir)
    {
        return false;
    }
    if (!fs.existsSync(app.staticDir))
    {
        return false;
    }
    if (!fs.statSync(app.staticDir).isDirectory())
    {
        return false;
    }
    let staticFilePath = path.join(app.staticDir, pathname);
    if (!fs.existsSync(staticFilePath))
    {
        return false;
    }
    if (fs.statSync(staticFilePath).isFile())
    {
        return staticFilePath;
    }
}

function createRequestListener(app: Finch): middleWareFunction
{
    return function (req: parsedRequest, res: ServerResponse)
    {
        // req.setEncoding("utf8");
        let decodeUrl = url.parse(decodeURIComponent(req.url), true);

        //解析url路径名
        let pathname = decodeUrl.pathname;
        //解析url请求
        let theQuery = decodeUrl.query;

        let staticFilePath = checkStaticFile(app, pathname);

        req.query = theQuery;
        req.pathName = pathname;

        if (app.handles.hasOwnProperty(pathname))
        {
            logger(`HANDLE: ${pathname}`,logColor.green);
            try
            {
                prc(req, res, app.handles[pathname]);
            } catch (e)
            {
                console.error(e)
            }
            return;
        }
        if (staticFilePath)
        {
            logger(`HANDLE: STATIC:: ${pathname}`);
            responseStaticFiles(res, staticFilePath);
            return;
        }
        logger(`NO_HANDLE! ${pathname}`,logColor.red);
        response404(res);
    }
}

export {Finch,parsedRequest,nextFunc,postFileInfo}
