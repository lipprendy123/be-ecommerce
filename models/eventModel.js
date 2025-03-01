const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  image: [{type: String, required: true}], // URL gambar event
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referensi ke admin yang buat event
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }], // Daftar tiket yang tersedia
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Peserta yang mendaftar
  status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
