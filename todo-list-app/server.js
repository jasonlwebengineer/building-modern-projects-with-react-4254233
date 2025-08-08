import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;
app.use(express.json());

let todosCollection;

async function connetToDB() {
  const url = `mongodb+srv://jasonlwebengineer:ZHEGxd7ojBviuADv@cluster0.xzus52o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db('todo-react-db');
  todosCollection = db.collection('todos');
}

let todos = [
  { 
    id: "100", 
    text: 'Take out the garbage', 
    isCompleted: true 
  },
  { 
    id: "101", 
    text: 'Make dinner', 
    isCompleted: true 
  },
  { id: "102", 
    text: 'New Todo', 
    isCompleted: false 
  },
  { id: "500", 
    text: 'Pick up the kids*', 
    isCompleted: false 
  }
];



app.get('/api/todos', async (req, res) => {

  const todosList = await todosCollection.find({}).toArray();
  res.json(todosList);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: `${Date.now()}`,
    text: req.body.text,
    isCompleted: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  todos = todos.filter(todo => todo.id !== todoId);
  res.send();
});

app.put('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;
 
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
  res.json(todos[todoIndex]);
});

async function start() {
  await connetToDB();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

start();