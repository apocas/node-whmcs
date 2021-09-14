get "/system" do
  logger.info "loading system data"
  response = Whmcs::System.find_all_by_role_id({ :roleid => params[:roleid].to_i,
                                                 :email => params[:email],
                                                 :include_disabled => params[:include_disabled] })
  return json(response)
end
