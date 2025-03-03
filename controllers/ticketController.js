const Ticket = require('../models/ticketModel')

const ticketController = {
    async createTicket(req, res) {
        try {
            const {event, type, price, stock} = req.body;

            if (!event || !type || !price || !stock) {
                return res.status(400).json({
                    success: false,
                    message: 'Fields is required'
                })
            }

            const eventArray = event ? event.split(",").map(id => id.trim()) : [];

            const data = {
                event: eventArray,
                type,
                price: Number(price),
                stock
            }

            const ticket = await Ticket.create(data)

            return res.status(201).json({
                success: true,
                message: 'Ticket created',
                data: ticket
            })
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    async getTicket(req, res) {
        try {
            const ticket = await Ticket.find()

            if (!ticket) {
                return res.status(400).json({
                    success: false,
                    message: 'Ticket not found'
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Get data ticket',
                data: ticket
            })
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
            
        }
    }
}

module.exports = { ticketController }