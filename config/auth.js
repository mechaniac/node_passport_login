module.exports = {  //use as middleware in routes to protect them from unauthorized access
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){  //passport function
            return next()
        }
        req.flash('error_msg','Please log in to view this ressource')
        res.redirect('/users/login')
    }
}