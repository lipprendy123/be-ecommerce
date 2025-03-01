const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const {upload, uploadMultiple} = require('../middlewares/upload')
const {eventController} = require('../controllers/eventController')

const eventRoute = express.Router()

eventRoute.post('/event', authMiddleware , uploadMultiple, eventController.createEvent);
eventRoute.get('/event', eventController.getEvent);


module.exports = eventRoute;