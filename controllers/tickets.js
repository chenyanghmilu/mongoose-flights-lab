var Flight = require('../models/flight');
var Ticket = require('../models/ticket');


const newTicket = (req, res) => {
  Flight.findById(req.params.id, function(err, flight) {
    res.render('tickets/new', {
      title: 'Add Ticket',
      flight
    });
  })
};

const createTicket = (req, res) => {
	Flight.findById(req.params.id, function(err, flight) {
    if (err || !flight) {
      return res.redirect('/flights')
    }
    Ticket.create(req.body, function(err, ticket) {
      ticket.flight = flight;
      ticket.save(function(err) {
        res.redirect(`/flights/${flight._id}/details`);
      })
    });
	});
};

const deleteTicket = (req, res) => {
  Ticket.findByIdAndDelete(req.params.id, function(err, ticket) {
    res.redirect(`/flights/${ticket.flight}/details`);
  });
};

module.exports = {
  create: createTicket,
  new: newTicket,
  delete: deleteTicket
};
