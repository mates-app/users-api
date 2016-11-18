'use strict'
var express = require('express');
var router = express.Router();
let UserDao = require('./user.dao')

let successUser   = (req, res, next) => res.send(req.user)
let successUsers  = (req, res, next) => res.send(req.users)
let successResult = (req, res, next) => res.send(req.result)

router.post('/', 
    UserDao.findByUsername,
    UserDao.create,
    successUser)

router.post('/login',
    UserDao.findByUsername,
    UserDao.loggin,
    successResult)

router.get('/name-match/:username',
    UserDao.nameMatch,
    successUsers)

router.get('/exists/:username', 
    UserDao.findByUsername,
    UserDao.exists,
    successResult)

router.delete('/',
    UserDao.findByUsername,
    UserDao.remove,
    successResult)

module.exports = router;