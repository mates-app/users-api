'use strict'
let mongoose = require('mongoose');

let connect = (database) =>{
	let connectionString = `mongodb://localhost/${database || 'matesGame'}`

	mongoose.connect(connectionString);
	let db = mongoose.connection;

	db.on(
		'error', 
		console.error.bind(console, 'connection error:')
	);

	db.once('open', function() {
		console.log(`connected to database ${connectionString}`)
	});

}

module.exports = {
	connect 			: connect
};
