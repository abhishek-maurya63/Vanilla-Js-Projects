// Select DOM elements
// localStorage.clear();

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

    li.setAttribute("id", idx);

    let span = document.createElement("span");
    span.className =
      "flex-1 cursor-pointer line-through text-gray-400 hover:text-indigo-300";

    span.innerText = element.text;

    let btn = document.createElement("button");
    btn.classList = "ml-4 text-red-400 hover:text-red-500";
    btn.innerText = "🗑️";

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
    console.log(dets);
  });
}
deletedTask();
