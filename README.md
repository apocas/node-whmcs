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
  apiKey: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
  serverUrl: 'http://127.0.0.1/includes/api.php'
};

var whmcs_client = whmcs.createClient(config);


```

Using the previus created api client, call the methods you need.


```javascript

whmcs_client.billing.getInvoice(invoiceid, function(invoice) {
  ...
});

whmcs_client.billing.payInvoice(invoiceid, function(data) {
  ...
});

whmcs_client.customers.validateLogin(email, password, function(data) {
  ...
});

whmcs_client.customers.getTickets(clientid, status, function(tickets) {
  ...
});

whmcs_client.customers.getCustomerEmails(clientid, function(emails) {
  ...
});

...

```

## Implemented methods

### Billing

- addOrder: function (clientid, order, callback)
- payInvoice: function (invoiceid, callback)
- getInvoice: function (invoiceid, callback)

#### Customer

- createCustomer: function (ocustomer, callback)
- getCustomer: function (clientid, callback)
- getCustomerProducts: function (clientid, productid, callback)
- getCustomerDomains: function (clientid, domainid, callback)
- getCustomerEmails: function (clientid, callback)
- getCustomerInvoices: function (clientid, callback)
- getTickets: function (clientid, status, callback)
- validateLogin: function (email, password, callback)

### Product

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
