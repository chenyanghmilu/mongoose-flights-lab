var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

const index = (req, res) => {
	Flight.find({}, (err, flights) => {
		res.render('flights/index', {
			title: 'Flights',
			flights
		});
	});
};

const show = (req, res) => {
	Flight.findById(req.params.id, function(err, flight) {
		Ticket.find({ flight: flight._id }, function(err, tickets) {
			res.render('flights/show', {
				title: 'Flight Details',
				flight,
        flightId: req.params.id,
        tickets
			});
		});
	});
};

const newFlight = (req, res) => {
	res.render('flights/new', { title: 'Add Flight' });
};

const createFlight = (req, res) => {
	for (let key in req.body) {
		if (req.body[key] === '') delete req.body[key];
	}
	const flight = new Flight(req.body);
	flight.save(function(err, doc) {
		if (err) return res.render('flights/new');
		res.redirect('/flights');
	});
};

module.exports = {
  index,
  show,
  new: newFlight,
  create:createFlight,
};