const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY); 

// Create checkout session 
router.post('/stripe-checkout', async (req, res) => {
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
            success_url: `${process.env.SERVER_URL}/order`,
            cancel_url: `${process.env.SERVER_URL}/cart`
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;