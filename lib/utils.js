var request = require('request');
var querystring = require('querystring');

var failCodes = {
    403:"The request is correct, but could not be process.",
    404:"The requested URL is incorrect or the resource does not exist.",
    422:"The sent parameters are erroneous",
    500:"An error occurred. Please contact support"
};

/**
 * Make a request to the API endpoint on the WHMCS instance
 * @param uri string
 * @param method string
 * @param headers {*}
 * @param requestBody {*}
 * @param callback function
 */
function makeRequest(uri,method,headers,requestBody,callback){
    var serverOptions = {
        uri:uri,
        method:method,
        headers:headers
    };

    if(typeof requestBody !== 'undefined'){
        serverOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        serverOptions.body = querystring.stringify(requestBody);
    }

    request(serverOptions,function(err,res,body){
        if(err){
            return callback(err);
        }

        var statusCode = res.statusCode.toString();
        if(Object.keys(failCodes).indexOf(statusCode) !== -1){
            return callback(new Error('WHMCS Error (' + statusCode + '): ' + failCodes[statusCode]));
        }

        var data;
        try {
            data = JSON.parse(body);
        } catch(e) {
            return callback(new Error('JSON failed to parse: ' + e + ' -> ' + body));
        }

        if(!data || !data.result || (data.result != 'success' && data.result != 'SUCCESS')){
            return callback(new Error('WHMCS Error (' + statusCode + '): ' + data.message));
        } else {
            return callback(null,data);
        }
    });
}

/**
 * Base64 encode
 * @param str
 * @returns {string}
 */
function toBase64(str){
    return (new Buffer(str || "","ascii")).toString("base64");
}

/**
 * @module Utils
 * @type {{failCodes: {403: string, 404: string, 422: string, 500: string}, makeRequest: makeRequest, toBase64: toBase64, modem: modem}}
 */
module.exports = {
    failCodes:failCodes,

    makeRequest: makeRequest,

    toBase64: toBase64,

    modem:function(){
        var args = Array.prototype.slice.call(arguments);
        var callback = (typeof(args[args.length - 1]) === 'function') && args.pop();
        var uri, method, requestBody, client, headers = {};

        if(args.length == 1){
            method = args[0]['method'] || 'GET';
            uri = args[0]['uri'];
            requestBody = args[0]['body'];
            client = args[0]['client'];
        } else if(args.length === 2){
            method = 'GET';
            uri = args[0];
            client = args[1];
        } else {
            method = args[0];
            uri = args[1];
            client = args[2];
        }

        uri = client.config.serverUrl + '/' + uri;
        makeRequest(uri,method,headers,requestBody,callback);
    }
};