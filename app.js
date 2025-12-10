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
  if (!task) return alert("No task:/ ?");
  const li = document.createElement("li");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const span = document.createElement("span");
  span.textContent = task;
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
  inputBox.value = "";
  inputBox.focus();

  const ebtn = li.querySelector(".edit-btn");
  const checkboxx = li.querySelector("input[type='checkbox']");
  const dlt = li.querySelector(".delete-btn");
  const taskspan = li.querySelector("label span");

  checkboxx.addEventListener("change", function () {
    li.classList.toggle("completed", checkboxx.checked);
    updateCounters();
  });

  dlt.addEventListener("click", function () {
    li.remove();
    updateCounters();
  });

  ebtn.addEventListener("click", function () {
    const updated = prompt("Edit task:", taskspan.textContent);
    if (updated === null) return;
    const trimmed = updated.trim();
    if (!trimmed) return alert("Task can't be empty.");
    taskspan.textContent = trimmed;
    li.classList.remove("completed");
    checkboxx.checked = false;
    updateCounters();
  });

  updateCounters();
}

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addtask();
});