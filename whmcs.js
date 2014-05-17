var fs = require('fs');
var libPath = __dirname + '/lib';



var Client = function(options){
    var _this = this;

    ['username','apiKey','serverUrl'].forEach(function(required){
        if(!options[required]){
            throw new Error('options.' + required + ' is a required argument.');
        }
    });

    this.config = options;
    this.authorized = false;

    var files = fs.readdirSync(libPath);
    var i = 0;
    var len = files.length;
    while(i < len){
        var name = files[i].replace('.js','');
        _this[name] = require(libPath + '/' + name);
        _this[name].config = _this.config;

        i++;
    }
};

module.exports = {
    createClient: function(options){
        return new Client(options);
    }
};