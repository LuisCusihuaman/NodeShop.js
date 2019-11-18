const mongoConnect = require("../util/database").mongoConnect;
const ObjectId = require("mongodb").ObjectId;

class User {
	constructor(username, email) {
		this.name = username;
		this.email = email;
	}
	async save() {
		const db = mongoConnect.db();
		try {
			return await db.collection("users").insertOne(this);
		} catch (error) {
			console.log(error);
		}
	}
	static async findById(prodId) {
		let userId = new ObjectId(prodId);
		const db = mongoConnect.db();

		return db
			.collection("users")
			.findOne({ _id: userId })
			.then(user => {
				console.log(`el usuario es: `,user);
				return user;
			})
			.catch(err => console.log(err));
	}
}

module.exports = User;
