const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/villas')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
});

// Schedule schema
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

// Models
const Contact = mongoose.model('Contact', contactSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Serve contact form
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Handle the POST request to save contact data
app.post('/contact', (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });

    // Save the contact data to MongoDB
    newContact.save()
        .then(() => {
            res.status(201).json({ message: 'Contact saved successfully!' });
        })
        .catch(err => {
            console.error('Error saving contact:', err);
            res.status(500).json({ message: 'Error saving contact' });
        });
});

// Serve schedule form
app.get('/schedule', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'schedule.html'));
});

// Handle the POST request to save schedule data
app.post('/schedule', (req, res) => {
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

    // Save the schedule data to MongoDB
    newSchedule.save()
        .then(() => {
            res.status(201).json({ message: 'Schedule saved successfully!' });
        })
        .catch(err => {
            console.error('Error saving schedule:', err);
            res.status(500).json({ message: 'Error saving schedule' });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
