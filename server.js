require('dotenv').config()
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express(); 

const PORT = process.env.PORT || 3001; 
const path = __dirname + '/client/build/';
const bodyParser = require('body-parser');

//Import Routes 
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const stripeRoute = require('./routes/stripe');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path));

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api', dashboardRoute);
app.use('/api', stripeRoute);

mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to mongodb'));

// Get home page 
app.get('/*', (req, res) => {
    res.sendFile(path + 'index.html');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));