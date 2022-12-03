const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let TASKS = [
    { id: 1, title: 'isplauti indus', isDone: false },
    { id: 2, title: 'issiurbti namus', isDone: false },
    { id: 3, title: 'pasimokyti programuoti', isDone: true },
];

app.get('/api/tasks', (req, res) => {
res.send(TASKS)
});

app.get('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const tasks = TASKS.find((task) => task.id === id);
    res.send(tasks);
});

app.post('/api/tasks', (req, res) => {
const lastTask = TASKS[TASKS.length -1];
const newTask = { ...req.body, id: lastTask.id +1 ,isDone: false };

TASKS.push(newTask);

res.send(TASKS);
});

app.put('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const newTask = req.body;

    const updatedTasks = TASKS.map((task) => {
        if (task.id === id) {
            return {
                ...newTask,
                id: task.id
            };
        }
        return task;
    });

    TASKS = [...updatedTasks];

    res.send(TASKS);

})

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));