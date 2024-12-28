// routes/contactRoutes.js
const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'contact.html'));
});

router.post('/contact', (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });

    newContact.save()
        .then(() => {
            res.status(201).json({ message: 'Contact saved successfully!' });
        })
        .catch(err => {
            console.error('Error saving contact:', err);
            res.status(500).json({ message: 'Error saving contact' });
        });
});

module.exports = router;
