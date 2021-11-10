const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const GameCard = require("../models/gamecard");

//when u got to localhost:3000/games
router.get(
	"/",
	catchAsync(async (req, res, next) => {
		const allcards = await GameCard.find({}); //GameCard is the name of exported model from  models/gamecard.js
		res.render("games/index", { allcards });
	})
);

//-----------------------------SHOW THE GAME THAT IS SELECTED FROM ALL THE AVAILABLE GAMES LIST------------------
//-----------------------------COMMON TO ALL CATEGORIES----------------------------------------------------------
//--------------------ANY GAME CLICKED IN ANY CATEGORY WILL HIT THIS ROUTE--------------------------------
//games/:id
router.get(
	"/:id",
	catchAsync(async (req, res) => {
		const card = await GameCard.findById(req.params.id).populate({
			path:"comments",
			populate:{
				path:"author"
			}
		});
		if (!card) {
			req.flash("error", "Cannot find that game");
			res.redirect("/games");
		}
		 console.log(card);
		// console.log("-------------------------------");
		// console.log(card.comments.body);
		res.render("games/gameshowpage", { card });
	})
);

module.exports = router;
