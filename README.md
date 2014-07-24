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

whmcs_client.billing.getInvoice(invoiceid, function(err, invoice) {
  ...
});

whmcs_client.billing.payInvoice(invoiceid, function(err, data) {
  ...
});

whmcs_client.customers.validateLogin(email, password, function(err, data) {
  ...
});

whmcs_client.customers.getTickets(clientid, status, function(err, tickets) {
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
- addOrder: function (clientid, order, callback)
- addCredit: function (clientid, amount, description, callback)
- payInvoice: function (invoiceid, callback)
- getInvoice: function (invoiceid, callback)
- cancelOrder: function (orderid, callback)

### Customers

- getContacts: function (clientid, callback)
- createCustomer: function (ocustomer, callback)
- updateCustomer: function (clientid, options, callback)
- updateCustomerDomain: function (domainid, options, callback)
- getCustomer: function (clientid, callback)
- getCustomerProducts: function (clientid, productid, callback)
- getCustomerDomains: function (clientid, domainid, callback)
- getCustomerEmails: function (clientid, callback)
- getCustomerInvoices: function (clientid, callback)
- getTickets: function (clientid, status, callback)
- validateLogin: function (email, password, callback)

### Products

- getProduct: function (id, callback)
- getProducts: function (gid, callback)


### Support

- openTicket: function (clientid, department, subject, message, callback)
- getTicket: function (ticketid, callback)
- replyTicket: function (clientid, ticketid, message, callback)


### Domains

- getDomainLockStatus: function (domainid, callback)
- setDomainLockStatus: function (domainid, status, callback)
- getDomainNameservers: function (domainid, callback)
- setDomainNameservers: function (domainid, nameservers, callback)
