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
    for(let i=0;i<4;i++){
        //const random=Math.floor(Math.random()*3);
        const card=new GameCard({
            image: `${games[i].image}`,
            title: `${games[i].title}`,
            price: `${games[i].price}`
        })
        await card.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});
