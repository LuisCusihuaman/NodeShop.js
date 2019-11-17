const mongoConnect = require("../util/database").mongoConnect;

class Product {
	constructor(title, price, description, imageUrl) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
	}
	async save() {
		const db = mongoConnect.db();
		try {
			return await db.collection("products").insertOne(this);
		} catch (error) {
			console.log(error);
		}
	}
	static fetchAll() {
		const db = mongoConnect.db();
		return db
			.collection("products")
			.find()
			.toArray()
			.then(products => {
				console.log(products);
				return products;
			})
			.catch(err => console.log(err));
	}
}
module.exports = Product;
