const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const { mongoose } = require('../db/mongoose');
const { UserModel, TodoModel } = require('../models');
const { authenticate} = require('./../middleware/authenticate')
const app = express();
const port = process.env.PORT || 3000;
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

 app.get('/todos/:id', (req, res)=>{
     let id = req.params.id; 
     if(!ObjectId.isValid(id)){
        res.status(404).send();
     }
    TodoModel.findById(id).then(todo=>{
        if(!todo){
            res.status(404).send();
        }
        res.send({
            todo
        })
    }).catch(e=>{
       res.status(404).send();
    });
})

app.delete('/todos/:id', (req, res)=>{
    let id = req.params.id; 
    if(!ObjectId.isValid(id)){
       res.status(404).send();
    }
   TodoModel.findByIdAndDelete(id).then(todo=>{
       if(!todo){
           res.status(404).send();
       }
       res.send({
           todo
       })
   }).catch(e=>{
      res.status(404).send();
   });
})

// Users 
app.post('/users', (req, res)=>{
    const userData = _.pick(req.body, ['email','password']);
    const user = new UserModel(userData);
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        console.log('token', token);
        res.header('x-auth', token).send(user);
    }).catch(e=>{
        console.log(e);
        res.status(400).send(e)
    });
 });

 app.get('/users/me',authenticate,  (req, res)=>{
     res.send(req.user)
 });
app.listen(port, ()=>{
    console.log(`server running at ${port}`);
});