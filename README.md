WHMCS Node Module
=========

WHMCS's API Node client.

## Installation

```
npm install whmcs
```

## Usage

First you need to instantiate it.

```javascript

var config = {
  username: 'api_username',
  password: 'password_as_md5',
  apiKey: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzz', // if access without IP restriction
  serverUrl: 'http://127.0.0.1/includes/api.php'
};

var wclient = new WHMCS(config);
```

Using the created client, call the methods you need, example:


```javascript

whmcs_client.billing.getInvoice(invoiceid, function(err, invoice) {
  ...
});

whmcs_client.billing.payInvoice(invoiceid, 'full', function(err, data) {
  ...
});

whmcs_client.customers.validateLogin(email, password, function(err, data) {
  ...
});

whmcs_client.customers.getTickets(function(err, tickets) {
  ...
});

whmcs_client.customers.getCustomerEmails(clientid, function(err, emails) {
  ...
});

...

```

## Implemented functions

### Billing

- updateInvoice: function (invoiceid, options, callback)
- acceptOrder: function (orderid, options, callback)
- addOrder: function (clientid, order, callback)
- addCredit: function (clientid, amount, description, callback)
- payInvoice: function (invoiceid, amount, callback)
- getInvoice: function (invoiceid, callback)
- getInvoices: function ([options], callback)
- cancelOrder: function (orderid, callback)
- deleteOrder: function (orderid, callback)
- createInvoice: function (clientid, invoice, callback)

### Customers

- getContacts: function (clientid, [options], callback)
- createContact: function (options, callback)
- deleteContact: function (contactid, callback)
- updateContact: function (contactid, options, callback)
- createCustomer: function (options, callback)
- deleteCustomer: function (clientid, callback)
- updateCustomer: function (clientid, options, callback)
- updateCustomerDomain: function (domainid, options, callback)
- getCustomer: function (clientid, [options], callback)
- getCustomerProducts: function (clientid, [options], callback)
- getCustomerDomains: function (clientid, [options], callback)
- getCustomerEmails: function (clientid, [options], callback)
- getCustomerInvoices: function (clientid, [options], callback)
- validateLogin: function (email, password, callback)
- sendEmail: function (id, options, callback)
- getCredits: function (userid, callback)


### Products

- getProduct: function (id, callback)
- getProducts: function (gid, callback)
- getProductsByType: function (type, id, callback)
- getOrders: function (method, id, offset, limit, callback)


### Support

- openTicket: function (clientid, department, subject, message, [options], callback)
- getTicket: function (ticketid, callback)
- deleteTicket: function (ticketid, callback)
- replyTicket: function (ticketid, message, [options], callback)
- getTickets: function ([options], callback)
- updateTicket: function (options, callback)


### Domains

- getDomainLockStatus: function (domainid, callback)
- setDomainLockStatus: function (domainid, status, callback)
- getDomainNameservers: function (domainid, callback)
- setDomainNameservers: function (domainid, nameservers, callback)

### Utilities

- getToDoItems: function (status, offset, limit, callback)

### Licenses

- addLicense: function (type, callback)
- cancelLicense: function (key, callback)
- listLicenses: function (callback)
- reissueLicense: function (key, callback)
- modifyLicense: function (key, opts, callback)
- getPricingLicense: function (callback)
- searchLicense: function (opts, callback)
- brandingLicense: function (action, key, callback)


## Custom API functions

### Nodejs

```javascript
//...
var wclient = new WHMCS(config);

wclient.customers.getTopCustomer = function (callback) {
  var options = {
    action: 'gettopcustomer'
  };

  var opts = {
    client: this,
    body: options
  };

  wclient.utils.modem(opts, callback);
};
```

### WHMCS Side

whmcs_root/includes/api/gettopcustomer.php

```php
<?php

if (!defined("WHMCS")) {
  exit("This file cannot be accessed directly");
}

//...

if(!$error) {
  $json["customer"] = 1234;
  $json["result"] = "success";
  $output = json_encode($json);
} else {
  $output = '{"error": "error description ..."}';
}

echo $output;
?>

```

## Tests

Tests are implemented using `mocha` and `chai`. Run them with `npm test`.

## Examples

Check the test and examples folder for more specific use cases examples.

## License

Pedro Dias - [@pedromdias](https://twitter.com/pedromdias)

Licensed under the Apache license, version 2.0 (the "license"); You may not use this file except in compliance with the license. You may obtain a copy of the license at:

http://www.apache.org/licenses/LICENSE-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the license is distributed on an "as is" basis, without warranties or conditions of any kind, either express or implied. See the license for the specific language governing permissions and limitations under the license.
