WHMCS Node Module
=========

WHMCS's API implementation in Node.js

```
npm install whmcs
```

## Usage

First create an API Client.

```javascript

var config = {
  username: 'api_username',
  password: 'password_as_md5',
  apiKey: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzz', // if access without IP restriction
  serverUrl: 'http://127.0.0.1/includes/api.php'
};

var whmcs_client = whmcs.createClient(config);
```

Using the previous created API Client, call the methods you need, example:


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

## Implemented methods

### Billing

- updateInvoice: function (invoiceid, options, callback)
- acceptOrder: function (orderid, options, callback)
- addOrder: function (clientid, order, callback)
- addCredit: function (clientid, amount, description, callback)
- payInvoice: function (invoiceid,amount, callback)
- getInvoice: function (invoiceid, callback)
- getInvoices: function (userid, [options], callback)
- cancelOrder: function (orderid, callback)

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
- getCustomerDomains: function ([options], callback)
- getCustomerEmails: function (clientid, [options], callback)
- getCustomerInvoices: function ([options], callback)
- getTickets: function ([options], callback)
- validateLogin: function (email, password, callback)
- sendEmail: function (id, options, callback)

### Products

- getProduct: function (id, callback)
- getProducts: function (gid, callback)
- getProductsByType: function (type, id, callback)
- getOrders: function (method, id, offset, limit, callback)


### Support

- openTicket: function (clientid, department, subject, message, [options], callback)
- getTicket: function (ticketid, callback)
- replyTicket: function (ticketid, message, [options], callback)


### Domains

- getDomainLockStatus: function (domainid, callback)
- setDomainLockStatus: function (domainid, status, callback)
- getDomainNameservers: function (domainid, callback)
- setDomainNameservers: function (domainid, nameservers, callback)
- getDomainPricing: function (tld, type, callback)
