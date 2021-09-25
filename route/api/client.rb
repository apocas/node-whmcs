namespace "/api/v1" do
  # GetClients
  get "/clients" do
    # set default parmas
    response = Whmcs.call("GetClients", { :limitstart => params[:limitstart] || 0,
                                          :limitnum => params[:limitnum] || 25,
                                          :sorting => params[:sorting] || "ASC",
                                          # ‘Active’, ‘Inactive’, or ‘Closed’.
                                          :status => params[:status],
                                          # email, firstname, lastname, fullname or companyname
                                          :search => params[:search],
                                          # id, firstname, lastname, companyname, email, groupid, datecreated, status
                                          :orderby => params[:orderby] || "id" })

    logger.info "[#{response[:result].upcase}] loading clients data"

    return json(response)
  end

  # GetClientGroups
  get "/clients/groups" do
    # set default parmas
    response = Whmcs.call("GetClientGroups")
    logger.info "[#{response}]"

    return json(response)
  end

  # GetClientsDetails
  get "/clients/details" do
    # set default parmas
    response = Whmcs.call("GetClientsDetails", { :clientid => params[:clientid].to_i,
                                                 :email => params[:email].to_s,
                                                 :stats => params[:stats] || true })
    logger.info "[#{response}]"

    return json(response)
  end

  # GetClientPassword
  get "/clients/password" do
    # set default parmas
    response = Whmcs.call("GetClientPassword", { :userid => params[:userid].to_i,
                                                 :email => params[:email].to_s })
    logger.info "[#{response}]"

    return json(response)
  end

  # GetClientsAddons
  get "/addons" do
    # set default parmas
    response = Whmcs.call("GetClientsAddons", { :serviceid => params[:serviceid].to_i,
                                                :clientid => params[:clientid].to_i,
                                                :addonid => params[:addonid].to_i })
    logger.info "[#{response}]"

    return json(response)
  end

  # GetClientsDomains
  get "/clients/domains" do
    # set default parmas
    response = Whmcs.call("GetClientsDomains", { :limitstart => params[:limitstart].to_i,
                                                 :limitnum => params[:limitnum].to_i,
                                                 :clientid => params[:clientid].to_i,
                                                 :domainid => params[:domainid].to_i,
                                                 :domain => params[:domain].to_s })

    logger.info "[#{response}]"

    return json(response)
  end

  # GetContacts
  get "/clients/contacts" do
    response = Whmcs.call("GetContacts", { :limitstart => params[:limitstart] || 0,
                                           :limitnum => params[:limitnum] || 25,
                                           :userid => params[:userid].to_i,
                                           :firstname => params[:firstname].to_s,
                                           :lastname => params[:lastname].to_s,
                                           :companyname => params[:companyname].to_s,
                                           :email => params[:email].to_s,
                                           :address1 => params[:address1].to_s,
                                           :address2 => params[:address2].to_s,
                                           :city => params[:city].to_s,
                                           :state => params[:state].to_s.upcase,
                                           :postcode => params[:postcode].to_s,
                                           :country => params[:country].to_s,
                                           :phonenumber => params[:phonenumber].to_s.strip })
    logger.info "[#{response[:result].upcase}] loading client contacts data"

    return json(response)
  end

  # GetEmails
  get "/emails" do
    response = Whmcs.call("GetEmails", { :clientid => params[:clientid].to_i,
                                         :limitstart => params[:limitstart] || 0,
                                         :limitnum => params[:limitnum] || 25,
                                         :date => params[:date].to_s,
                                         :subject => params[:subject].to_s })

    return json(response)
  end

  # GetClientsProducts
  get "/clients/products" do
    response = Whmcs.call("GetClientsProducts", { :clientid => params[:clientid].to_i,
                                                  :limitstart => params[:limitstart] || 0,
                                                  :limitnum => params[:limitnum] || 25,
                                                  :serviceid => params[:serviceid].to_i,
                                                  :pid => params[:pid].to_i,
                                                  :domain => params[:domain].to_s,
                                                  :username2 => params[:username].to_s })

    return json(response)
  end

  # GetCancelledPackages
  get "/packages/cancelled" do
    response = Whmcs.call("GetCancelledPackages", { :limitstart => params[:limitstart] || 0,
                                                    :limitnum => params[:limitnum] || 25 })

    return json(response)
  end

  # UpdateClient
  post "/clients/update" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdateClient", { :clientid => payload[:clientid].to_i,
                                            :clientemail => payload[:clientemail].to_s,
                                            :firstname => payload[:firstname].to_s,
                                            :lastname => payload[:lastname].to_f,
                                            :companyname => payload[:companyname].to_s,
                                            :email => payload[:email].to_s,
                                            :address1 => payload[:address1].to_s,
                                            :address2 => payload[:address2].to_s,
                                            :city => payload[:city].to_s,
                                            :state => payload[:state].to_s,
                                            :postcode => payload[:postcode].to_s,
                                            :country => payload[:country],
                                            :phonenumber => payload[:phonenumber],
                                            :tax_id => payload[:tax_id].to_s,
                                            :currency => payload[:currency],
                                            :groupid => payload[:groupid],
                                            :customfields => payload[:customfields],
                                            :language => payload[:language],
                                            :clientip => payload[:clientip],
                                            :notes => payload[:notes],
                                            :status => payload[:status],
                                            :paymentmethod => payload[:paymentmethod],
                                            :email_preferences[general] => payload[:email_preferences][:general],
                                            :email_preferences[product] => payload[:email_preferences][:product],
                                            :email_preferences[domain] => payload[:email_preferences][:domain],
                                            :email_preferences[invoice] => payload[:email_preferences][:invoice],
                                            :email_preferences[support] => payload[:email_preferences][:support],
                                            :email_preferences[affiliate] => payload[:email_preferences][:affiliate],
                                            :marketingoptin => payload[:marketingoptin],
                                            :clearcreditcard => payload[:clearcreditcard],
                                            :skipvalidation => payload[:skipvalidation],
                                            :latefeeoveride => payload[:latefeeoveride],
                                            :overideduenotices => payload[:overideduenotices],
                                            :taxexempt => payload[:taxexempt],
                                            :separateinvoices => payload[:separateinvoices],
                                            :disableautocc => payload[:disableautocc],
                                            :overrideautoclose => payload[:overrideautoclose] })

    logger.info "Invoice Created:  #{response}"
    return json(response)
  end

  # UpdateContact
  post "/clients/contact/update" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdateContact", { :contactid => payload[:contactid].to_i,
                                            :firstname => payload[:firstname].to_s,
                                            :lastname => payload[:lastname].to_f,
                                            :companyname => payload[:companyname].to_s,
                                            :email => payload[:email].to_s,
                                            :address1 => payload[:address1].to_s,
                                            :address2 => payload[:address2].to_s,
                                            :city => payload[:city].to_s,
                                            :state => payload[:state].to_s,
                                            :postcode => payload[:postcode].to_s,
                                            :country => payload[:country],
                                            :phonenumber => payload[:phonenumber],
                                            :email_preferences[general] => payload[:email_preferences][:general],
                                            :email_preferences[product] => payload[:email_preferences][:product],
                                            :email_preferences[domain] => payload[:email_preferences][:domain],
                                            :email_preferences[invoice] => payload[:email_preferences][:invoice],
                                            :email_preferences[support] => payload[:email_preferences][:support],
                                            :email_preferences[affiliate] => payload[:email_preferences][:affiliate] })

    logger.info "Invoice Created:  #{response}"
    return json(response)
  end
end
