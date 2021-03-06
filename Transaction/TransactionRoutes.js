const express = require('express');
// const stripe = require("stripe")("sk_test_5XOQ1slHb1beF5FTI6i869at");
const mongoose = require('mongoose');
const transactionRouter = express.Router();
const Transaction = require('./TransactionModel.js');
const Event = require('../Event/EventModel.js');

const fs = require('fs');
const gridfs = require('mongoose-gridfs');


// const CustomFood = require('./CustomFoodModel');

transactionRouter.get('/', function(req, res){ 
  console.log('server, getting transactions');
  const { userId} = req.query;
  Transaction
    .find({user: userId}).
    sort({createdOn: -1})
    .populate('event')
    .then(trans=>{
    // console.log('trans from db', trans);
    res.json(trans);
  });
});

// function _arrayBufferToBase64( buffer ) {
//     var binary = '';
//     var bytes = new Uint8Array( buffer );
//     var len = bytes.byteLength;
//     for (var i = 0; i < len; i++) {
//         binary += String.fromCharCode( bytes[ i ] );
//     }
//     return window.btoa( binary );
// }

transactionRouter.post('/create', function(req, res){
  // save image to aws and save image url to mongo

  // const { title, amount, desc, images} =  req.body;
    Transaction.create(req.body).then(tran=>{
      Event.findById(tran.event).then(event => {
        event.transactions.push(tran._id);
        event.save().then(savedEvent=>{
          tran.populate('event', function(err) {
            res.json(tran);
          });
        });
      });
      // console.log('saved', saved);
      // const buffer = saved.images[0].image;
      // console.log('BUFFER', buffer);
      // let base64data = buffer.toString('base64');
      // console.log('converted', base64data);
      // const base64 = _arrayBufferToBase64(saved.images.image);
      // console.log('base64 converted', base64);
      
    });
});

transactionRouter.post('/delete', function(req, res){
    const {id} = req.body;

    console.log('id', id);
	Transaction.findOneAndRemove({_id: id}).then(deleted => {
    // console.log('deleted', deleted);
    Event.findById(deleted.event).then(event =>{
      console.log('event trans', event.transactions);
      console.log('before len', event.transactions.length);
      event.transactions.splice(event.transactions.indexOf(deleted._id), 1);
      console.log('after len', event.transactions.length);
      event.save().then(savedUpdatedEvent => {
        res.json(deleted);
      });
    });
		
	});
});

transactionRouter.get('/:id', function(req, res){
  console.log('getting single transaction');
	const id = req.params.id;
  console.log(id);
	// find posts that owns by the people 'id user' is following...
	if (id){
		Transaction.findById(id).then(transaction => {

				// console.log('res posts', posts);
			res.json(transaction);
	
		});
		
	}
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



// postRouter.post('/', function(req, res){
// 	console.log(req.body);
// 	// Post.find().then(posts => {
// 	// 	res.json(posts);
// 	// });
// });

module.exports = transactionRouter;
