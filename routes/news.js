const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const NewsCard = require("../models/newscard");

//when u got to localhost:3000/news
router.get(
	"/",
	catchAsync(async (req, res, next) => {
		const allcards = await NewsCard.find({}); //NewsCard is the name of exported model from  models/newscard.js
		res.render("news/index", { allcards });
	})
);

//-----------------------------SHOW THE NEWS THAT IS SELECTED FROM ALL THE AVAILABLE NEWS LIST------------------
//news/:id
router.get(
	"/:id",
	catchAsync(async (req, res) => {
		const card = await NewsCard.findById(req.params.id);
		res.render("news/newspage", { card });
	})
);

module.exports = router;
