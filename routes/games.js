const express = require("express");
const router = express.Router();
const games=require("../controllers/game_controller")
const catchAsync = require("../utils/catchAsync");
const GameCard = require("../models/gamecard");

//when u got to localhost:3000/games
router.get("/",catchAsync(games.index));

//-----------------------------SHOW THE GAME THAT IS SELECTED FROM ALL THE AVAILABLE GAMES LIST------------------
//-----------------------------COMMON TO ALL CATEGORIES----------------------------------------------------------
//--------------------ANY GAME CLICKED IN ANY CATEGORY WILL HIT THIS ROUTE--------------------------------
router.get("/:id",catchAsync(games.showCard));   //games/:id

module.exports = router;
