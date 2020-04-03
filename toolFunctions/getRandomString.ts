/***
 * get a random string and return it;
 * @param len the length of the string;string的长度
 * @returns {string}
 */
function getRandomString(len:number=32):string
{
    //default is 32 默认长度为32位
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let maxPos = chars.length;
    let n = '';
    for (var i = 0; i < len; i++)
    {
        n += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return n;
}

export {getRandomString}