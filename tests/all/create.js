"use strict"
var request             = require('request')
var scenarios           = require('../scenarios')
var assert              = require('chai').assert


describe("Create", function() {
    before((done) =>{
        scenarios.load('01', () => done())
    })

    describe("Create correctly", function() {
       it('with correct username and password', () => {})
    });

});



