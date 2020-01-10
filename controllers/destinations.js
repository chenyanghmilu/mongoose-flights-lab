var Flight = require('../models/flight');

let createDestination = (req, res) => {
  Flight.findById(req.params.id, function(err, flight) {
    if (err || !flight) {
      return res.redirect('/flights')
    }
		flight.destinations.push(req.body);
		flight.save(function(err) {
			res.redirect(`/flights/${flight._id}/details`);
		});
	});
};

module.exports = {
  create: createDestination
};