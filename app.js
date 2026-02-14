let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const inputBox = document.getElementById("addtask");
const listContainer = document.getElementById("list");
const completedCounter = document.getElementById("comp-count");
const uncompletedCounter = document.getElementById("uncom-count");

function updateCounters() {
  const completedTasks = document.querySelectorAll("#list li.completed").length;
  const uncompletedTasks = document.querySelectorAll("#list li:not(.completed)").length;
  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function addtask() {
  const task = inputBox.value.trim();
  if (!task) return alert("No task? Add one!");

  tasks.push({
    text: task,
    completed: false
  });

  saveTasks();
  inputBox.value = "";
  inputBox.focus();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
  listContainer.innerHTML = "";

  tasks.forEach((taskObj, index) => {
    const li = document.createElement("li");
    if (taskObj.completed) li.classList.add("completed");

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.completed;

    const span = document.createElement("span");
    span.textContent = taskObj.text;

    label.appendChild(checkbox);
    label.appendChild(span);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);

    checkbox.addEventListener("change", () => {
      taskObj.completed = checkbox.checked;
      li.classList.toggle("completed");
      saveTasks();
      updateCounters();
    });

    deleteBtn.addEventListener("click", () => {
      if (!confirm("Delete this task?")) return;
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    editBtn.addEventListener("click", () => {
      const updated = prompt("Edit task:", taskObj.text);
      if (updated === null) return;
      const trimmed = updated.trim();
      if (!trimmed) return alert("Task can't be empty.");
      taskObj.text = trimmed;
      taskObj.completed = false;
      saveTasks();
      renderTasks();
    });
  });

  updateCounters();
}
window.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addtask();
});
