const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
/* const User = require("./models/user"); */

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/* app.use((req, res, next) => {
	User.findById("5dd322b91c9d440000b44c37")
		.then(user => {
			req.user = new User(user.name, user.email, user.cart, user._id);
			next();
		})
		.catch(err => console.log(err));
}); */

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const uri = `mongodb+srv://Luis:GqAkni$+Df_ut2C@cluster0-vmurt.mongodb.net/shop?retryWrites=true&w=majority`;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		app.listen(3000);
		console.log("connected");
	})
	.catch(err => console.log(err));
