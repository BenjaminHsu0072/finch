"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie = require("cookie");
exports.cookie = cookie;
function cookieParser(req, res, next) {
    req.cookie = {};
    if (req.headers.cookie) {
        req.cookie = cookie.parse(req.headers.cookie);
    }
    next();
}
exports.cookieParser = cookieParser;
