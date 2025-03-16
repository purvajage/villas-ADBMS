// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const contactRoutes = require('./routes/contactroutes');
const scheduleRoutes = require('./routes/scheduleroutes');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const uri=process.env.MONGODB_URI
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/routes', express.static(path.join(__dirname, 'routes')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));


mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error:', error));


app.use(contactRoutes);
app.use(scheduleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
