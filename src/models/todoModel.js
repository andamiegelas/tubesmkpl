let todos = [];
let nextId = 1;

const TodoModel = {
  getAll() {
    return todos;
  },

  getById(id) {
    return todos.find((t) => t.id === parseInt(id));
  },

  create({ title, description = '' }) {
    const todo = {
      id: nextId++,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todos.push(todo);
    return todo;
  },

  update(id, fields) {
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) return null;
    todos[index] = { ...todos[index], ...fields };
    return todos[index];
  },

  delete(id) {
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
  },

  // For testing: reset state
  _reset() {
    todos = [];
    nextId = 1;
  },
};

module.exports = TodoModel;
