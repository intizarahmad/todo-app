const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('../db/mongoose');
const { UserModel, TodoModel } = require('../models');

const app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
   let toDo = new TodoModel({
        text:req.body.text
   })
   toDo.save().then((d)=>{
    res.send(d);
   }).catch(e=>{
        res.status(400).send(e);
   })
});

app.get('/todos', (req, res)=>{
     TodoModel.find().then(todos=>{
        res.send({
            todos
        })
     }).catch(e=>{
        res.status(400).send(e);
     });
 })


app.listen(3000, ()=>{
    console.log("server running");
});