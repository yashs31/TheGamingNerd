const mongoose = require("mongoose");
const Schema = mongoose.Schema; //no need to do mongoose.schema

const NewsCardSchema = new Schema({
	news_id: Number,
	thumbnail: String,
	headline: String,
	sdesc: String,
	tags: [String],
	source: String,
	date: String,
	image1: String,
	image2: String,
	ldesc1: String,
	ldesc2: String,
});

module.exports = mongoose.model("NewsCard", NewsCardSchema);
