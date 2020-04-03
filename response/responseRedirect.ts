import {ServerResponse} from "http";

function responseRedirect(response: ServerResponse, url: string) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`
        <!DOCTYPE html> 
        <html lang="en">
        <head>
            <meta http-equiv="refresh" content="0;url=${url}">
            <meta charset="UTF-8">
            <title>Redirecting...</title>
        </head>
        <body>
        </body>
        </html>`);
    response.end();
}

export {responseRedirect};