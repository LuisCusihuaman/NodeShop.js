const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: false
	});
};

exports.postLogin = (req, res, next) => {
	User.findById("5e6853445cd2ef2960bc2971")
		.then(user => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			req.session.save(err => {
				res.redirect("/");
			});
		})
		.catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		//aqui pr alguna razon tira indefinido si imprimo el error
		res.redirect("/");
	});
};
