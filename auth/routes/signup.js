'use strict';
const express = require('express');
const signupRouters=express.Router();
const {users}=require('../models/index');
const bcrypt = require('bcrypt');
const logger=require("../middleware/logger");

signupRouters.get('/',(req,res)=>{
    res.send("Welcome to my bearer-auth server!");
})
signupRouters.post('/signup',async(req,res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await users.createRecord(req.body);
        res.status(201).json(record);
      } catch (e) { res.status(403).send('Error Creating User, Try Another Username'); }

})
signupRouters.use(logger);
module.exports=signupRouters;