import {nextFunc, parsedRequest} from "../finch";
import {ServerResponse} from "http";
import cookie = require("cookie");


function cookieParser(req:parsedRequest, res:ServerResponse, next:nextFunc) {
    req.cookie = {};
    if(req.headers.cookie)
    {
        req.cookie= cookie.parse(req.headers.cookie);
    }
    next();
}

export {cookieParser,cookie}