const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	admin: {type: Boolean, default: false}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;