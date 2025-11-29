window.onload = function(){
    const savedTasks = JSON.parse(this.localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
           renderTask(
            task.text, 
            task.completed,
            task.createdAt,
            task.updatedAt,
            task.completedAt
            )
        });

    //add Enter key support
    document.getElementById("task-input").addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            addTask();
        }
    });
};

function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();

        if(taskText !==""){
            const now = new Date().toLocaleString();

            //render with timestamps
            renderTask(taskText, false, now, now, null);

            //save to local storage
            saveTask(taskText, false);

            input.value = "";
        } else{
            alert("Please enter a task.");
        }
    }


//render task
function renderTask(text, completed, createdAt, updatedAt, completedAt){
    const li = document.createElement("li");

    //checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    //create a <span> to hold the task text
    const textSpan = document.createElement("span");
    textSpan.textContent = " " + text;
    textSpan.classList.add("task-text");

    //Apply completed style using CSS class
    if(completed){
        textSpan.classList.add("completed");
    
    }

    //timestamp container
    const timeInfo = document.createElement("div");
    timeInfo.classList.add("time-info");

    timeInfo.innerHTML = `
    <small>Created: ${createdAt}</small><br>
    <small>Last Updated: ${updatedAt}</small><br>
    <small>Completed: ${completedAt ? completedAt : "Not completed yet"}</small>
    `;
    
    checkbox.onclick = function(){
        const now = new Date().toLocaleString();

        timeInfo.innerHTML = `
        <small>Created: ${createdAt}</small><br>
        <small>Last Updated: ${now}</small><br>
        <small>Completed: ${this.checked ? now : "Not completed yet"}</small>
        `;

        textSpan.classList.toggle("completed", this.checked);
        updateTask(text, this.checked);
    };

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
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    li.appendChild(timeInfo);

//add li to the task list
    document.getElementById("taskList").appendChild(li);
}

//save task to local storage
function saveTask(text, completed){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//add timestamp to make each task unique
    const now = new Date().toLocaleString();

    tasks.push({
        text, 
        completed, 
        createdAt: now, 
        updatedAt: now, 
        completedAt: completed ? now: null});

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//update task in local storage
function updateTask(text, completed){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(task => task.text === text);

    if (index !== -1){
        const now = new Date().toLocaleString();
        tasks[index].completed = completed;
        tasks[index].updatedAt = now;
        tasks[index].completedAt = completed ? now : null;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

//delete task from local storage
function deleteTask(text){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}