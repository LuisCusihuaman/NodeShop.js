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

	async addToCart(product) {
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
			)
			.catch(err => console.log(err));
	}

	getCart() {
		const db = mongoConnect.db();
		console.log(this.cart);
		const productsIds = this.cart.items.map(i => i.productId);
		return db
			.collection("products")
			.find({ _id: { $in: productsIds } })
			.toArray()
			.then(products => {
				console.log(products);
				return products.map(p => {
					return {
						...p,
						quantity: this.cart.items.find(
							i => i.productId.toString() === p._id.toString()
						).quantity
					};
				});
			})
			.catch(err => console.log(err));
	}

	deleteItemFromCart(productId) {
		const updatedCartItems = this.cart.items.filter(item => {
			item.productId.toString() !== productId.toString();
		});
		const db = mongoConnect.db();
		return db
			.collection("users")
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCartItems } }
			);
	}

	async addOrder() {
		const db = mongoConnect.db();
		return this.getCart()
			.then(products => {
				const order = {
					items: products,
					user: {
						_id: new ObjectId(this._id),
						name: this.name
					}
				};
				return db.collection("orders").insertOne(order);
			})
			.then(async () => {
				this.cart = { items: [] };
				return db
					.collection("users")
					.updateOne(
						{ _id: new ObjectId(this._id) },
						{ $set: { cart: { items: [] } } }
					)
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}

	getOrders() {}

	static async findById(prodId) {
		let userId = new ObjectId(prodId);
		const db = mongoConnect.db();

		return db
			.collection("users")
			.findOne({ _id: userId })
			.then(user => {
				return user;
			})
			.catch(err => console.log(err));
	}
}

module.exports = User;
