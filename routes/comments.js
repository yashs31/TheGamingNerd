const express = require("express");
const router = express.Router({ mergeParams: true }); //routers dont actually have excess to params so explicitly giv access with mergeParams
const GameCard = require("../models/gamecard");
const Comment = require("../models/review");
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");


router.post(
	"/",
	isLoggedIn,
	catchAsync(async (req, res, next) => {
		//res.send(""+req.params.id);
		const card = await GameCard.findById(req.params.id);
		const comment = new Comment(req.body.comment);
		card.comments.push(comment);
		await comment.save();
		await card.save();
		req.flash("success", "Comment Added!");
		res.redirect(`/games/${card._id}`);
		//console.log(card.comments);
		//console.log(card.comments.body);
		//console.log(card.reviews.rating)
	})

router.post("/",isLoggedIn,
catchAsync(async (req, res, next) => {
    console.log("comment posted")
    const card = await GameCard.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    card.comments.push(comment);
    await comment.save();
    await card.save();
    req.flash('success','Comment Added!');
    res.redirect(`/games/${card._id}`);
    console.log(card.comments);
    console.log(card.comments.body);
    //console.log(card.reviews.rating)
})
);

<<<<<<< Updated upstream
router.delete(
	"/:commentId",
	isLoggedIn,
	catchAsync(async (req, res) => {
		console.log("delete route hit");
		const { id, commentId } = req.params;
		await GameCard.findByIdAndUpdate(id, {
			$pull: { comments: commentId },
		});
		await Comment.findByIdAndDelete(commentId);
		req.flash("success", "Deleted!");
		console.log("deleted");
		res.redirect(`/games/${id}`);
	})
);
=======
router.delete("/:commentId",isLoggedIn, catchAsync(async(req,res)=>{
console.log("delete route hit");
const {id,commentId}=req.params;
await GameCard.findByIdAndUpdate(id,{$pull:{comments:commentId}});
await Comment.findByIdAndDelete(commentId);
req.flash('success','Deleted!');
console.log("deleted");
res.redirect(`/games/${id}`);
}));
>>>>>>> Stashed changes

module.exports = router;
