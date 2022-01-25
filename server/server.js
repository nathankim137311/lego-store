require('dotenv').config()

const express = require('express');
const app = express(); 
const PORT = 3000; 
const path = __dirname + '/views/';

app.use(express.json());
app.use(express.static(path));

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY); 

app.get('/', (req, res) => {
    res.sendFile(path + 'index.html');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));