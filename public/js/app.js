const send_info = document.getElementById('send-info');
send_info.addEventListener('click', createTask);


function createTask(e) {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    const tasks = {
        name: name,
        description: description
    }

    if (localStorage.getItem('addTask') === null) {
        let addTask = [];
        addTask.push(tasks);
        localStorage.setItem('addTask', JSON.stringify(addTask));
    } else {
        const addTask = JSON.parse(localStorage.getItem('addTask'));
        addTask.push(tasks);
        localStorage.setItem('addTask', JSON.stringify(addTask));
    }


    e.preventDefault();
    showTask();
}


function showTask() {
    const addTask = JSON.parse(localStorage.getItem('addTask'));
    const task_ui = document.getElementById('task-ui');

    task_ui.innerHTML = '';

    for(let task of addTask) {
        task_ui.innerHTML += `
            <ion-card>
                <ion-card-header>   
                    <h3 style="text-align: center;">Tarea</h3>
                </ion-card-header>
                <ion-card-content>
                    <p><strong>Nombre: </strong>${task.name}</p>
                    <p><strong>Descrición: </strong>${task.description}</p>
                    <br>

                    <ion-button color="danger" onclick="deleteTask('${task.name}')">Eliminar Tarea</ion-button>
                </ion-card-content>
            </ion-card>
        `;
    }
}


function deleteTask(name) {
    const addTask = JSON.parse(localStorage.getItem('addTask'));

    for(let i = 0; i < addTask.length; i++) {
        if(addTask[i].name === name) {
            addTask.splice(i, 1);
        }
    }

    localStorage.setItem('addTask', JSON.stringify(addTask));
    showTask();
}

showTask();
