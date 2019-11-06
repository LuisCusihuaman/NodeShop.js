const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
const bodyParser = require("body-parser");
const db = require("./util/database");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
app.use("/admin", adminRoutes);
app.use(shopRoutes);
const errorController = require("./controllers/error");
app.use(errorController.get404);

app.listen(4000);
