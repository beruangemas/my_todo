function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();

    if(taskText !==""){
        const li = document.createElement("li");

        //create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = function(){
            li.style.textDecoration =this.checked ? "line-through" : "none";
        }

        //create text node
        const text = document.createTextNode(" " + taskText + " ");

        //create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function(){
            li.remove();
        }

        //append elements to li
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);

        //append li to task list
        document.getElementById("taskList").appendChild(li);

        //clear input field
        input.value = "";

    } else{
        alert("Please enter a task.");
    }
}
