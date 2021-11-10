const GameCard = require("../models/gamecard");
module.exports.index=async (req, res, next) => {
    const allcards = await GameCard.find({}); //GameCard is the name of exported model from  models/gamecard.js
    res.render("games/index", { allcards });
}

module.exports.showCard=async (req, res) => {
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
}