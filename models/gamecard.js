const mongoose=require('mongoose');
const Schema=mongoose.Schema; //no need to do mongoose.schema

const GameCardSchema=new Schema({
    title:String,
    price:String,
    description:String 
});

module.exports=mongoose.model('GameCard',GameCardSchema);