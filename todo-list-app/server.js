import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

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

// let todos = [
//   { 
//     id: "100", 
//     text: 'Take out the garbage', 
//     isCompleted: true 
//   },
//   { 
//     id: "101", 
//     text: 'Make dinner', 
//     isCompleted: true 
//   },
//   { id: "102", 
//     text: 'New Todo', 
//     isCompleted: false 
//   },
//   { id: "500", 
//     text: 'Pick up the kids*', 
//     isCompleted: false 
//   }
// ];



app.get('/api/todos', async (req, res) => {

  const todosList = await todosCollection.find({}).toArray();
  res.json(todosList);
});

app.post('/api/todos', async (req, res) => {

  const newTodo = {
    id: `${Date.now()}`,
    text: req.body.text,
    isCompleted: false,
  };
  await todosCollection.insertOne(newTodo);
  res.json(newTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  
  const todoId = req.params.id;
  await todosCollection.deleteOne({ id: todoId });
  res.send();
});

app.put('/api/todos/:id', async (req, res) => {

  const todoId = req.params.id;
  const { isCompleted } = req.body;  // Extract only the field you want to update
  
  try {
    const result = await todosCollection.findOneAndUpdate(
      { id: todoId.toString() },
      { $set: { isCompleted } },  // Update only the `isCompleted` field
      { returnDocument: 'after' }
    );
    
    res.json(result);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

async function start() {
  await connetToDB();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

start();