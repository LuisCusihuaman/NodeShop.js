const mongoConnect = require("../util/database").mongoConnect;
const ObjectId = require("mongodb").ObjectId;

class User {
	constructor(username, email, cart, id) {
		this.name = username;
		this.email = email;
		this.cart = cart; //{items: []}
		this._id = id;
	}
	async save() {
		const db = mongoConnect.db();
		try {
			return await db.collection("users").insertOne(this);
		} catch (error) {
			console.log(error);
		}
	}

	addToCart(product) {
		/* 	const cartProduct = this.cart.items.findIndex(cp => {
			return cp._id === product._id;
		}); */
		const updatedCart = {
			items: [{ productId: new ObjectId(product._id), quantity: 1 }]
		};
		const db = mongoConnect.db();
		return db
			.collection("users")
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCart } }
			);
	}

	static async findById(prodId) {
		let userId = new ObjectId(prodId);
		const db = mongoConnect.db();

		return db
			.collection("users")
			.findOne({ _id: userId })
			.then(user => {
				console.log(`el usuario es: `, user);
				return user;
			})
			.catch(err => console.log(err));
	}
}

module.exports = User;
