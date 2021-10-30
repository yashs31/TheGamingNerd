const mongoose=require('mongoose');
const Schema=mongoose.Schema; //no need to do mongoose.schema

const GameCardSchema=new Schema({
    gameid:String,
    title:String,
    headerImage:String,
    posterImage:String,
    developers:String,
    tags:[String],
    metacriticScore:Number,
    price:String,
    description:String ,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports=mongoose.model('GameCard',GameCardSchema);