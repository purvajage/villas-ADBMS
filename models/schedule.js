// models/scheduleModel.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    rooms: { type: Number, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
