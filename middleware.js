const Comment=require('./models/review');

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

module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id,commentId}=req.params;
    const comment=await Comment.findById(commentId);
    if(!comment.author.equals(req.user._id)){
        req.flash("error","You do not have permission to do that!");
        return res.redirect(`/games/${id}`);
    }
    next();
}