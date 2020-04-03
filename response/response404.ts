import {ServerResponse} from "http";

/**
 * response a 404 page
 * @param response
 */
function response404(response:ServerResponse)
{
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 :Can not found this Page !");
    response.end();
}
export {response404} ;