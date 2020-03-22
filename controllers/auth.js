const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	let message = req.flash("error");
	message = message.length > 0 ? message[0] : null;
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		errorMessage: message
	});
};

exports.getSignup = (req, res, next) => {
	let message = req.flash("error");
	message = message.length > 0 ? message[0] : null;
	res.render("auth/signup", {
		path: "/signup",
		pageTitle: "Signup",
		errorMessage: message
	});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then(user => {
			if (!user) {
				return res.redirect("/login");
			}
			bcrypt
				.compare(password, user.password)
				.then(doMatch => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save(() => {
							res.redirect("/");
						});
					}
					req.flash("error", "Invalid Email o password");
					res.redirect("/login");
				})
				.catch(err => {
					console.log(err);
					res.redirect("/login");
				});
		})
		.catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	User.findOne({ email: email })
		.then(userDoc => {
			if (userDoc) {
				req.flash("error", "E-mail exists already, please pick a different one.");
				return res.redirect("/signup");
			}
			return bcrypt
				.hash(password, 12)
				.then(hashedPassword => {
					const user = new User({
						email: email,
						password: hashedPassword,
						cart: { items: [] }
					});
					return user.save();
				})
				.then(() => res.redirect("/login"));
		})

		.catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		//aqui pr alguna razon tira indefinido si imprimo el error
		res.redirect("/");
	});
};
