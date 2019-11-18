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
		const cartProductIndex = this.cart.items.findIndex(cp => {
			return cp.productId.toString() === product._id.toString();
		});
		let newQuantity = 1;
		const updatedCartItems = [...this.cart.items];

		if (cartProductIndex >= 0) {
			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
			updatedCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({
				productId: new ObjectId(product._id),
				quantity: newQuantity
			});
		}
		const updatedCart = {
			items: updatedCartItems
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
