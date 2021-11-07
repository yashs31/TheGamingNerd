const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session=require("express-session");
const flash=require('connect-flash');
const GameCard = require("./models/gamecard");
const games = require("./seeds/games");
const Comment = require("./models/review");
var bodyParser = require("body-parser");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user");

const userRoutes=require("./routes/users");
const gamesRoutes=require('./routes/games');
const commentsRoutes=require('./routes/comments');


const steamDBurl = "https://store.steampowered.com/api/appdetails?appids=";

mongoose.connect("mongodb://localhost/thegamingnerd", {
	useNewUrlParser: true,
	//useCreateIndex:true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

const sessionConfig={
	secret: 'thisshouldbeabettersecret',
	resave:false,
	saveUninitialized:true,
	cookie:{
		httpOnly:true,
		expires:Date.now() + 1000*60*60*24*7,
		maxAge:1000*60*60*24*7
	}
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //PREDEFINED PASSPORT METHOD

passport.serializeUser(User.serializeUser());//HOW TO STORE USER INTO SESSION
passport.deserializeUser(User.deserializeUser());//HOW TO GET USER OUT OF SESSION

//-------WILL USE FLASH MESSAGES FOR AUTH----
app.use((req,res,next)=>{
	res.locals.currentUser=req.user;		//ACCESS TO user IN ALL ejs TEMPLATES
	res.locals.success=req.flash('success');
	res.locals.error=req.flash('error');
	next();
})
//------------------------------------------



//-----WILL APPEND THE SPECIFIC STRING AS PREFIX TO ALL ROUTES IN THE routes FOLDER. DONE TO CLEANUP THE APP.JS
app.use("/",userRoutes);
app.use("/games", gamesRoutes);
app.use("/games/:id/comments",commentsRoutes)

//home page
app.get("/", function (req, res) {
	res.render("homepage");
});

//-------------------------------------------------------------------------------------

//ACTION
//when action category is clicked, only games with the below specified tags will be shown
app.get("/genres/action", async function (req, res) {
	const allcards = await GameCard.find({ genres: { $all: ["action"] } }); //$all is added to find wrt all the tags specified.
	res.render("genres/action", { allcards });
});

// ------------------NOT HITTING THIS ROUTE------------------------
// to show specific action game card when clicked on it     ///games/:id
// app.get("/action/:id",
// 	catchAsync(async (req, res) => {
// 		const card = await GameCard.findById(req.params.id).populate("comments");
// 		res.render("games/gameshowpage", { card });
// 	})
// );
//--------------------------------------------------------------------



//FPS

//when FPS category is clicked, only games with the below specified tags will be shown
app.get("/genres/fps", async function (req, res) {
	const allcards = await GameCard.find({ genres: { $all: ["fps"] } });
	res.render("genres/fps", { allcards });
});


//-----------------------------SHOW THE GAME THAT IS SELECTED FROM ALL THE AVAILABLE GAMES LIST------------------
//-----------------------------COMMON TO ALL CATEGORIES----------------------------------------------------------
//--------------------ANY GAME CLICKED IN ANY CATEGORY WILL HIT THIS ROUTE--------------------------------
//games/:id
app.get("/games/:id", async (req, res) => {
	const card = await GameCard.findById(req.params.id).populate("comments");
	console.log(card.comments);
	console.log("-------------------------------");
	console.log(card.comments.body);
	res.render("games/gameshowpage", { card });
});
//--------------------------------------------------------------------------------------------------------------

//------ERROR HANDLING--------

// app.all('*', (req,res,next)=>{
// 	next(new ExpressError('Page Not Found',404))
// });

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Something went wrong!!";
	res.status(statusCode).render("error", { err });
	//res.send("Something went wrong")
});

//----------------------------

const seedDB = async () => {
	await GameCard.deleteMany({});
	for (let i = 0; i < games.length; i++) {
		//const random=Math.floor(Math.random()*3);
		const card = new GameCard({
			game_id: games[i].game_id,
			title: games[i].title,
			short_description: games[i].short_description,
			long_description: games[i].long_description,
			header_image: games[i].header_image,
			poster_image: games[i].poster_image,
			website: games[i].website,
			pc_requirements: games[i].pc_requirements,
			developers: games[i].developers,
			platforms: games[i].platforms,
			genres: games[i].genres,
			tags: games[i].tags,
			metacritic: games[i].metacritic,
			screenshots: games[i].screenshots,
			release_date: games[i].release_date,
			//reviews:games[i].reviews,
		});
		await card.save();
	}
	console.log("Seeding DB complete");
};

app.listen(3000, () => {
	console.log("Serving on port 3000");
	console.log(games.length);
	seedDB();
});



//run mongodb server with command "mongod" from bin folder
