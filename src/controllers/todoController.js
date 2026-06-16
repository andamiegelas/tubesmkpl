const TodoModel = require('../models/todoModel');

const todoController = {
  getAll(req, res) {
    const todos = TodoModel.getAll();
    res.json(todos);
  },

  getById(req, res) {
    const todo = TodoModel.getById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  },

  create(req, res) {
    const { title, description } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    const todo = TodoModel.create({ title: title.trim(), description });
    res.status(201).json(todo);
  },

  update(req, res) {
    const { title, description, completed } = req.body;
    const updated = TodoModel.update(req.params.id, { title, description, completed });
    if (!updated) return res.status(404).json({ error: 'Todo not found' });
    res.json(updated);
  },

  delete(req, res) {
    const deleted = TodoModel.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  },
};

module.exports = todoController;
