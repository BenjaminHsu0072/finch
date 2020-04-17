# finch
Simple Typescript Http Server

#### Features
finch is a simple framework for middleware HTTP services written in Typescript.   
Unlike other middleware systems, this code does not encapsulate the `request`( as
 `IncomingMessage` ) and `response` ( as `ServerResponse`) objects of the node itself.  
You can do whatever you want with native objects.

#### Install
` npm install tsfinch`

#### Usage

```typescript
import {Finch, postParser, responseJson, responseStaticFiles} from "tsfinch";

//instance a new finch for your app and name it;
let mike = new Finch();

//set the StaticFile app so mike can search and response files form it
mike.staticDir = "./static";

//Traditional way of using middleware
mike.use('/', (req, res, next) => {
    responseStaticFiles(res,"./static/index.html");
});

//deal with post Files
mike.use('/upload', postParser);
mike.use('/upload', (req, res) => {
    console.log(JSON.stringify(req.postFields));
    console.log(JSON.stringify(req.postFiles));
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end();
});

//start listening the port
mike.listen(3000);
```

#### Structure
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