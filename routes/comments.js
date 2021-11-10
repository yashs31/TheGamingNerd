const express = require("express");
const router = express.Router({ mergeParams: true }); //routers dont actually have excess to params so explicitly giv access with mergeParams
const GameCard = require("../models/gamecard");
const Comment = require("../models/review");
const comments=require("../controllers/comments_controller");
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");


router.post("/",isLoggedIn, catchAsync(comments.createComment));

router.post("/:commentId",isLoggedIn,isReviewAuthor, catchAsync(comments.deleteComment));

module.exports = router;
