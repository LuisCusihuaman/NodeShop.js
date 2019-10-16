//dependencies
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//app
const app = express();
//routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//listeners
app.listen(3000);
