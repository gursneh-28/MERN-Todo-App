const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//Signup 
router.post("/signup", async (req, res) => {
    const {username, password} = req.body;
    console.log("Signup attempt:", username, password);

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password : hashedPassword});
        await newUser.save()

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("User created:", token);

        res.status(201).json({token, message : "User created"});
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(400).json({error : "User already exist or error occured"});
    }
});

//Login 
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if (!existingUser) return res.status(401).json({error : "User not found"});

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) return res.status(401).json({error :"Invalid credentials"});

        const token = jwt.sign({userId : existingUser._id}, process.env.JWT_SECRET, {expiresIn : "1h"});
        res.json({token, message: "Login successful"});
    }
    catch(err) {
        res.status(500).json({error: "Server Error"});
    }
});

module.exports = router;    