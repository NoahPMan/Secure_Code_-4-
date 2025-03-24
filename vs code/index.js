const express = require('express');
const app = express();
const port = 3000;

// Use EJS for templating
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Simple in-memory store for to-do items
let todos = [];

// Route to display the to-do list
app.get('/', (req, res) => {
    res.render('index', { todos });
});

// Route to add a new to-do item
app.post('/add', (req, res) => {
    const newTodo = req.body.todo;
    if (newTodo) {
        todos.push({ task: newTodo, completed: false });
    }
    res.redirect('/');
});

// Route to mark a to-do item as completed
app.post('/complete', (req, res) => {
    const taskIndex = req.body.index;
    if (todos[taskIndex]) {
        todos[taskIndex].completed = true;
    }
    res.redirect('/');
});

// Route to delete a to-do item
app.post('/delete', (req, res) => {
    const taskIndex = req.body.index;
    if (todos[taskIndex]) {
        todos.splice(taskIndex, 1);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
