const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TransactionSchema = new mongoose.Schema({
	user: {type: ObjectId, ref: 'User'},
	title: {type: String},
	amount: {type: String},
	desc: {type: String},
	createdBy: {type: String, default: 'TestUser'},
	createdOn: {type: Date, default: Date().toString()},
	images: [{ type: String }]
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports = TransactionModel;