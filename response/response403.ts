import {ServerResponse} from "http";

/**
 * response a 403 page
 * @param response
 */
function response403(response:ServerResponse)
{
    response.writeHead(403, {"Content-Type": "text/html"});
    response.write("Can not reach this Page !");
    response.end();
}

export {response403} ;