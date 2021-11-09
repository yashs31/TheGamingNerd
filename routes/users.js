const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get("/register", (req, res) => {
	res.render("users/register");
});

router.post(
	"/register",
	catchAsync(async (req, res) => {
		try {
			const { email, username, password } = req.body;
			const user = new User({ email, username });
			const registeredUser = await User.register(user, password);
			req.login(registeredUser, (err) => {
				if (err) {
					return next(err);
				}
				req.flash("success", "Welcome <username here>!");
				req.session.returnTo=req.session.returnTo || "/";
				// delete req.session.returnTo;
				console.log("register:"+req.session.returnTo);
				res.redirect(req.session.returnTo);
			});
		} catch (e) {
			req.flash("error", e.message);
			res.redirect("register");
		}
		console.log(registeredUser);
	})
);

router.get("/login", (req, res) => {
	res.render("users/login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureFlash: true,
		failureRedirect: "/login",
	}),
	(req, res) => {
		//console.log(user);
		req.flash("success", "Welcome back <username here>!");
		req.session.returnTo=req.session.returnTo || "/";
		// delete req.session.returnTo;
		console.log("login:"+req.session.returnTo);
		res.redirect(req.session.returnTo);
	}
);

router.get("/logout", (req, res) => {
	req.logout();
	//req.flash("success","Adios");
	req.session.returnTo = '/';
	console.log("logout:"+req.session.returnTo);
	res.redirect(req.session.returnTo);
});
module.exports = router;
