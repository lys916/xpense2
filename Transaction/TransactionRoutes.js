const express = require('express');
// const stripe = require("stripe")("sk_test_5XOQ1slHb1beF5FTI6i869at");
const mongoose = require('mongoose');
const transactionRouter = express.Router();
const Transaction = require('./TransactionModel.js');


// const CustomFood = require('./CustomFoodModel');

transactionRouter.get('/', function(req, res){
  console.log('server, getting transactions');
  Transaction.find({}).sort('dateCreated').then(trans=>{
    console.log('trans from db', trans);
    res.json(trans);
  });
});

transactionRouter.post('/create', function(req, res){
  console.log(req.body);
    Transaction.create(req.body).then(saved=>{
      console.log('saved', saved);
      res.send(saved);
    });
});

transactionRouter.post('/delete', function(req, res){
    const {id} = req.body;

    console.log('id', id);
	Transaction.findOneAndRemove({_id: id}).then(deleted => {
    console.log('deleted', deleted);
		res.json(deleted);
	});
});

// customFoodRouter.post('/updateFood', function(req, res){
//     console.log('updating custom food', req.body);
// 	CustomFood.findByIdAndUpdate(req.body._id, req.body, {new: true}).then(updated => {
// 		res.json(updated);
// 	});
// });

// customFoodRouter.get('/getFoods', function(req, res){
//     const {userId} = req.query;
//     console.log('get custom foods id', userId);
// 	CustomFood.find({user: userId}).then(post => {
// 		res.json(post);
// 	});
// });

// customFoodRouter.delete('/deleteFood', function(req, res){
//     const {id} = req.query;
// 	CustomFood.findByIdAndRemove(id).then(deleted => {
// 		res.json(deleted);
// 	});
// });

// postRouter.get('/', function(req, res){
// 	const search =  req.query.search;
// 	if(search){
// 		const filter = new RegExp(search, 'i');
// 		Post.find({$or : [{title: filter}, {cuisine: filter}, {tags: filter}]})
// 		.populate('user', 'name')
// 		.then(posts => {
// 			res.json(posts);
// 		})
// 	} 
// });

// postRouter.get('/:id', function(req, res){
// 	const id = req.params.id;
// 	// find posts that owns by the people 'id user' is following...
// 	if (id){
// 		User.findById(id).then(user => {
// 			Post.find({ 'user' : { $in: user.following } })
// 			.sort({createdOn: -1})
// 			.populate('user')
// 			.then(posts => {
// 				console.log('res posts', posts);
// 			res.json(posts);
// 		})	
// 		});
		
// 	}
// });

// postRouter.post('/', function(req, res){
// 	console.log(req.body);
// 	// Post.find().then(posts => {
// 	// 	res.json(posts);
// 	// });
// });

module.exports = transactionRouter;
