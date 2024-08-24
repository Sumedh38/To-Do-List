document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const trashList = document.getElementById('trashList');
    let tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
    let trash = JSON.parse(sessionStorage.getItem('trash')) || [];

    // Rendering Task Name
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    };

    // Rendering Trash Name 
    const renderTrash = () => {
        trashList.innerHTML = '';
        trash.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="restore-btn" data-index="${index}">Restore</button>
            `;
            trashList.appendChild(li);
        });
    };

    // Rendering Task List on Adding
    const addTask = () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            sessionStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    };

    // Editing the added record
    const editTask = (index) => {
        const newTask = prompt('Edit your task:', tasks[index]);
        if (newTask) {
            tasks[index] = newTask;
            sessionStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Deleting the added record that should move to the trash 
    const deleteTask = (index) => {
        const task = tasks.splice(index, 1)[0];
        trash.push(task);
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
        sessionStorage.setItem('trash', JSON.stringify(trash));
        renderTasks();
        renderTrash();
    };

    // Restoreing the record that is restored 
    const restoreTask = (index) => {
        const task = trash.splice(index, 1)[0];
        tasks.push(task);
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
        sessionStorage.setItem('trash', JSON.stringify(trash));
        renderTasks();
        renderTrash();
    };

    // Event edit delete for task list
    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const index = target.getAttribute('data-index');
        if (target.classList.contains('edit-btn')) {
            editTask(index);
        } else if (target.classList.contains('delete-btn')) {
            deleteTask(index);
        }
    });

    // Event restore for trash list
    trashList.addEventListener('click', (event) => {
        const target = event.target;
        const index = target.getAttribute('data-index');
        if (target.classList.contains('restore-btn')) {
            restoreTask(index);
        }
    });

    // Event rendering task and trash on adding task
    addTaskBtn.addEventListener('click', addTask);
    renderTasks();
    renderTrash();
});
