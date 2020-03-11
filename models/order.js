const moongose = require("mongoose");
const Schema = moongose.Schema;

const orderSchema = new Schema({
	products: [
		{
			product: {
				type: Object,
				require: true
			},
			quantity: {
				type: Number,
				require: true
			}
		}
	],
	user: {
		name: {
			type: String,
			require: true
		},
		userId: {
			type: Schema.Types.ObjectId,
			require: true,
			ref: "User"
		}
	}
});

module.exports = moongose.model("Order", orderSchema);
