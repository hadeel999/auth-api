'use strict';
const modelFolder = require('../models');
const express = require('express');
const routers = express.Router();
routers.param("model",(req,res,next)=>{
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next();
    } else {
        next('invalid input');
    }
}) 
routers.post('/:model',async(req,res)=>{
    let newModel = req.body;
    let model = await req.model.createRecord(newModel);
    res.status(201).json(model);
})

routers.get('/:model',async(req,res)=>{
    let allData = await req.model.readRecord();
    res.status(200).send(allData);

})
routers.get('/:model/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    let oneData = await req.model.readRecord(id);
    if(oneData){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }

})

routers.put('/:model/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    let updateModel = req.body; 
    let updatedModel = await req.model.updateRecord(updateModel,id);
    if(updatedModel[0]!=0){
        res.status(201).json(updatedModel[1]);
    }else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }
  
})
routers.delete('/:model/:id',async(req,res)=>{
    let id = parseInt(req.params.id);
    let deletedModel = await req.model.removeRecord(id);
    if(deletedModel){
        res.send("Deleted Successfully");
        res.status(204);
    }
    else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }
    
})
module.exports = routers;