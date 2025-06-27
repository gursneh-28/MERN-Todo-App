const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({error: "Title is required"});
    }

    try{
        const newTodo = new Todo({
            title, user: req.userId
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    }catch (err) {
        res.status(400).json({error: "Not saved"});
    }
};

exports.getTodo = async (req, res) => {
    try{
        const todos = await Todo.find({user: req.userId});
        res.json(todos);
    }catch (err) {
        res.status(400).json({message: err.message});
    }
};

exports.getTodoById = async (req, res) => {
    try{
        const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
        if (!todo) return res.status(404).json({message : 'Todo not found'});
        res.json(todo);
    }catch (err) {
        res.status(400).json({message: err.message});
    }
};

exports.updateTodo = async (req, res) => {
    try{
        const updated = await Todo.findByIdAndUpdate(
            {_id: req.params.id, user: req.userId},
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Todo not found' });
        res.json(updated);
    }catch (err) {
    res.status(400).json({ message: err.message });
    } 
};

exports.deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete({
        _id: req.params.id,
        user: req.userId
    });
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};