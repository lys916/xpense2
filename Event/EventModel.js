const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const EventSchema = new mongoose.Schema({
	name: {type: String, required: true},
	coord: {type: String, required: true},
	budget: {type: String, required: true},
	desc: {type: String, required: true},
	dateCreated: {type: Date, default: Date.now()},
	transactions: [{type: ObjectId, ref: 'Transaction'}]
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;