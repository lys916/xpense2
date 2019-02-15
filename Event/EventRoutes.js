const express = require('express');
// const stripe = require("stripe")("sk_test_5XOQ1slHb1beF5FTI6i869at");
const mongoose = require('mongoose');
const eventRouter = express.Router();
const Event = require('./EventModel.js');


// const CustomFood = require('./CustomFoodModel');

eventRouter.get('/', function(req, res){
  Event.find({}).sort('dateCreated').then(events=>{
    res.json(events);
  });
});


eventRouter.get('/:id', function(req, res){
  console.log('getting single event');
	const id = req.params.id;
  console.log(id);
	// find posts that owns by the people 'id user' is following...
	if (id){
		Event.findById(id).then(event => {

				// console.log('res posts', posts);
			res.json(event);
	
		});
		
	}
});

eventRouter.post('/create', function(req, res){
  console.log(req.body);
    Event.create(req.body).then(saved=>{
      console.log('saved', saved);
      res.send(saved);
    });
});

eventRouter.post('/delete', function(req, res){
    const {id} = req.body;

    console.log('id', id);
	Event.findOneAndRemove({_id: id}).then(deleted => {
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

module.exports = eventRouter;
