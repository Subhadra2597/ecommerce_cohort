const e=require("express")

const authUser =require("../middlewares/authUser")
let stripe = require('stripe');
const client_domain = process.env.CLIENT_DOMAIN;

let Stripe = new stripe(process.env.Stripe_Private_Api_Key);

const router = e.Router();

//create checkout session
router.post("/create-checkout-session", authUser, async (req, res, next) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product?.productId?.title,
                    images: [product?.productId?.image],
                },
                unit_amount: Math.round(product?.productId?.price * 100),
            },
            quantity: 1,
        }));

        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
});

// check payment status
router.get("/session-status", async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await Stripe.checkout.sessions.retrieve(sessionId);

        res.send({
            data: session,
            status: session?.status,
            customer_email: session?.customer_details?.email,
            session_data: session,
        });
    } catch (error) {
        res.status(error?.statusCode || 500).json(error.message || "internal server error");
    }
});

module.exports=router