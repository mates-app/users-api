'use strict'
var mongoose = require('mongoose')
var User = require('./user.model')
let bcrypt = require('bcrypt-nodejs')

let create = (req, res, next) =>{
	if(req.user){
		return next(new Error('User already exists'))
	}else{
		console.log(req.body)
		bcrypt.hash(req.body.password, null, null, function(err, hash) {
			console.log(hash)
			let user = new User({
				username : req.body.username,
				password : hash 
			})

			user.save((err) => {
				if (err) return next(err)
				req.user = user
				next()
			})
		});

	}
}


let findByUsername = (req, res, next) =>{
	let username = req.params.username || req.body.username

	User.findOne({'username': username}, (err, user) =>{
		if(err) return err
		else req.user = user

		next()
	})
}

let loggin = (req, res, next) => {
	if(!req.user){
		req.result = {
			valid   : false,
			message : 'User doesn\'t exists'
		}
		next()
	} else {
		bcrypt.compare(req.body.password, req.user.password, function(err, res) {
			if(res){
				req.result = {
					valid : true,
					user  : req.user
				}
			}else{
				req.result = {
					valid   : false,
					message : 'Password is incorrect'
				}
			}
			next()
		});
	}
}

let nameMatch = (req, res, next) => {
	let username = req.params.username || req.body.username || req.query.username
	let re = new RegExp(username, 'i');

	User.find({'username': re}, (err, users) =>{
		if(err) return err
		else req.users = users
		next()
	}) 
}


let findById = (req, res, next) => {
	var userId = req.params.id || req.body.userId

	if (!mongoose.Types.ObjectId.isValid(userId)) {
	  return next(new Error('You must supply a User ID'))
	}

	var query = User.findById(userId, (err, user) =>{
		if(err != null)
			return next(new Error('You must supply a User ID'))
		else{
			req.user = user
			return next()
		}
	})

}

let remove = (req, res, next) => {
	if(!req.user){
		next(new Error('User does\'t exists'))
	}else{
		bcrypt.compare(req.body.password, req.user.password, function(err, res) {	
			if(res){
				User.remove({ _id : req.user._id}, (err, doc) =>{
					if(err) return err
						req.result = {
						valid : true,
						user  : req.user
					}
					next()
				})
			}else{
				req.result = {
					valid   : false,
					message : 'Password is incorrect'
				}
				next()
			}
		});
	}

	
}

let exists = (req, res, next) => {
	req.result = req.user !== null && req.user !== undefined
	next()
}


module.exports = {
	create 				: create,	
	findByUsername		: findByUsername,
	findById			: findById,
	loggin				: loggin,
	nameMatch			: nameMatch,
	remove				: remove,
	exists				: exists
}
