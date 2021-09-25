namespace "/api/v1/addons" do
  # UpdateClientAddon
  get "/update" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdateClientAddon", { :id => payload[:id].to_i,
                                                 :status => payload[:status],
                                                 :terminationDate => payload[:terminationDate],
                                                 :addonid => payload[:addonid],
                                                 :name => payload[:name],
                                                 :setupfee => payload[:setupfee],
                                                 :recurring => payload[:recurring],
                                                 :billingcycle => payload[:billingcycle],
                                                 :nextduedate => payload[:nextduedate],
                                                 :notes => payload[:notes],
                                                 :autorecalc => payload[:autorecalc] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
end
