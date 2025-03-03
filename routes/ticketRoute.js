const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { ticketController } = require('../controllers/ticketController');

const ticketRoute = express.Router()

ticketRoute.post('/ticket', authMiddleware , ticketController.createTicket);
ticketRoute.get('/ticket', ticketController.getTicket);


module.exports = ticketRoute;