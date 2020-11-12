const express = require('express');
const RegisterRouter = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');

RegisterRouter.route('/')
.post( (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
        if(err) { throw err; } 
        else if(doc) {
            res.json({"body": "User already exist"});
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashPassword
            });
            await newUser.save();
            res.json({"body": "User Created"});
        }
    });
});

module.exports = RegisterRouter;