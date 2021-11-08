module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl
        req.session.returnTo = req.session.returnTo.replace(/\/comments.*/g, "");
        console.log(req.session.returnTo)
        req.flash("error", "You must be logged in! (testing hit)");
        return res.redirect("/login");
    }
    next();
}