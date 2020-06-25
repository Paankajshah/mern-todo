const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi')


const todoSchema = new mongoose.Schema
({
    todoDescription : {
        type : String , 
        required : true
    },
    todoResponsible: {
        type : String , 
        required : true
    },
    todoPrority: {
        type : String , 
        required : true
    },
    todoCompleted: {
        type : Boolean , 
        required : true
    },
});

const Todo = mongoose.model('Todos' , todoSchema);

router.get('/' , async (req , res) =>{

    const todo = await Todo.find();
    res.send(todo);
});


router.post('/', async(req , res ) => {

  const { error } = validateTodo(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

    let todoPost = new Todo ({
        todoDescription : req.body.description,
        todoResponsible : req.body.responsible,
        todoPrority : req.body.priority,
        todoCompleted : req.body.completed,


    })

    todoPost = await todoPost.save();
    res.send(todoPost);
});

router.put('/:id' , async (req ,res ) =>{
  const { error } = validateTodo(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

    let todo = await Todo.findByIdAndUpdate(req.params.id , {
        todoDescription : req.body.description,
        todoResponsible : req.body.responsible,
        todoPrority : req.body.priority,
        todoCompleted : req.body.completed,
    } , {
        new : true
    });

    if (!todo ) return res.status.length(404).send('The Todo with given id was not found.');

    res.send(todo)
});



router.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
  
    if (!todo) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(todo);
  });


router.delete('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndRemove(req.params.id);
  
    if (!todo) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(todo);
  });
  

function validateTodo(todo) {
    const schema = {
        description: Joi.string().min(3).required(),
        responsible: Joi.string().min(3).required(),
        priority: Joi.string().min(3).required(),
        completed: Joi.required(),

    };


  return Joi.validate(todo, schema);
}

  

module.exports = router;