const mongoose = require("mongoose");
const Schema = mongoose.Schema; //no need to do mongoose.schema

const GameCardSchema = new Schema({
	game_id: Number,
	title: String,
	short_description:String,
	long_description:String,
	header_image: String,
	poster_image: String,
	developers: String,
	platforms: [String],
	genres:[String],
	tags: [String],
	metacritic: Number,
	price: String,
	description: String,
	release_date:String,
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review",
		},
	],
});

module.exports = mongoose.model("GameCard", GameCardSchema);
