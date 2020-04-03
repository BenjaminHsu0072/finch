"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * response a 403 page
 * @param response
 */
function response403(response) {
    response.writeHead(403, { "Content-Type": "text/html" });
    response.write("Can not reach this Page !");
    response.end();
}
exports.response403 = response403;
