const express =require('express');
const path=require('path');
const mongoose=require('mongoose');
const GameCard=require('./models/gamecard');

const steamDBurl="https://store.steampowered.com/api/appdetails?appids=";

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
    const allcards=await GameCard.find({});     //GameCard is the name of exported model from  models/gamecard.js
    res.render('games/index', {allcards}) 
});

//ACTION

//when action category is clicked
app.get('/action', async function(req,res){  
    const allcards=await GameCard.find({});
    res.render('action',{allcards}) 
});

//to show specific action game card when clicked on it     ///games/:id
app.get("/action/:id",async(req,res)=>{
    const card=await GameCard.findById(req.params.id);
    res.render('games/show',{card},{steamDBurl});
});


//FPS

//when FPS category is clicked
app.get('/fps', async function(req,res){  
    const allcards=await GameCard.find({});
    res.render('fps',{allcards}) 
});

//to show specific fps game card when clicked on it     ///games/:id
app.get("/fps/:id",async(req,res)=>{
    const card=await GameCard.findById(req.params.id);
    res.render('games/show',{card},{steamDBurl});
});

//to show specific game card when clicked on it     ///games/:id
app.get("/action/:id",async(req,res)=>{
    const card=await GameCard.findById(req.params.id);
    res.render('games/show',{card},{steamDBurl});
});


//to show specific game card when clicked on it     ///games/:id
app.get("/games/:id",async(req,res)=>{
    const card=await GameCard.findById(req.params.id);
    res.render('games/show',{card});
});

app.listen(3000,()=>{
    console.log("Servig on port 3000");
});

app.use(express.static(__dirname + "/public"));

//run mongodb server with command "mongod" from bin folder