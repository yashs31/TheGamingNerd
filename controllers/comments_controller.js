const GameCard = require("../models/gamecard");
const Comment = require("../models/review");

module.exports.createComment=async (req, res, next) => {
    console.log("comment posted")
    const card = await GameCard.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author=req.user._id;
    card.comments.push(comment);
    await comment.save();
    await card.save();
    req.flash('success','Comment Added!');
    res.redirect(`/games/${card._id}`);
    // console.log(card.comments);
    // console.log(card.comments.body);
    //console.log(card.reviews.rating)
}

module.exports.deleteComment=async(req,res)=>{
	//console.log("delete route hit");
	const {id,commentId}=req.params;
	await GameCard.findByIdAndUpdate(id,{$pull:{comments:commentId}});
	await Comment.findByIdAndDelete(commentId);
	req.flash('success','Deleted!');
	console.log("deleted");
	res.redirect(`/games/${id}`);
}