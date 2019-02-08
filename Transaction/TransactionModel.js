const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TransactionSchema = new mongoose.Schema({
	title: {type: String, required: true},
	amount: {type: String, required: true},
	desc: {type: String, required: true},
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports = TransactionModel;