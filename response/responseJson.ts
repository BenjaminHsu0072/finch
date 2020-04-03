import {ServerResponse} from "http";

/**
 * response a Json string;
 * @param response  response
 * @param msg json Object or string
 */
function responseJson(response: ServerResponse, msg: string | object) {
    let r = '{"ERROR":"INTERNAL"}';
    let cType = "text/html";
    if (typeof msg === "string") {
        r = msg;
        cType = "text/plain";
    }
    if (typeof msg === "object") {
        r = JSON.stringify(msg);
        cType = "application/json";
    }
    response.writeHead(200, {"Content-Type": cType});
    response.write(r);
    response.end();
}
export {responseJson} ;