// const oldTask = [

// ]


// const handleInput = () =>{
//    oldTask.push(e.target.name)
// }

const taskList = [];

function append() {
  li.append("task-name:", name.value, " ", " ", "task-completion-date:", completionDate.value, "task-creation-date:", date.toLocaleDateString());
  oldTasks.appendChild(li);

}

console.log(taskList)

const name = document.getElementById("work-name");
const completionDate = document.getElementById("completion-date");

const addBtn = document.getElementById("submit");

const date = new Date();

const oldTasks = document.getElementById("old-task");

addBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.append("task-name:", name.value, " ", " ", "task-completion-date:", completionDate.value, "task-creation-date:", date.toLocaleDateString());
  oldTasks.appendChild(li);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  li.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  li.appendChild(editBtn);
  editBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    li.append(input);
    oldTasks.append(li);
    const saveChangesBtn = document.createElement("button");
    saveChangesBtn.textContent = "Save Changes";
    li.appendChild(saveChangesBtn);
    saveChangesBtn.addEventListener("click", ()=>{
    

    // name.value = input.value;

    // li.append("task-name:", name.value, " ", " ", "task-completion-date:", completionDate.value, "task-creation-date:", date.toLocaleDateString());
    li.childNodes[0].textContent =
        `task-name: ${name.value} task-completion-date: ${completionDate.value} task-creation-date: ${date.toLocaleDateString()}`;
    name.value = "";
    saveChangesBtn.remove();
    input.remove();
    })
  })


});

