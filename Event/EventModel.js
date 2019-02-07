const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const EventSchema = new mongoose.Schema({
	name: {type: String, required: true},
	coord: {type: String, required: true},
	budget: {type: String, required: true},
	desc: {type: String, required: true},
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;