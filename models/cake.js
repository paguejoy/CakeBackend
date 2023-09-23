
const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({

	title: {
		type: String,
		required: [true, "title name is required"]
	},
    description: {
		type: String,
		required: [true, "description is required"]
	},
    image: {
		type: String,
		default: null
	},
	difficulty: {
		type: String,
		required: [true, "difficulty is required"]
	},
	portion: {
		type: String,
		required: [true, "portion is required"]
	},
    time: {
		type: String,
		required: [true, "Courtimese is required"]
	},
    type: {
		type: String,
		required: [true, "type is required"]
	},
    cuisine: {
		type: String,
		required: [true, "Cuisine is required"]
    },
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	category: {
        type: [String],
        default: undefined
    },
    ingredients: {
		type: [String],
		default: undefined
	},
    method: {
		type: Array
	}
})

module.exports = mongoose.model("Cake", cakeSchema);