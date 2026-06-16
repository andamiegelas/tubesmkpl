const request = require('supertest');
const app = require('../src/app');
const TodoModel = require('../src/models/todoModel');

beforeEach(() => {
  TodoModel._reset();
});

describe('GET /', () => {
  it('should return health check', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/todos', () => {
  it('should return empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return all todos', async () => {
    TodoModel.create({ title: 'Test Todo' });
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});

describe('POST /api/todos', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Buy groceries', description: 'Milk and eggs' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Buy groceries');
    expect(res.body.completed).toBe(false);
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post('/api/todos').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });

  it('should return 400 if title is empty string', async () => {
    const res = await request(app).post('/api/todos').send({ title: '   ' });
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/todos/:id', () => {
  it('should return a todo by id', async () => {
    const todo = TodoModel.create({ title: 'Test' });
    const res = await request(app).get(`/api/todos/${todo.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(todo.id);
  });

  it('should return 404 for non-existent id', async () => {
    const res = await request(app).get('/api/todos/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /api/todos/:id', () => {
  it('should update a todo', async () => {
    const todo = TodoModel.create({ title: 'Old title' });
    const res = await request(app)
      .put(`/api/todos/${todo.id}`)
      .send({ title: 'New title', completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('New title');
    expect(res.body.completed).toBe(true);
  });

  it('should return 404 for non-existent id', async () => {
    const res = await request(app).put('/api/todos/999').send({ title: 'x' });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/todos/:id', () => {
  it('should delete a todo', async () => {
    const todo = TodoModel.create({ title: 'Delete me' });
    const res = await request(app).delete(`/api/todos/${todo.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Todo deleted successfully');
  });

  it('should return 404 for non-existent id', async () => {
    const res = await request(app).delete('/api/todos/999');
    expect(res.statusCode).toBe(404);
  });
});
