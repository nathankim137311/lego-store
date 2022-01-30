require('dotenv').config()
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express(); 
const PORT = 3001; 
const path = __dirname + '/views/';
const bodyParser = require('body-parser');
const User = require('./models/User');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY); 

//Import Routes 
const authRoute = require('./routes/auth');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path));

// Route Middlewares
app.use('/api/user', authRoute);

mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to mongodb'));

app.get('/', (req, res) => {
    res.sendFile(path + 'index.html');
});

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], 
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.set, 
                            images: item.images,
                        },
                        unit_amount: item.price === 0 ? 0 : (item.price + 1) * 100,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));