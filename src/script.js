window.onload = function(){
    const savedTasks = JSON.parse(this.localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();

    if(taskText !==""){
        const input = document.getElementById("task-input");
        const taskText = input.value.trim();

        if(taskText !==""){
            renderTask(taskText, false);
            saveTask(taskText, false);

            input.value = "";
        } else{
            alert("Please enter a task.");
        }
};

//render task
function renderTask(text, completed){
    const li = document.createElement("li");

    //checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.onclick = function(){
        li.style.textDecoration = this.checked ? "line-through" : "none";
        updateTask(text, this.checked);
    }
};

//create text node
    const textNode = document.createTextNode(" " + text);

//create delete button
    const deleteBtn = document.createElement ("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function(){
        const confirmDelete = confirm (`Are you sure you want to delete "${text}"?`);

        if(confirmDelete){
            li.remove();
            deleteTask(text);
        }
    };

//append checkbox and text to li
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    li.style.textDecoration = completed ? "line-through" : "none";

//add li to the task list
    document.getElementById("taskList").appendChild(li);
}

//save task to local storage
function saveTask(text, completed){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({text, completed});
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//update task in local storage
function updateTask(text, completed){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(task => task.text === text);
    if (index !== -1){
        tasks[index].completed = completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

//delete task from local storage
function deleteTask(text){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}