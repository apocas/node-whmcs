WHMCS Node Module
=========

WHMCS' API Node client.

## Pre-requisites

Install [Node.js](https://nodejs.org/en/) version 12.0.0 or higher.

## Installation

```
npm install whmcs
```

## Usage

First you need to instantiate it.

You can instantiate with api credentials:

```javascript
const config = {
  apiIdentifier: '<your_api_identifier>',
  apiSecret: '<your_api_secret>',
  accesskey: '<your_access_key>', //optional. use it to bypass IP restrictions
  serverUrl: 'http://127.0.0.1',
  userAgent: '<your_user_agent>'
};

const wclient = new WHMCS(config);
```

Or you can instantiate with administrator username and password:

```javascript
const config = {
  username: process.env.WHMCS_USER || '<your_admin_username>',
  password: process.env.WHMCS_PASSWORD || '<your_password>',
  accesskey: '<your_access_key>', //optional. use it to bypass IP restrictions
  serverUrl: 'http://127.0.0.1',
  userAgent: '<your_user_agent>'
};

const whmcs = new WHMCS(config);
```

With the created WHMCS client, you should get the category/module you want (see [available modules](#Implemented-functions)) and call the method you need.

For example, you can fetch 10 users like this:

```javascript
const parameters = {
  limitstart: 0,
  limitnum: 10
};
  
whmcs.users.getUsers(parameters)
  .then(details => {
    ...
  })
  .catch(err => {
    ...
  });
```

If you want/need to, you can use callbacks instead:

```javascript
const parameters = {
  limitstart: 0,
  limitnum: 10
};
  
whmcs.users.getUsers(parameters, function (err, details) {
  ...
});
```

## Module architecture

This node-js module follows [WHMCS' API Index](https://developers.whmcs.com/api/api-index/) structure, which have functions organized by categories. Every category is represented here by a module Object, and each module has public methods representing WHMCS' functions.
<br/>
When WHMCS' function requires parameters, they must be grouped in a JSON Object and then can be set as the first argument of the method. If no parameters are required, this argument must not be set. The "callback" argument is optional, and when not provided the method returns a Promise. This pattern is shared all across the modules public methods.
<br/>

## Implemented functions

The [WHMCS' API Index](https://developers.whmcs.com/api/api-index/) can be updated anytime, so you must check below which functions are implemented (expand to show the function list).

<details>
  <summary>Addons</summary>

  - UpdateClientAddon: updateClientAddon(parameters, [callback])
</details>

<details>
  <summary>Affiliates</summary>
  
  - AffiliateActivate: affiliateActivate(parameters, [callback])
  - GetAffiliates: getAffiliates(parameters, [callback])
</details>

<details>
  <summary>Authentication</summary>
  
  - CreateOAuthCredential: createOAuthCredential(parameters, [callback])
  - CreateSsoToken: createSsoToken(parameters, [callback])
  - DeleteOAuthCredential: deleteOAuthCredential(parameters, [callback])
  - ListOAuthCredentials: listOAuthCredentials(parameters, [callback])
  - UpdateOAuthCredential: updateOAuthCredential(parameters, [callback])
  - ValidateLogin: validateLogin(parameters, [callback])
</details>

<details>
  <summary>Billing</summary>

  - AcceptQuote: acceptQuote(parameters, [callback])
  - AddBillableItem: addBillableItem(parameters, [callback])
  - AddCredit: addCredit(parameters, [callback])
  - AddInvoicePayment: addInvoicePayment(parameters, [callback])
  - AddPayMethod: addPayMethod(parameters, [callback])
  - AddTransaction: addTransaction(parameters, [callback])
  - ApplyCredit: applyCredit(parameters, [callback])
  - CapturePayment: capturePayment(parameters, [callback])
  - CreateInvoice: createInvoice(parameters, [callback])
  - CreateQuote: createQuote(parameters, [callback])
  - DeletePayMethod: deletePayMethod(parameters, [callback])
  - DeleteQuote: deleteQuote(parameters, [callback])
  - GenInvoices: genInvoices(parameters, [callback])
  - GetCredits: getCredits(parameters, [callback])
  - GetInvoice: getInvoice(parameters, [callback])
  - GetInvoices: getInvoices(parameters, [callback])
  - GetPayMethods: getPayMethods(parameters, [callback])
  - GetQuotes: getQuotes(parameters, [callback])
  - GetTransactions: getTransactions(parameters, [callback])
  - SendQuote: sendQuote(parameters, [callback])
  - UpdateInvoice: updateInvoice(parameters, [callback])
  - UpdatePayMethod: updatePayMethod(parameters, [callback])
  - UpdateQuote: updateQuote(parameters, [callback])
  - UpdateTransaction: updateTransaction(parameters, [callback])
</details>

<details>
  <summary>Client</summary>

  - AddClient: addClient(parameters, [callback])
  - AddContact: addContact(parameters, [callback])
  - CloseClient: closeClient(parameters, [callback])
  - DeleteClient: deleteClient(parameters, [callback])
  - DeleteContact: deleteContact(parameters, [callback])
  - GetCancelledPackages: getCancelledPackages(parameters, [callback])
  - GetClientGroups: getClientGroups([callback])
  - GetClientPassword: getClientPassword(parameters, [callback])
  - GetClients: getClients(parameters, [callback])
  - GetClientsAddons: getClientsAddons(parameters, [callback])
  - GetClientsDetails: getClientsDetails(parameters, [callback])
  - GetClientsDomains: getClientsDomains(parameters, [callback])
  - GetClientsProducts: getClientsProducts(parameters, [callback])
  - GetContacts: getContacts(parameters, [callback])
  - GetEmails: getEmails(parameters, [callback])
  - UpdateClient: updateClient(parameters, [callback])
  - UpdateContact: updateContact(parameters, [callback])
</details>

<details>
  <summary>Domains</summary>

  - CreateOrUpdateTLD: createOrUpdateTLD(parameters, [callback])
  - DomainGetLockingStatus: domainGetLockingStatus(parameters, [callback])
  - DomainGetNameservers: domainGetNameservers(parameters, [callback])
  - DomainGetWhoisInfo: domainGetWhoisInfo(parameters, [callback])
  - DomainRegister: domainRegister(parameters, [callback])
  - DomainRelease: domainRelease(parameters, [callback])
  - DomainRenew: domainRenew(parameters, [callback])
  - DomainRequestEPP: domainRequestEPP(parameters, [callback])
  - DomainToggleIdProtect: domainToggleIdProtect(parameters, [callback])
  - DomainTransfer: domainTransfer(parameters, [callback])
  - DomainUpdateLockingStatus: domainUpdateLockingStatus(parameters, [callback])
  - DomainUpdateNameservers: domainUpdateNameservers(parameters, [callback])
  - DomainUpdateWhoisInfo: domainUpdateWhoisInfo(parameters, [callback])
  - DomainWhois: domainWhois(parameters, [callback])
  - GetTLDPricing: getTLDPricing(parameters, [callback])
  - UpdateClientDomain: updateClientDomain(parameters, [callback]) 
</details>

<details>
  <summary>Module</summary>

  - ActivateModule: activateModule(parameters, [callback])
  - DeactivateModule: deactivateModule(parameters, [callback])
  - GetModuleConfigurationParameters: getModuleConfigurationParameters(parameters, [callback])
  - GetModuleQueue: getModuleQueue(parameters, [callback])
  - UpdateModuleConfiguration: updateModuleConfiguration(parameters, [callback])
</details>

<details>
  <summary>Module</summary>

  - AcceptOrder: acceptOrder(parameters, [callback])
  - AddOrder: addOrder(parameters, [callback])
  - CancelOrder: cancelOrder(parameters, [callback])
  - DeleteOrder: deleteOrder(parameters, [callback])
  - FraudOrder: fraudOrder(parameters, [callback])
  - GetOrders: getOrders(parameters, [callback])
  - GetOrderStatuses: getOrderStatuses([callback])
  - GetProducts: getProducts(parameters, [callback])
  - GetPromotions: getPromotions(parameters, [callback])
  - OrderFraudCheck: orderFraudCheck(parameters, [callback])
  - PendingOrder: pendingOrder(parameters, [callback])
</details>

<details>
  <summary>Products</summary>

  - AddProduct: addProduct(parameters, [callback])
</details>

<details>
  <summary>Project Management</summary>

  - AddProjectMessage: addProjectMessage(parameters, [callback])
  - AddProjectTask: addProjectTask(parameters, [callback])
  - CreateProject: createProject(parameters, [callback])
  - DeleteProjectTask: deleteProjectTask(parameters, [callback])
  - EndTaskTimer: endTaskTimer(parameters, [callback])
  - GetProject: getProject(parameters, [callback])
  - GetProjects: getProjects(parameters, [callback])
  - StartTaskTimer: startTaskTimer(parameters, [callback])
  - UpdateProject: updateProject(parameters, [callback])
  - UpdateProjectTask: updateProjectTask(parameters, [callback])
</details>

<details>
  <summary>Servers</summary>

  - GetHealthStatus: getHealthStatus(parameters, [callback])
  - GetServers: getServers(parameters, [callback])
</details>


<details>
  <summary>Service</summary>

  - ModuleChangePackage: moduleChangePackage(parameters, [callback])
  - ModuleChangePw: moduleChangePw(parameters, [callback])
  - ModuleCreate: moduleCreate(parameters, [callback])
  - ModuleCustom: moduleCustom(parameters, [callback])
  - ModuleSuspend: moduleSuspend(parameters, [callback])
  - ModuleTerminate: moduleTerminate(parameters, [callback])
  - ModuleUnsuspend: moduleUnsuspend(parameters, [callback])
  - UpdateClientProduct: updateClientProduct(parameters, [callback])
  - UpgradeProduct: upgradeProduct(parameters, [callback])
</details>

<details>
  <summary>Support</summary>

  - AddAnnouncement: addAnnouncement(parameters, [callback])
  - AddCancelRequest: addCancelRequest(parameters, [callback])
  - AddClientNote: addClientNote(parameters, [callback])
  - AddTicketNote: addTicketNote(parameters, [callback])
  - AddTicketReply: addTicketReply(parameters, [callback])
  - blockTicketSender: blockTicketSender(parameters, [callback])
  - DeleteAnnouncement: deleteAnnouncement(parameters, [callback])
  - DeleteTicket: deleteTicket(parameters, [callback])
  - DeleteTicketNote: deleteTicketNote(parameters, [callback])
  - DeleteTicketReply: deleteTicketReply(parameters, [callback])
  - GetAnnouncements: getAnnouncements(parameters, [callback])
  - MergeTicket: mergeTicket(parameters, [callback])
  - OpenTicket: openTicket(parameters, [callback])
  - UpdateTicket: updateTicket(parameters, [callback])
  - UpdateTicketReply: updateTicketReply(parameters, [callback])
</details>


<details>
  <summary>System</summary>

  - AddBannedIp: addBannedIp(parameters, [callback])
  - DecryptPassword: decryptPassword(parameters, [callback])
  - EncryptPassword: encryptPassword(parameters, [callback])
  - GetActivityLog: getActivityLog(parameters, [callback])
  - GetAdminDetails: getAdminDetails([callback])
  - GetAdminUsers: getAdminUsers(parameters, [callback])
  - GetAutomationLog: getAutomationLog(parameters, [callback])
  - GetConfigurationValue: getConfigurationValue(parameters, [callback])
  - GetCurrencies: getCurrencies([callback])
  - GetEmailTemplates: getEmailTemplates(parameters, [callback])
  - GetPaymentMethods: getPaymentMethods([callback])
  - GetStaffOnline: getStaffOnline([callback])
  - GetStats: getStats(parameters, [callback])
  - GetToDoItems: getToDoItems(parameters, [callback])
  - GetToDoItemStatuses: getToDoItemStatuses([callback])
  - LogActivity: logActivity(parameters, [callback])
  - SendAdminEmail: sendAdminEmail(parameters, [callback])
  - SendEmail: sendEmail(parameters, [callback])
  - SetConfigurationValue: setConfigurationValue(parameters, [callback])
  - TriggerNotificationEvent: triggerNotificationEvent(parameters, [callback])
  - UpdateAdminNotes: updateAdminNotes(parameters, [callback])
  - UpdateAnnouncement: updateAnnouncement(parameters, [callback])
  - UpdateToDoItem: updateToDoItem(parameters, [callback])
  - WhmcsDetails: whmcsDetails([callback])
</details>

<details>
  <summary>Tickets</summary>

  - GetSupportDepartments: getSupportDepartments(parameters, [callback])
  - GetSupportStatuses: getSupportStatuses(parameters, [callback])
  - GetTicket: getTicket(parameters, [callback])
  - GetTicketAttachment: getTicketAttachment(parameters, [callback])
  - GetTicketCounts: getTicketCounts(parameters, [callback])
  - GetTicketNotes: getTicketNotes(parameters, [callback])
  - GetTicketPredefinedCats: getTicketPredefinedCats([callback])
  - GetTicketPredefinedReplies: getTicketPredefinedReplies(parameters, [callback])
  - GetTickets: getTickets(parameters, [callback])
</details>

<details>
  <summary>Users</summary>

  - AddUser: addUser(parameters, [callback])
  - CreateClientInvite: createClientInvite(parameters, [callback])
  - DeleteUserClient: deleteUserClient(parameters, [callback])
  - GetPermissionsList: getPermissionsList([callback])
  - GetUserPermissions: getUserPermissions(parameters, [callback])
  - GetUsers: getUsers(parameters, [callback])
  - ResetPassword: resetPassword(parameters, [callback])
  - UpdateUser: updateUser(parameters, [callback])
  - UpdateUserPermissions: updateUserPermissions(parameters, [callback])
</details>


## Custom API functions

It is possible to call custom functions using the method <i>callApi</i>:

```javascript
const parameters = {
  paramx: 'x',
  paramy: 'y'
};

whmcs.callApi('CustomFunctionName', parameters)
  .then(details => {
    ...
  })
  .catch(err => {
    ...
  });
```

## Tests

Tests are implemented using `mocha` and `chai`. Run them with `npm test`.


## License

Pedro Dias - [@pedromdias](https://twitter.com/pedromdias)

Licensed under the Apache license, version 2.0 (the "license"); You may not use this file except in compliance with the license. You may obtain a copy of the license at:

http://www.apache.org/licenses/LICENSE-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the license is distributed on an "as is" basis, without warranties or conditions of any kind, either express or implied. See the license for the specific language governing permissions and limitations under the license.
