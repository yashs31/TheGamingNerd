const mongoose=require('mongoose');
const GameCard=require('../models/gamecard');
const games=require('./games');
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

const seedDB=async()=>{
    await GameCard.deleteMany({});
    for(let i=0;i<3;i++){
        const random=Math.floor(Math.random()*3);
        const card=new GameCard({
            title: `${games[random].title}`,
            price: `${games[random].price}`
        })
        await card.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});
