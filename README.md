# Todo REST API

A simple Todo REST API built with Node.js and Express. Used as a base project for CI/CD pipeline implementation.

## Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | Health check |
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get todo by ID |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

## Setup

```bash
npm install
npm start         # production
npm run dev       # development with hot reload
npm test          # run tests with coverage
npm run lint      # lint source files
```

## Example Request

```bash
# Create a todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk and eggs"}'

# Get all todos
curl http://localhost:3000/api/todos
```

## Project Structure

```
todo-api/
├── src/
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   ├── routes/
│   │   └── todoRoutes.js   # Route definitions
│   ├── controllers/
│   │   └── todoController.js
│   └── models/
│       └── todoModel.js    # In-memory data store
├── tests/
│   └── todo.test.js        # Jest + Supertest tests
├── .eslintrc.json
├── jest.config.js
└── package.json
```
