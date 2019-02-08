const express = require('express');
const User = require('./UserModel.js');
const userRouter = express.Router();
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post('/signup', function(req, res){
	const { email, password, name } = req.body;
	User.find({email}).then(userFound=>{
		console.log('user found', userFound);
		if(userFound.length > 0){
			res.json({errorMessage: 'You already have an account with his email. Please log in.'})
		}else{
			const user = new User();
			user.email = email;
			user.name = name;

			// bcrypt.hash(password, 11, (err, hash) => {
			// 	if (err) throw err;
			// 	user.password = hash;
			// 	user.save().then(savedUser => {
			// 		res.json(savedUser);
			// 	});
			// });
		}
	})
	
});

userRouter.post('/login', function(req, res){
	const { email, password } = req.body;
	User.findOne({ email }).then(user => {
		if(!user){
			res.json({errorMessage: 'Wrong username or password'});
		}
		if(user){
			// bcrypt.compare(password, user.password, function(err, valid) {
    		// 	if(!valid){
    		// 		res.json({errorMessage: 'Wrong username or password'});
			// 	}
			// 	console.log('pwd valid', true)
    		// 	const token = jwt.sign(user, 'This is a secret string', { expiresIn: '1h' });
        	// 	res.json({ token: token, username: user.name, email: user.email });
			// });
		}
	});
});

module.exports = userRouter;