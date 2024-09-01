const stripe = require("stripe")(process.env.stripe_key);
const router = require("express").Router();
const Booking = require("../models/bookingModel")
const Show = require("../models/showModel")

router.post('/makePayment', async(req,res)=>{
    try {
        const { token, amount } = req.body;
        console.log(amount,"amount")
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency :"INR"
        })
        const transactionId = paymentIntent.client_secret;
        res.send({
            success:true,
            message:"Payment Successfull",
            data:transactionId
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

router.post("/bookShow", async (req, res) => {
    try {
        // save booking
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show);

        // update seats
        await Show.findByIdAndUpdate(
            req.body.show , // or simply { showId }
            {
              bookedSeats: [...show.bookedSeats, ...req.body.seats],
            }
          );
          
        res.send({
            success:true,
            message:"Show Booked Successfully",
            data: newBooking
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

exports.router = router;