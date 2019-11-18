const mongoConnect = require("../util/database").mongoConnect;
const mongodb = require("mongodb");

class Product {
	constructor(title, price, description, imageUrl, id, userId) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = id ? new mongodb.ObjectID(id) : null;
		this.userId = userId;
	}
	async save() {
		const db = mongoConnect.db();
		try {
			if (this._id) {
				return await db
					.collection("products")
					.updateOne({ _id: this._id }, { $set: this });
			} else {
				return await db.collection("products").insertOne(this);
			}
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
	async deleteById(prodId) {
		const db = mongoConnect.db();
		try {
			return await db
				.collection("products")
				.deleteOne({ _id: new mongodb.ObjectId(prodId) });
		} catch (error) {
			console.log(error);
		}
	}
}
module.exports = Product;
