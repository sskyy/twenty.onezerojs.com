function allowOnlyAdmin( req, res, next ){
  if( !req.session.user || !req.session.user.id ){
    return res.redirect('/page/static/login')
  }else{
    next()
  }
}



module.exports = function(sails){
  return {
    routes : {
      before : {
        "/page/static/admin" : allowOnlyAdmin,
        "put /*" : allowOnlyAdmin,
        "post /*" : function(req, res, next){
          if( (!sails.config.cms.installed && req.path === '/user/register') || req.path === '/user/login'  ){
            next()
          }else{
            return allowOnlyAdmin(req, res, next)
          }
        },
        "/page/static/register" : function(req, res,next){
          if( sails.config.cms.installed && !sails.config.cms.allowMultipleAdmin ){
            return res.forbidden()
          }else{
            next()
          }
        }
      }
    }
  }
}


