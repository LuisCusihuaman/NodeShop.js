const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://Luis:GqAkni$+Df_ut2C@cluster0-vmurt.mongodb.net/shop?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

exports.mongoConnect = client;
