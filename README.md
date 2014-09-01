WHMCS node module
=========

WHMCS's API implementation in Node.js

```
npm install whmcs
```

## Usage

First create a api client.

```javascript

var config = {
  username: 'api_username',
  password: 'password_as_md5',
  apiKey: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzz', // if access without IP restriction
  serverUrl: 'http://127.0.0.1/includes/api.php'
};

var whmcs_client = whmcs.createClient(config);
```

Using the previus created api client, call the methods you need.


```javascript

whmcs_client.billing.getInvoice(invoiceid, {}, function(err, invoice) {
  ...
});

whmcs_client.billing.payInvoice(invoiceid, {}, function(err, data) {
  ...
});

whmcs_client.customers.validateLogin(email, password, function(err, data) {
  ...
});

whmcs_client.customers.getTickets(clientid, status, {}, function(err, tickets) {
  ...
});

whmcs_client.customers.getCustomerEmails(clientid, {}, function(err, emails) {
  ...
});

...

```

## Implemented methods

### Billing

- updateInvoice: function (invoiceid, options, callback)
- acceptOrder: function (orderid, options, callback)
- addOrder: function (clientid, order, [options], callback)
- addCredit: function (clientid, amount, description, callback)
- payInvoice: function (invoiceid, [options], callback)
- getInvoice: function (invoiceid, [options], callback)
- getInvoices: function (userid, status, limit, callback)
- cancelOrder: function (orderid, [options], callback)

### Customers

- getContacts: function (clientid, callback)
- createContact: function (options, callback)
- deleteContact: function (contactid, callback)
- updateContact: function (contactid, options, callback)
- createCustomer: function (options, callback)
- deleteCustomer: function (clientid, options, callback)
- updateCustomer: function (clientid, options, callback)
- updateCustomerDomain: function (domainid, options, [options], callback)
- getCustomer: function (clientid, [options], callback)
- getCustomerProducts: function (clientid, productid, [options], callback)
- getCustomerDomains: function (clientid, domainid, [options], callback)
- getCustomerEmails: function (clientid, [options], callback)
- getCustomerInvoices: function (clientid, [options], callback)
- getTickets: function (clientid, status, [options], callback)
- validateLogin: function (email, password, callback)
- sendEmail: function (id, email, options, callback)

### Products

- getProduct: function (id, [options], callback)
- getProducts: function (gid, [options], callback)
- getOrders: function (id, status, limit, callback)


### Support

- openTicket: function (clientid, department, subject, message, callback)
- getTicket: function (ticketid, callback)
- replyTicket: function (clientid, ticketid, message, callback)


### Domains

- getDomainLockStatus: function (domainid, callback)
- setDomainLockStatus: function (domainid, status, callback)
- getDomainNameservers: function (domainid, callback)
- setDomainNameservers: function (domainid, nameservers, callback)
- getDomainPricing: function (tld, type, callback)
