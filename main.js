const tasksContainer = document.getElementById('tasks');
const addTaskForm = document.getElementById('addTask');
const taskTitleInput = document.getElementById('addTitle');

const BASE_ENDPOINT = 'http://localhost:3000';

addTaskForm.addEventListener('submit', (event) => {
    // event.preventDefault();
    fetch(BASE_ENDPOINT + '/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: taskTitleInput.value })
    });
});

fetch(BASE_ENDPOINT + '/api/tasks')
    .then((res) => res.json())
    .then((tasks) => {
        tasks.forEach((task) => {
            const card = document.createElement('div');
            card.style.display = 'flex';
            card.style.alignItems = 'center';

            const title = document.createElement('h2');

            title.textContent = task.title;
            title.style.color = task.isDone ? 'green' : 'red';

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';

            completeButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({ ...task, iDone: true })
                })
                .then((res) => res.json())
                .then((tasks) => {
                    window.location.reload()
                });
            });

            card.appendChild(completeButton);
            card.appendChild(title);

            tasksContainer.appendChild(card);
        });
    });

fetch(BASE_ENDPOINT + '/api/tasks/1')
    .then((res) => res.json())
    .then((task) => {
        const firstTask = document.createElement('h1');
        firstTask.textContent = `Pirmas taskas eileje yra ${task.title}`
        tasksContainer.appendChild(firstTask);
    })