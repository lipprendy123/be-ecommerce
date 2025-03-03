const Event = require('../models/eventModel')

const eventController = {
    async createEvent(req, res) {
        try {
            const { title, description, date, location, tickets, attendees, category, status } = req.body;
    
            if (!title || !description || !date || !location || !tickets) {
                return res.status(400).json({
                    success: false,
                    message: "Missing details"
                });
            }
    
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Field image is required"
                });
            }
    
            const filePaths = req.files.map(file => file.filename);
    
            const ticketArray = tickets ? tickets.split(",").map(id => id.trim()) : []

            const categoryArray = category ? category.split(",").map(id => id.trim()) : []

            const eventDate = new Date(date);
            if (eventDate < new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date: Cannot create event in the past"
                });
            }
    
            const data = {
                title,
                description,
                date: eventDate,
                location,
                image: filePaths,
                tickets: ticketArray,
                category: categoryArray
            };
    
            const event = await Event.create(data);
    
            return res.status(201).json({
                success: true,
                message: 'Event created😊',
                data: event
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    async getEvent(req, res) {
        try {
            const event = await Event.find()

            return res.status(200).json({
                success: true,
                message: 'Get data event success😉',
                data: event
            })
        } catch (error) {
            console.log(error)
            
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
}

module.exports = {eventController}