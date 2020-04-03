"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseRedirect(response, url) {
    response.writeHead(200, { "Content-Type": "text/html" });
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
exports.responseRedirect = responseRedirect;
