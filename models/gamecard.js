const mongoose = require("mongoose");
const Comment=require("./review")
const Schema = mongoose.Schema; //no need to do mongoose.schema

const GameCardSchema = new Schema({
	game_id: Number,
	title: String,
	short_description: String,
	long_description: String,
	header_image: String,
	poster_image: String,
	website: String,
	pc_requirements: Object,
	developers: [String],
	platforms: [String],
	genres: [String],
	tags: [String],
	metacritic: Number,
	screenshots: [String],
	release_date: String,
	price: Object,
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
});

GameCardSchema.post('findOneAndDelete', async function(doc){
	if(doc){
		await Comment.deleteMany({
			_id:{
				$in: doc.comments
			}
		})
	}
})

module.exports = mongoose.model("GameCard", GameCardSchema);
