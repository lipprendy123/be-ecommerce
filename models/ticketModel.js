const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    type: { type: String, required: true }, // Misal: Regular, VIP, VVIP
    price: { type: Number, required: true },
    stock: { type: Number, required: true }, // Jumlah tiket yang tersedia
  }, { timestamps: true });
  
  module.exports = mongoose.model("Ticket", ticketSchema);
  