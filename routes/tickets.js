const express = require('express');
const ticketsCtrl = require('../controllers/tickets');

const router = express.Router();

router.get('/flights/:id/tickets/new', ticketsCtrl.new);
router.post('/flights/:id/tickets', ticketsCtrl.create);
router.delete('/flights/:id/tickets', ticketsCtrl.delete);

module.exports = router;
