var fs = require('fs');
var libPath = __dirname + '/modules';

/**
 * Make a WHMCS client
 * @param options
 * @constructor
 */
var Client = function(options){
    var _this = this;

    ['username','serverUrl'].forEach(function(required){
        if(!options[required]){
            throw new Error('options.' + required + ' is a required argument.');
        }
    });

    if(typeof options.password !== 'string' && typeof options.apiKey !== 'string'){
        throw new Error('You must specify a password or apiKey');
    }

    this.config = options;
    this.authorized = false;

    // Add all the modules
    var files = fs.readdirSync(libPath);
    var i = 0;
    var len = files.length;
    while(i < len){
        var name = files[i].replace('.js','');
        var Item = require(libPath + '/' + name);
        _this[name] = new Item();
        _this[name].config = _this.config;

        i++;
    }
};

/**
 * @module WHMCS Client
 * @type {{createClient: createClient}}
 */
module.exports = {
    createClient: function(options){
        return new Client(options);
    }
};