const User = require("../models/user");

module.exports.renderRegister=(req, res) => {
	res.render("users/register");
}

module.exports.register=async (req, res) => {
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
}

module.exports.renderLogin= (req, res) => {
	res.render("users/login");
}

module.exports.login=(req, res) => {
    //console.log(user);
    req.flash("success", "Welcome back <username here>!");
    req.session.returnTo=req.session.returnTo || "/";
    // delete req.session.returnTo;
    console.log("login:"+req.session.returnTo);
    res.redirect(req.session.returnTo);
}

module.exports.logout=(req, res) => {
	req.logout();
	//req.flash("success","Adios");
	req.session.returnTo = '/';
	console.log("logout:"+req.session.returnTo);
	res.redirect(req.session.returnTo);
}