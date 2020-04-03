# finch
Simple Typescript Http Server

finch is a simple framework for middleware HTTP services written in Typescript.
The core is very simple and includes : 
* `Finch` : class;
    * `staticDir`
    * `listen(port: number)`
    * `use(handle: string, middleWare: middleWareFunction): void`
    * `all(middleWare: middleWareFunction):void`
* A set of `response` methods;
    * `responseJson(response: ServerResponse, msg: string | object)` 
    * `response404(response:ServerResponse) `
    * `response403(response:ServerResponse)`
    * `responseStaticFiles(res:ServerResponse, staticFilePath:string)`
    * `responseDownloadFile(res:ServerResponse, dfp:string, dfn?:string)`
    * `responseRedirect(response: ServerResponse, url: string)`
* `cookieParser` : middleware;
* `postParser` : middleware;
* `logger` : method;
