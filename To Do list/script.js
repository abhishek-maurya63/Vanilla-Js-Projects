let taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderCard();

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  let inpTxt = taskInput.value.trim();

  if (inpTxt === "") return;

  const task = {
    id: Date.now(),
    text: inpTxt,
    completed: false,
  };

  tasks.push(task);
  saveTask();
  renderCard();
}

function renderCard() {
  taskList.innerHTML = "";

  tasks.forEach((element, idx) => {
    let li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-700 p-3 rounded-xl";

    let span = document.createElement("span");
    span.className =
      "flex-grow cursor-pointer text-gray-400 hover:text-indigo-300";
    if (element.completed) {
      span.classList.add("line-through");
      span.classList.add("text-gray-500");
    }
    span.innerText = element.text;

    let btn = document.createElement("button");
    btn.classList = "ml-4 text-red-400 hover:text-red-500";
    btn.innerText = "🗑️";
    btn.setAttribute("id", idx);

    span.addEventListener("click", () => taskDone(idx));
    li.appendChild(span);
    li.appendChild(btn);

    taskList.appendChild(li);
  });
}

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deletedTask() {
  taskList.addEventListener("click", (dets) => {
    const index = tasks[parseInt(dets.target.id)];
    if (dets.target.tagName === "BUTTON") {
      const dltTask = index.id;
      tasks = tasks.filter((task) => task.id != dltTask);

      saveTask();
      renderCard();
    }
  });
}

function taskDone(idx) {
  tasks[idx].completed = !tasks[idx].completed;
  saveTask();
  renderCard();
}

deletedTask();
