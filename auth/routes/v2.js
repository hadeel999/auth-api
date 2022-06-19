'use strict';
const express = require('express');
const routers = express.Router();
const bearer=require("../middleware/bearerAuth");
const acl=require("../middleware/acl");
const Collection=require("../models/data-collection");
const {users}=require("../models/index");

const usersCol=new Collection(users);
 

routers.get('/v2', bearer,acl('read'),async (req, res) => {
    let allData = await usersCol.readRecord();
    res.status(200).send(allData);
});
routers.get('/v2/:id',bearer,acl('read'),async(req,res)=>{
    const id = parseInt(req.params.id);
    let oneData = await usersCol.readRecord(id);
    if(oneData){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }
});
routers.post('/v2', bearer, acl('create'),async (req, res) => {
    let newModel = req.body;
    let model = await usersCol.createRecord(newModel);
    res.status(201).json(model);
});
routers.put('/v2/:id', bearer, acl('update'),async (req, res) => {
    const id = parseInt(req.params.id);
    let updateModel = req.body; 
    let updatedModel = await usersCol.updateRecord(updateModel,id);
    if(updatedModel[0]!=0){
        res.status(201).json(updatedModel[1]);
    }else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }
});
routers.patch('/v2/:id', bearer, acl('update'), (req, res) => {
    res.send('Bearer token and the update capability');
});
routers.delete('/v2/:id', bearer, acl('delete'),async (req, res) => {
    let id = parseInt(req.params.id);
    let deletedModel = await usersCol.removeRecord(id);
    if(deletedModel){
        res.send("Deleted Successfully"); 
        res.status(204);
    }
    else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }});

module.exports = routers;
