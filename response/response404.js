"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * response a 404 page
 * @param response
 */
function response404(response) {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("404 :Can not found this Page !");
    response.end();
}
exports.response404 = response404;
