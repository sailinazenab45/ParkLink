const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

/*
CREATE ACCOUNT
*/
router.post('/register', async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Account Created Successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});



router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password'
            });
        }

        res.json({
            success: true,
            message: 'Login Successful',
            user: {
                username: user.username,
                email: user.email,
                slot: user.slot,
                vehicleInfoCompleted:
                    user.vehicleInfoCompleted
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});
router.post('/vehicle-info', async (req, res) => {

    try {

        const {
            email,
            slot,
            vehicleNumber,
            vehicleType,
            vehicleModel,
            fuelType
        } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.slot = slot;
        user.vehicleNumber = vehicleNumber;
        user.vehicleType = vehicleType;
        user.vehicleModel = vehicleModel;
        user.fuelType = fuelType;
        user.vehicleInfoCompleted = true;

        await user.save();

        res.json({
            success: true,
            message: 'Vehicle Information Saved'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});
router.get('/profile/:email', async (req,res)=>{

    try{

        const user = await User.findOne({
            email:req.params.email
        });

        if(!user){

            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }

        res.json({
            success:true,
            user
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:'Server Error'
        });
    }
});

module.exports = router;