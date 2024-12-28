// routes/scheduleRoutes.js
const express = require('express');
const Schedule = require('../models/schedule');
const router = express.Router();

router.get('/schedule', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'schedule.html'));
});

router.post('/schedule', (req, res) => {
    const newSchedule = new Schedule({
        destination: req.body.destination,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        rooms: req.body.rooms,
        adults: req.body.adults,
        children: req.body.children,
        email: req.body.email,
        phone: req.body.phone,
    });

    newSchedule.save()
        .then(() => {
            res.status(201).json({ message: 'Schedule saved successfully!' });
        })
        .catch(err => {
            console.error('Error saving schedule:', err);
            res.status(500).json({ message: 'Error saving schedule' });
        });
});

module.exports = router;
