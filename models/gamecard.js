const mongoose=require('mongoose');
const Schema=mongoose.Schema; //no need to do mongoose.schema

const GameCardSchema=new Schema({
    gameid:String,
    image:String,
    title:String,
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