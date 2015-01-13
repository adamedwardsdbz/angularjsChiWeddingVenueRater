'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Venue Schema
 */
var VenueSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Venue name',
		trim: true
	},
	price:{
		type: Number,
		default: '',
		required: 'Please fill Venue price'

	},
	capacity: {
		type: Number,
		default: '',
		required: 'Please fill Venue capacity'
	},
	perks:{
		type: String,
		default: '',
		trim: true
	},
	address:{
		type: String,
		default: '',
		required: 'Please fill Venue address',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Venue', VenueSchema);