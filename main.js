const tasksContainer = document.getElementById('tasks');

const BASE_ENDPOINT = 'http://localhost:3000';

fetch(BASE_ENDPOINT + '/api/tasks')
.then((res) => res.json())
.then((tasks) => {
    tasks.forEach((task) => {
        const card = document.createElement('div');
        const title = document.createElement('h2');
        title.textContent = task.title;

        title.style.color = task.isDone ? 'green' : 'red';

        card.appendChild(title);

        tasksContainer.appendChild(card);
    })
});

fetch(BASE_ENDPOINT + '/api/tasks/1')
.then((res) => res.json())
.then((task) => {
    const firstTask = document.createElement('h1');
    firstTask.textContent = `Pirmas taskas eileje yra ${task.title}`
    tasksContainer.appendChild(firstTask);
})