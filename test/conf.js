var WHMCS = require('../whmcs');

var config = {
  username: process.env.WHMCS_USER || 'username',
  password: process.env.WHMCS_KEY || 'password',
  apiKey: process.env.WHMCS_AK || 'accessKey',
  serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
  userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs'
};

var whmcs = new WHMCS(config);

var userDetails = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'johndoe@john.doe',
  address1: 'Mars',
  city: 'Phobos',
  state: 'Crater',
  postcode: '9999-999',
  country: 'US',
  phonenumber: '123456789',
  password2: '123qwe'
};

var contactDetails = {
  firstname: 'Ground',
  lastname: 'Control',
  email: 'groundcontrol@john.doe',
  address1: 'Earth',
  city: 'Phobos',
  state: 'Crater',
  postcode: '9999-999',
  country: 'US',
  phonenumber: '911911911'
}

function initialize(done) {
  console.log('Preparing the test environment. Please wait...');

  whmcs.client.addClient(userDetails, function (err, res) {
    if (err) {
      done(err);
    } else {
      module.exports.demoUserId = res.owner_id;
      module.exports.demoClientId = res.clientid;

      contactDetails.clientid = res.clientid;
      whmcs.client.addContact(contactDetails, function (err, details) {
        if (err) {
          done(err);
        } else {
          module.exports.demoContactId = details.contactid;
          console.log('Test environment initialization complete.');
          done();
        }
      });
    }
  });
}

function rollback(done) {
  console.log('Removing the temporary data. Please wait...');

  var opts = {
    clientid: module.exports.demoClientId,
    deleteusers: true,
    deletetransactions: true
  };
  whmcs.client.deleteClient(opts, function (err, res) {
    done(err);
  });
}

before(function (done) {
  this.timeout(60000);
  initialize(done);
});

after(function (done) {
  this.timeout(60000);
  rollback(done);
});

function serialize(mixed_value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Arpad Ray (mailto:arpad@php.net)
  // +   improved by: Dino
  // +   bugfixed by: Andrej Pavlovic
  // +   bugfixed by: Garagoth
  // +      input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)
  // +   bugfixed by: Russell Walker (http://www.nbill.co.uk/)
  // +   bugfixed by: Jamie Beck (http://www.terabit.ca/)
  // +      input by: Martin (http://www.erlenwiese.de/)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
  // +   improved by: Le Torbi (http://www.letorbi.de/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
  // +   bugfixed by: Ben (http://benblume.co.uk/)
  // %          note: We feel the main purpose of this function should be to ease the transport of data between php & js
  // %          note: Aiming for PHP-compatibility, we have to translate objects to arrays
  // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
  // *     example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
  // *     returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'
  var val, key, okey,
    ktype = '',
    vals = '',
    count = 0,
    _utf8Size = function (str) {
      var size = 0,
        i = 0,
        l = str.length,
        code = '';
      for (i = 0; i < l; i++) {
        code = str.charCodeAt(i);
        if (code < 0x0080) {
          size += 1;
        } else if (code < 0x0800) {
          size += 2;
        } else {
          size += 3;
        }
      }
      return size;
    },
    _getType = function (inp) {
      var match, key, cons, types, type = typeof inp;

      if (type === 'object' && !inp) {
        return 'null';
      }
      if (type === 'object') {
        if (!inp.constructor) {
          return 'object';
        }
        cons = inp.constructor.toString();
        match = cons.match(/(\w+)\(/);
        if (match) {
          cons = match[1].toLowerCase();
        }
        types = ['boolean', 'number', 'string', 'array'];
        for (key in types) {
          if (cons == types[key]) {
            type = types[key];
            break;
          }
        }
      }
      return type;
    },
    type = _getType(mixed_value);

  switch (type) {
    case 'function':
      val = '';
      break;
    case 'boolean':
      val = 'b:' + (mixed_value ? '1' : '0');
      break;
    case 'number':
      val = (Math.round(mixed_value) == mixed_value ? 'i' : 'd') + ':' + mixed_value;
      break;
    case 'string':
      val = 's:' + _utf8Size(mixed_value) + ':"' + mixed_value + '"';
      break;
    case 'array':
    case 'object':
      val = 'a';
      /*
        if (type === 'object') {
          var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
          if (objname == undefined) {
            return;
          }
          objname[1] = this.serialize(objname[1]);
          val = 'O' + objname[1].substring(1, objname[1].length - 1);
        }
        */

      for (key in mixed_value) {
        if (mixed_value.hasOwnProperty(key)) {
          ktype = _getType(mixed_value[key]);
          if (ktype === 'function') {
            continue;
          }

          okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
          vals += serialize(okey) + serialize(mixed_value[key]);
          count++;
        }
      }
      val += ':' + count + ':{' + vals + '}';
      break;
    default:
      // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
      val = 'N';
      break;
  }
  if (type !== 'object' && type !== 'array') {
    val += ';';
  }
  return val;
};

module.exports = {
  whmcs: whmcs,
  demoUserDetails: userDetails,
  demoContactDetails: contactDetails,
  serialize: serialize
};
