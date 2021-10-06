const express =require('express');
const path=require('path');
const mongoose=require('mongoose');
const GameCard=require('./models/gamecard');

mongoose.connect('mongodb://localhost/thegamingnerd',{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true
});

const db =mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
});

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//home page
app.get('/', function(req,res){
    res.render('home')
});

//when u got to localhost:3000/games
app.get('/games', async function(req,res){  
    const allcards=await GameCard.find({});
    res.render('games/index', {allcards}) 
});

//to show specific game card when clicked on it
app.get("/games/:id",async(req,res)=>{
    const card=await GameCard.findById(req.params.id);
    res.render('games/show',{card});
});

app.listen(3000,()=>{
    console.log("Servig on port 3000");
});

//run mongodb server with command "mongod" from bin folder