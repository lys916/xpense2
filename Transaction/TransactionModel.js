const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TransactionSchema = new mongoose.Schema({
	title: {type: String, required: true},
	amount: {type: String, required: true},
	desc: {type: String, required: true},
	createdBy: {type: String, default: 'TestUser'},
	createdOn: {type: Date, default: Date().toString()},
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports = TransactionModel;