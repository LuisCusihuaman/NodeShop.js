const mongoConnect = require("../util/database").mongoConnect;
const mongodb = require("mongodb");

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
	static findById(prodId) {
		let idSearched = new mongodb.ObjectID(prodId);
		const db = mongoConnect.db();

		return db
			.collection("products")
			.find({ _id: idSearched })
			.next()
			.then(product => {
				return product;
			})
			.catch(() => {});
	}
}
module.exports = Product;
