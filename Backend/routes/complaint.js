const express = require('express');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const router = express.Router();

router.post('/complaint', async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (user.complaintRaised) {

    return res.json({
        success: false,
        message: "Your Complaint Email is already sent to the admin. We'll try to resolve as soon as possible."
    });

}

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'shellshellyshe@gmail.com',
    subject: 'ParkLink Complaint Alert',
    text: `
Dear Admin,

Booked Slot For

USERNAME: ${user.username}
Vehicle Number: ${user.vehicleNumber}
Vehicle Type: ${user.vehicleType}
Email-ID: ${user.email}

is used by some other vehicle owner. 
Kindly resolve.
`
};

await transporter.sendMail(mailOptions);

user.complaintRaised = true;
await user.save();

res.json({
    success: true,
    message: 'Complaint Email Sent Successfully'
});

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });

    }
});

module.exports = router;