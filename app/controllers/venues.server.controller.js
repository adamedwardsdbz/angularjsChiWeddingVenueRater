'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Venue = mongoose.model('Venue'),
	_ = require('lodash');

/**
 * Create a Venue
 */
exports.create = function(req, res) {
	var venue = new Venue(req.body);
	venue.user = req.user;

	venue.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(venue);
		}
	});
};

/**
 * Show the current Venue
 */
exports.read = function(req, res) {
	res.jsonp(req.venue);
};

/**
 * Update a Venue
 */
exports.update = function(req, res) {
	var venue = req.venue ;

	venue = _.extend(venue , req.body);

	venue.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(venue);
		}
	});
};

/**
 * Delete an Venue
 */
exports.delete = function(req, res) {
	var venue = req.venue ;

	venue.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(venue);
		}
	});
};

/**
 * List of Venues
 */
exports.list = function(req, res) { Venue.find().sort('-created').populate('user', 'displayName').exec(function(err, venues) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(venues);
		}
	});
};

/**
 * Venue middleware
 */
exports.venueByID = function(req, res, next, id) { Venue.findById(id).populate('user', 'displayName').exec(function(err, venue) {
		if (err) return next(err);
		if (! venue) return next(new Error('Failed to load Venue ' + id));
		req.venue = venue ;
		next();
	});
};

/**
 * Venue authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.venue.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};