namespace "/api/v1/billing" do
  # AcceptQuote
  get "/quote/accept" do
    response = Whmcs.call("AcceptQuote", { :quoteid => params[:quoteid].to_i })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # AddBillableItem
  post "/billableitem/add" do
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Add Billable Item: #{payload}"
    response = Whmcs.call("AddBillableItem", { :clientid => payload[:clientid].to_i,
                                               :description => payload[:description].to_s,
                                               :amount => payload[:amount].to_f,
                                               :quantity => payload[:quantity].to_f,
                                               :unit => payload[:unit].to_s,
                                               :invoiceaction => payload[:invoiceaction].to_s, # One of ‘noinvoice’, ‘nextcron’, ‘nextinvoice’, ‘duedate’, or ‘recur’.
                                               :recur => payload[:recur].to_i,
                                               :recurcycle => payload[:recurcycle].to_s,
                                               :recurfor => payload[:recurfor].to_i,
                                               :duedate => payload[:duedate].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # AddCredit
  post "/credit/add" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("AddCredit", { :clientid => payload[:clientid].to_i,
                                         :description => payload[:description].to_s,
                                         :amount => payload[:amount].to_f,
                                         :date => payload[:date].to_s,
                                         :adminid => payload[:adminid].to_i,
                                         :type => payload[:type].to_s })

    logger.info "Credit Added:  #{response}"
    return json(response)
  end

  # AddInvoicePayment
  post "/invoice/pay" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("AddInvoicePayment", { :invoiceid => payload[:invoiceid].to_i,
                                                 :transid => payload[:transid].to_s,
                                                 :gateway => payload[:gateway].to_s,
                                                 :date => payload[:date].to_s,
                                                 :amount => payload[:amount].to_f,
                                                 :fees => payload[:fees].to_f,
                                                 :noemail => payload[:noemail] })

    logger.info "Invoice paid:  #{response}"
    return json(response)
  end

  # AddPayMethod
  post "/payment/add" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("AddPayMethod", { :clientid => payload[:clientid].to_i,
                                            :type => payload[:type].to_s,
                                            :description => payload[:description].to_s,
                                            :gateway_module_name => payload[:gateway_module_name].to_s,
                                            :card_number => payload[:card_number].to_s,
                                            :card_expiry => payload[:card_expiry].to_s,
                                            :card_start => payload[:card_start].to_s,
                                            :card_issue_number => payload[:card_issue_number].to_i,
                                            :bank_name => payload[:bank_name].to_s,
                                            :bank_account_type => payload[:bank_account_type].to_s,
                                            :bank_code => payload[:bank_code].to_s,
                                            :bank_account => payload[:bank_account].to_s,
                                            :set_as_default => payload[:set_as_default] })

    logger.info "Payment gateway added:  #{response}"
    return json(response)
  end

  # UpdatePayMethod
  post "/payment/update" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdatePayMethod", { :clientid => payload[:clientid].to_i,
                                               :paymethodid => payload[:paymethodid].to_i,
                                               :card_number => payload[:card_number].to_s,
                                               :card_expiry => payload[:card_expiry].to_s,
                                               :card_start => payload[:card_start].to_s,
                                               :card_issue_number => payload[:card_issue_number].to_i,
                                               :bank_name => payload[:bank_name].to_s,
                                               :bank_account_type => payload[:bank_account_type].to_s,
                                               :bank_code => payload[:bank_code].to_s,
                                               :bank_account => payload[:bank_account].to_s,
                                               :set_as_default => payload[:set_as_default] })

    logger.info "Payment gateway updated:  #{response}"
    return json(response)
  end

  # GetTransactions
  get "/transactions" do
    response = Whmcs.call("GetTransactions", { :invoiceid => params[:invoiceid].to_i,
                                               :clientid => params[:clientid].to_i,
                                               :transid => params[:transid].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # AddTransaction
  post "/transaction/add" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("AddTransaction", { :paymentmethod => payload[:paymentmethod].to_s,
                                              :userid => payload[:userid].to_i,
                                              :invoiceid => payload[:invoiceid].to_i,
                                              :transid => payload[:transid].to_s,
                                              :date => payload[:date].to_s,
                                              :currencyid => payload[:currencyid].to_i,
                                              :description => payload[:description].to_s,
                                              :amountin => payload[:amountin].to_f,
                                              :fees => payload[:fees].to_f,
                                              :amountout => payload[:amountout].to_f,
                                              :rate => payload[:rate].to_f,
                                              :credit => payload[:credit],
                                              :allowduplicatetransid => payload[:allowduplicatetransid] })

    logger.info "Payment transaction added:  #{response}"
    return json(response)
  end

  # UpdateTransaction
  post "/transaction/update" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdateTransaction", { :transactionid => payload[:transactionid].to_i,
                                                :refundid => payload[:refundid].to_i,
                                                :userid => payload[:userid].to_i,
                                                :invoiceid => payload[:invoiceid].to_i,
                                                :transid => payload[:transid].to_s,
                                                :date => payload[:date].to_s,
                                                :gateway => payload[:gateway].to_s,
                                                :currency => payload[:currency].to_i,
                                                :description => payload[:description].to_s,
                                                :amountin => payload[:amountin].to_f,
                                                :fees => payload[:fees].to_f,
                                                :amountout => payload[:amountout].to_f,
                                                :rate => payload[:rate].to_f,
                                                :credit => payload[:credit] })

    logger.info "Payment transaction updated:  #{response}"
    return json(response)
  end

  # GetCredits
  get "/credits" do
    response = Whmcs.call("GetCredits", { :clientid => params[:clientid].to_i })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # ApplyCredit
  post "/credit/add" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("ApplyCredit", { :invoiceid => payload[:invoiceid].to_i,
                                           :amount => payload[:amount].to_f,
                                           :noemail => payload[:noemail] })

    logger.info "Account credit added:  #{response}"
    return json(response)
  end

  # CapturePayment
  post "/payment/capture" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("CapturePayment", { :invoiceid => payload[:invoiceid].to_i,
                                              :cvv => payload[:cvv] })

    logger.info "Capture Payment:  #{response}"
    return json(response)
  end

  # GetPayMethods
  #
  # Obtain the Pay Methods associated with a provided client id.
  get "/payments" do
    response = Whmcs.call("GetPayMethods", { :clientid => params[:clientid].to_i,
                                             :paymethodid => params[:paymethodid].to_i,
                                             :type => params[:type].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # DeletePayMethod
  post "/payment/delete" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("DeletePayMethod", { :clientid => payload[:clientid].to_i,
                                               :paymethodid => payload[:paymethodid].to_i,
                                               :failonremotefailure => payload[:failonremotefailure] })

    logger.info "Payment Deleted:  #{response}"
    return json(response)
  end

  # GetInvoice
  get "/invoice" do
    response = Whmcs.call("GetInvoice", { :invoiceid => params[:invoiceid].to_i })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetInvoices
  get "/invoices" do
    response = Whmcs.call("GetInvoice", { :limitstart => params[:limitstart].to_i || 0,
                                          :limitnum => params[:limitnum].to_i || 25,
                                          :userid => params[:userid].to_i,
                                          :status => params[:status].to_s,
                                          :orderby => params[:orderby].to_s || "id",
                                          :order => params[:order].to_s || "DESC" })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # CreateInvoice
  post "/invoice/create" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("CreateInvoice", { :userid => payload[:userid].to_i,
                                             :status => payload[:status].to_s,
                                             :draft => payload[:draft],
                                             :sendinvoice => payload[:sendinvoice],
                                             :paymentmethod => payload[:paymentmethod].to_s,
                                             :taxrate => payload[:taxrate].to_f,
                                             :taxrate2 => payload[:taxrate2].to_f,
                                             :date => payload[:date].to_s,
                                             :duedate => payload[:duedate].to_s,
                                             :notes => payload[:notes].to_s,
                                             :itemdescriptionx => payload[:itemdescriptionx].to_s,
                                             :itemamountx => payload[:itemamountx].to_f,
                                             :itemtaxedx => payload[:itemtaxedx],
                                             :autoapplycredit => payload[:autoapplycredit] })

    logger.info "Invoice Created:  #{response}"
    return json(response)
  end

  # GenInvoices
  post "/invoice/generate" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("GenInvoices", { :noemails => payload[:noemails],
                                           :clientid => payload[:clientid].to_i,
                                           :serviceids => payload[:serviceids].to_a,
                                           :domainids => payload[:domainids].to_a,
                                           :addonids => payload[:addonids].to_a })

    logger.info "Invoice Generated:  #{response}"
    return json(response)
  end

  # UpdateInvoice
  post "/invoice/update" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdateInvoice", { :invoiceid => payload[:invoiceid].to_i,
                                             :status => payload[:status].to_s,
                                             :paymentmethod => payload[:paymentmethod].to_s,
                                             :taxrate => payload[:taxrate].to_f,
                                             :taxrate2 => payload[:taxrate2].to_f,
                                             :credit => payload[:credit].to_f,
                                             :date => payload[:date].to_s,
                                             :duedate => payload[:duedate].to_s,
                                             :datepaid => payload[:datepaid].to_s,
                                             :notes => payload[:notes].to_s,
                                             :itemdescriptionx => payload[:itemdescriptionx],
                                             :itemamount => payload[:itemamount],
                                             :itemtaxed => payload[:itemtaxed],
                                             :newitemdescription => payload[:newitemdescription],
                                             :newitemamount => payload[:newitemamount],
                                             :newitemtaxed => payload[:newitemtaxed],
                                             :deletelineids => payload[:deletelineids],
                                             :publish => payload[:publish],
                                             :publishandsendemail => payload[:publishandsendemail] })

    logger.info "Invoice Created:  #{response}"
    return json(response)
  end

  # GetQuotes
  get "/quotes" do
    response = Whmcs.call("GetQuotes", { :limitstart => params[:limitstart].to_i || 0,
                                         :limitnum => params[:limitnum].to_i || 25,
                                         :quoteid => params[:quoteid].to_i,
                                         :userid => params[:userid].to_i,
                                         :subject => params[:subject].to_s,
                                         :stage => params[:stage].to_s,
                                         :datecreated => params[:datecreated].to_s,
                                         :lastmodified => params[:lastmodified].to_s,
                                         :validuntil => params[:validuntil].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # SendQuote
  get "/quote/send" do
    response = Whmcs.call("SendQuote", { :quoteid => params[:quoteid].to_i })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # CreateQuote
  post "/quote/create" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("CreateQuote", { :subject => payload[:subject].to_s || " ",
                                           :stage => payload[:stage].to_s || "Draft",
                                           :validuntil => payload[:validuntil],
                                           :datecreated => payload[:datecreated],
                                           :lineitems => payload[:lineitems].to_a,
                                           :userid => payload[:userid].to_i,
                                           :firstname => payload[:firstname].to_s,
                                           :lastname => payload[:lastname].to_s,
                                           :companyname => payload[:companyname].to_s,
                                           :email => payload[:email].to_s,
                                           :address1 => payload[:address1].to_s,
                                           :address2 => payload[:address2].to_f,
                                           :city => payload[:city].to_s,
                                           :state => payload[:state].to_s.upcase,
                                           :postcode => payload[:postcode].to_s,
                                           :country => payload[:country].to_s,
                                           :phonenumber => payload[:phonenumber].to_s,
                                           :tax_id => payload[:tax_id].to_s,
                                           :currency => payload[:currency].to_i,
                                           :proposal => payload[:proposal].to_s,
                                           :customernotes => payload[:customernotes].to_s,
                                           :adminnotes => payload[:adminnotes].to_s })

    logger.info "Invoice Created:  #{response}"
    return json(response)
  end

  # UpdateQuote
  post "/quote/udpate" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdateQuote", { :quoteid => payload[:quoteid].to_i,
                                           :subject => payload[:subject].to_s || " ",
                                           :stage => payload[:stage].to_s || "Draft",
                                           :validuntil => payload[:validuntil],
                                           :datecreated => payload[:datecreated],
                                           :lineitems => payload[:lineitems].to_a,
                                           :userid => payload[:userid].to_i,
                                           :firstname => payload[:firstname].to_s,
                                           :lastname => payload[:lastname].to_s,
                                           :companyname => payload[:companyname].to_s,
                                           :email => payload[:email].to_s,
                                           :address1 => payload[:address1].to_s,
                                           :address2 => payload[:address2].to_f,
                                           :city => payload[:city].to_s,
                                           :state => payload[:state].to_s.upcase,
                                           :postcode => payload[:postcode].to_s,
                                           :country => payload[:country].to_s,
                                           :phonenumber => payload[:phonenumber].to_s,
                                           :tax_id => payload[:tax_id].to_s,
                                           :currency => payload[:currency].to_i,
                                           :proposal => payload[:proposal].to_s,
                                           :customernotes => payload[:customernotes].to_s,
                                           :adminnotes => payload[:adminnotes].to_s })

    logger.info "Invoice Created:  #{response}"
    return json(response)
  end

  # DeleteQuote
  post "/quote/delete" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("DeleteQuote", { :quoteid => payload[:quoteid].to_i })

    logger.info "Payment Deleted:  #{response}"
    return json(response)
  end
end
