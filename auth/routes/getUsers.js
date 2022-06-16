'use strict';
const express = require('express');
const getUsersRouters=express.Router();
const {users}=require('../models/index');
const Collection=require("../models/data-collection");
const bearerAuth = require('../middleware/bearerAuth');
const permissions = require('../middleware/acl');
const logger=require("../middleware/logger");

const usersCol=new Collection(users);

getUsersRouters.get('/users',bearerAuth,permissions('delete'),async(req,res,next)=>{
    try {
        const userRecords = await usersCol.readRecord();
        const list = userRecords.map(user => user.username);
        res.status(200).json(list);
      } catch (e) {
        console.error(e);
        next(e);
      }
})

getUsersRouters.use(logger);
module.exports=getUsersRouters;