const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const TASKS = [
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
})
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));