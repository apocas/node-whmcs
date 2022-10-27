const WHMCS = require('../whmcs'),
  expect = require('chai').expect,
  WhmcsError = require('../lib/whmcserror');

let config = {
  apiIdentifier: process.env.WHMCS_API_IDENTIFIER || 'apiIdentifier',
  apiSecret: process.env.WHMCS_API_SECRET || 'apiSecret',
  serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
  userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
  accessKey: process.env.WHMCS_AK
};

const whmcs = new WHMCS(config);

let userDetails = {
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

let contactDetails = {
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

async function addClient () {
  let clientRes = await whmcs.client.addClient(userDetails);
  expect(clientRes).to.have.a.property('result').to.equal('success');
  expect(clientRes).to.have.a.property('owner_id').to.not.be.null;
  expect(clientRes).to.have.a.property('clientid').to.not.be.null;

  module.exports.demoUserId = clientRes.owner_id;
  module.exports.demoClientId = clientRes.clientid;

  contactDetails.clientid = clientRes.clientid;
  return clientRes;
}

async function addContact() {
  let contactRes;
  
  contactRes = await whmcs.client.addContact(contactDetails);
  expect(contactRes).to.have.a.property('result').to.equal('success');
  expect(contactRes).to.have.a.property('contactid').to.not.be.null;

  module.exports.demoContactId = contactRes.contactid;
  return contactRes;
}

async function addProduct() {
  let productOpts = {
    name: 'Test product',
    gid: process.env.WHMCS_TEST_GID || '1',
    type: 'hostingaccount'
  };

  let productRes;

  try {
    productRes = await whmcs.products.addProduct(productOpts);
    expect(productRes).to.have.a.property('result').to.equal('success');
    expect(productRes).to.have.a.property('pid').to.not.be.null;
  } catch (e) {
    if (e.message.indexOf('You must supply a valid Product Group ID') > -1) {
      throw new Error('There is no Product Group #' + productOpts.gid + '. You must create a Product Group in WHMCS and set the environment variable "WHMCS_TEST_GID" in order to proceed with the tests.');
    } else {
      throw e;
    }
  }

  module.exports.demoProductId = productRes.pid;
  return productRes;
}

async function getPaymentMethod() {
  let methodsRes;
  
  methodsRes = await whmcs.system.getPaymentMethods();
  expect(methodsRes).to.have.a.property('result').to.equal('success');
  expect(methodsRes).to.have.a.property('totalresults').to.not.be.null;
  if (methodsRes.totalresults == 0) {
    throw new Error('Payment methods not found. You must create a new payment method first in order to proceed with the tests.');
  }
  expect(methodsRes).to.have.a.property('paymentmethods').to.be.an('object').to.have.a.property('paymentmethod').to.be.an('array').to.have.length.greaterThan(0);
  expect(methodsRes.paymentmethods.paymentmethod[0]).to.have.a.property('module').to.be.a('string');
  module.exports.demoPaymentMethod = methodsRes.paymentmethods.paymentmethod[0].module;
  return methodsRes;
}

async function createOrder() {
  let orderOpts = {
    clientid: module.exports.demoClientId,
    paymentmethod: module.exports.demoPaymentMethod,
    'pid[0]': module.exports.demoProductId,
    'domain[0]': 'hostingtest.com',
    'billingcycle[0]': 'monthly',
    'priceoverride[0]': 1
  };
  let orderRes = await whmcs.orders.addOrder(orderOpts);
  expect(orderRes).to.have.a.property('result').to.equal('success');
  expect(orderRes).to.have.a.property('orderid').to.not.be.null;
  module.exports.demoOrderId = orderRes.orderid;
  return orderRes;
}

async function getService() {
  let productsOpts = {
    domain: 'hostingtest.com',
    clientid: module.exports.demoClientId,
    limitstart: 0,
    limitnum: 1
  };
  let productsRes = await whmcs.client.getClientsProducts(productsOpts);
  expect(productsRes).to.have.a.property('result').to.equal('success');
  expect(productsRes).to.have.a.property('products').to.be.an('object').to.have.a.property('product').to.be.an('array');
  expect(productsRes.products.product[0]).to.have.a.property('id').to.be.a('string');
  module.exports.demoServiceId = productsRes.products.product[0].id;
  return productsRes;
}

async function getSupportDepartment() {
  let deptRes = await whmcs.tickets.getSupportDepartments();
  expect(deptRes).to.have.a.property('result').to.equal('success');
  expect(deptRes).to.have.a.property('totalresults').to.not.be.null;
  if (deptRes.totalresults == 0) {
    throw new Error('Support departments not found. You must create a support department and set the environment variable "WHMCS_TEST_DEPTID" in order to proceed with the tests.');
  }
  expect(deptRes).to.have.a.property('departments').to.be.an('object');
  expect(deptRes.departments).to.have.a.property('department').to.be.an('array');
  expect(deptRes.departments.department[0]).to.have.a.property('id').to.be.a('string')
  module.exports.demoDeptId = deptRes.departments.department[0].id;
  return deptRes;
}

async function checkProjectManagementIsActive() {
  let opts = {
    title: 'test project',
    adminid: 1
  };

  let res;
  try {
    res = await whmcs.projectManagement.createProject(opts);
  } catch (e) {
    if (e instanceof WhmcsError && e.message == 'Project Management is not active.') {
      throw new Error('Project Management is not active. You must activate the Project Management Addon in order to proceed with the tests.');
    } else {
      throw e;
    }
  }
 
  expect(res).to.have.a.property('result').to.equal('success');
}

async function initialize() {
  console.log('Preparing the test environment. Please wait...');
  await addClient();
  await addContact();
  await addProduct();
  await getPaymentMethod();
  await createOrder();
  await getService();
  await getSupportDepartment();
  await checkProjectManagementIsActive();
  console.log('Test environment initialization complete.');
}

async function removeClient() {
  let opts = {
    clientid: module.exports.demoClientId,
    deleteusers: true,
    deletetransactions: true
  };
  return await whmcs.client.deleteClient(opts);
}
async function rollback() {
  console.log('Removing the temporary data. Please wait...');
  await removeClient();
  console.log('Temporary data removed.');
}

before(async function () {
  const _this = this;
  this.timeout(60000);
  await initialize();
});

after(async function () {
  this.timeout(60000);
  await rollback();
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
  let val, key, okey,
    ktype = '',
    vals = '',
    count = 0,
    _utf8Size = function (str) {
      let size = 0,
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
      let match, key, cons, types, type = typeof inp;

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
          let objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
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
