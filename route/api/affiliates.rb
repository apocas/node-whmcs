namespace "/api/v1/affiliate" do
  # GetAffiliates
  get "/" do
    logger.info "Get affiliate"

    response = Whmcs.call("GetAffiliates", { :limitstart => params[:limitstart].to_i,
                                             :limitnum => params[:limitnum].to_i,
                                             :userid => params[:userid].to_i,
                                             :visitors => params[:visitors].to_i,
                                             :paytype => params[:paytype],
                                             :payamount => params[:payamount].to_f,
                                             :onetime => params[:onetime].to_i,
                                             :balance => params[:balance].to_f,
                                             :withdrawn => params[:withdrawn].to_f })
    logger.info "[#{response[:result].upcase}] loading data"

    return json(response)
  end
  # AffiliateActivate
  get "/activate" do
    logger.info "Activate affiliate"

    response = Whmcs.call("AffiliateActivate", { :userid => params[:limitstart] })
    logger.info "[#{response[:result].upcase}] loading data"

    return json(response)
  end
end
