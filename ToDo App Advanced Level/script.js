const taskData = [];

const home = document.querySelector(".home");
window.addEventListener("DOMContentLoaded", (e) => {
  homeWindow();
  const taskStr = localStorage.getItem("tasks");
  const tasks = taskStr ? JSON.parse(taskStr) : [];

  tasks.forEach((task) => {
    leftCardRender(task.taskID, 1);
  });
});

let tasksList = [];

const taskFilter = (value) => {
  const taskStr = localStorage.getItem("tasks");
  const tasks = taskStr ? JSON.parse(taskStr) : [];

  if (value === "allTasks") {
    tasksList = tasks;
  } else {
    tasksList = tasks.filter((task) => task.runningStatus === value);
  }

  renderFilteredTasks(tasksList);
};

const renderFilteredTasks = (tasksToRender) => {
  const grid = document.querySelector(".task-grid");
  grid.innerHTML = ""; // Clear previous cards

  tasksToRender.forEach((elem) => {
    console.log(elem);
    const card = document.createElement("div");
    card.setAttribute(
      "class",
      "rounded-xl p-5 bg-[#1a1a1a] hover:bg-[#222] transition shadow-inner border border-[#2a2a2a] h-40 flex flex-col justify-between cursor-pointer"
    );

    card.innerHTML = `
      <div>
        <h3 class="text-white text-base font-semibold mb-2 truncate">${
          elem.title
        }</h3>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400">Status:</span>
          <select 
            id="statusFilter-${elem.taskID}" 
            class="bg-[#2a2a2a] text-white text-xs px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-600"
            onchange="updateStatus('${elem.taskID}', this.value)"
          >
            <option value="completed" ${
              elem.runningStatus === "completed" ? "selected" : ""
            }>Completed</option>
            <option value="pending" ${
              elem.runningStatus === "pending" ? "selected" : ""
            }>Pending</option>
            <option value="in-progress" ${
              elem.runningStatus === "in-progress" ? "selected" : ""
            }>In Progress</option>
          </select>
        </div>
      </div>
      <div class="text-xs text-gray-500 mt-2">Created: ${timeAgo(
        elem.timeCreated
      )}</div>
    `;
    grid.appendChild(card);
  });

  const createNew = document.createElement("button");
  createNew.setAttribute(
    "class",
    "rounded-xl p-1 bg-[#0f0f0f] hover:bg-[#1a1a1a] transition border-2 border-dashed border-gray-600 text-white flex flex-col justify-center items-center h-40"
  );
  createNew.addEventListener("click", setToLocal);
  createNew.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    <span class="text-sm">Create New Task</span>
  `;
  grid.appendChild(createNew);
};

const updateStatus = (taskID, value) => {
  const taskStr = localStorage.getItem("tasks");
  const tasks = taskStr ? JSON.parse(taskStr) : [];
  const task = tasks.find((elem) => elem.taskID === taskID);
  if (task) {
    task.runningStatus = value;
    task.timeLastUpdated = Date.now();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    homeWindow(); // Refresh UI
  }
};

const recentStr = localStorage.getItem("recentViewed");
const recent = recentStr ? JSON.parse(recentStr) : [];

const recentHandler = (id) => {
  const taskIdx = recent.findIndex((elem) => elem === id);

  if (taskIdx === -1) {
    // ID not present → Insert at front, shift right
    for (let i = 4; i > 0; i--) {
      recent[i] = recent[i - 1];
    }
    recent[0] = id;
  } else {
    // ID already present → Move to front
    const task = recent[taskIdx];
    for (let i = taskIdx; i > 0; i--) {
      recent[i] = recent[i - 1];
    }
    recent[0] = task;
  }

  localStorage.setItem("recentViewed", JSON.stringify(recent.slice(0, 5)));
};

const homeWindow = () => {
  const recentStr = localStorage.getItem("recentViewed");
  const recent = recentStr ? JSON.parse(recentStr) : [];

  const taskStr = localStorage.getItem("tasks");
  const tasks = taskStr ? JSON.parse(taskStr) : [];
  tasksList = tasks;

  const home = document.querySelector(".home");
  home.innerHTML = ""; // Clear previous content

  const homeWrapper = document.createElement("div");
  homeWrapper.setAttribute("class", "w-full h-full px-2 md:px-8 space-y-10");

  // 🔍 Search Bar
  // const searchBar = document.createElement("div");
  // searchBar.setAttribute("class", "relative");
  // searchBar.innerHTML = `
  //   <input
  //     type="text"
  //     placeholder="Search tasks, notes, or anything..."
  //     class="w-full h-15 pl-12 pr-4 py-3 rounded-lg bg-[#1f1f1f] text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //   />
  //   <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  //     <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M4.5 10.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
  //   </svg>
  // `;

  // 🕒 Recently Viewed Section
  const recentlyViewed = document.createElement("div");
  recentlyViewed.innerHTML = `
    <h2 class="text-gray-300 text-lg font-semibold mb-4">Recently Visited</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4" id="recentTaskGrid"></div>
  `;
  const recentGrid = recentlyViewed.querySelector("#recentTaskGrid");

  recent.forEach((id) => {
    const task = tasks.find((task) => task.taskID === id);
    if (!task) return;

    const card = document.createElement("div");
    card.setAttribute(
      "class",
      "rounded-xl p-5 bg-[#1a1a1a] hover:bg-[#222] transition shadow-inner border border-[#2a2a2a]"
    );

    card.innerHTML = `
      <h3 class="text-white text-base font-semibold mb-1 truncate">📌 ${
        task.title
      }</h3>
      <p class="text-xs text-gray-400">Last edited ${timeAgo(
        task.timeLastUpdated
      )}</p>
    `;
    card.addEventListener("click", () => openCreateTask(task.taskID));
    recentGrid.appendChild(card);
  });

  // 🗂️ Task Header + Filter
  const taskHeader = document.createElement("div");
  taskHeader.setAttribute(
    "class",
    "flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4"
  );
  taskHeader.innerHTML = `
    <h2 class="text-gray-300 text-lg font-semibold">Your Tasks</h2>
    <select onchange="taskFilter(this.value)"
      class="bg-[#1f1f1f] text-white text-sm rounded-md px-3 py-2 focus:outline-none border border-[#333] focus:ring-2 focus:ring-blue-500">
      <option value="allTasks">All Tasks</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
    </select>
  `;

  // 📋 Task Grid
  const grid = document.createElement("div");
  grid.setAttribute(
    "class",
    "grid task-grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
  );

  tasks.forEach((elem) => {
    const card = document.createElement("div");
    card.setAttribute(
      "class",
      "rounded-xl p-5 bg-[#1a1a1a] hover:bg-[#222] transition shadow-inner border border-[#2a2a2a] h-40 flex flex-col justify-between cursor-pointer"
    );

    card.innerHTML = `
      <div>
        <h3 class="text-white text-base font-semibold mb-2 truncate">${
          elem.title
        }</h3>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400">Status:</span>
          <select 
            id="statusFilter-${elem.taskID}" 
            class="bg-[#2a2a2a] text-white text-xs px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-600"
            onchange="event.stopPropagation(); updateStatus('${
              elem.taskID
            }', this.value)">
            <option value="completed" ${
              elem.runningStatus === "completed" ? "selected" : ""
            }>Completed</option>
            <option value="pending" ${
              elem.runningStatus === "pending" ? "selected" : ""
            }>Pending</option>
            <option value="in-progress" ${
              elem.runningStatus === "in-progress" ? "selected" : ""
            }>In Progress</option>
          </select>
        </div>
      </div>
      <div class="text-xs text-gray-500 mt-2">Created: ${timeAgo(
        elem.timeCreated
      )}</div>
    `;
    card.addEventListener("click", () => {
      recentHandler(elem.taskID);
      openCreateTask(elem.taskID);
    });
    grid.appendChild(card);
  });

  // ➕ Create New Task
  const createNew = document.createElement("button");
  createNew.setAttribute(
    "class",
    "rounded-xl p-1 bg-[#0f0f0f] hover:bg-[#1a1a1a] transition border-2 border-dashed border-gray-600 text-white flex flex-col justify-center items-center h-40"
  );
  createNew.addEventListener("click", setToLocal);
  createNew.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    <span class="text-sm">Create New Task</span>
  `;
  grid.appendChild(createNew);

  // 📦 Append All
  // homeWrapper.appendChild(searchBar);
  homeWrapper.appendChild(recentlyViewed);
  homeWrapper.appendChild(taskHeader);
  homeWrapper.appendChild(grid);
  home.appendChild(homeWrapper);
};

// 📅 Time Ago Helper
function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (seconds < 60) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

// 📅 Time Ago Helper
function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (seconds < 60) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (seconds < 60) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (hrs < 24) return `${hrs} hour ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

const setToLocal = () => {
  const taskStr = localStorage.getItem("tasks"); // this is a string or null
  const tasks = taskStr ? JSON.parse(taskStr) : []; // parse if not null
  const newTask = {
    taskID: "task-" + Date.now(),
    title: "Untitled",
    timeCreated: Date.now(),
    timeLastUpdated: Date.now(),
    runningStatus: "Pending",
    blockData: [
      {
        blockID: "block-" + Date.now(),
        text: "",
        size: "2xl",
        weight: "font-normal",
      },
    ],
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  openCreateTask(newTask.taskID);
  ``;
  leftCardRender(newTask.taskID, 1);
};

const cursonFocus = (elem) => {
  if (
    !elem.getAttribute("contenteditable") ||
    elem.getAttribute("contenteditable") === null
  ) {
    elem.setAttribute("contenteditable", "true");
  }
  elem.classList.add("focus:outline-none");
  elem.focus();

  const range = document.createRange();
  range.selectNodeContents(elem);
  range.collapse(false); // place caret at end

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};

const openTextOptions = (id, taskID) => {
  const elem = document.querySelector("#" + id);
  if (!elem) return;

  // Remove any previous options menu
  const existing = elem.querySelector("#textSizeOptions");
  if (existing) existing.remove();

  // Create container
  const menu = document.createElement("div");
  menu.setAttribute("id", "textSizeOptions");
  menu.setAttribute("contenteditable", "false");
  menu.className =
    "absolute z-50 bg-[#1f1f1f] text-white rounded-md shadow-lg p-2 space-y-1 border border-gray-700 w-48";

  // Header
  const heading = document.createElement("h5");
  heading.className = "text-sm";
  heading.textContent = "Block Options";
  menu.appendChild(heading);

  // Divider
  const divider = document.createElement("div");
  divider.className = "h-[1px] w-full bg-gray-500 mt-[5px]";
  menu.appendChild(divider);

  // Option definitions
  const options = [
    { label: "Heading 1", class: "text-4xl font-bold" },
    { label: "Heading 2", class: "text-3xl font-semibold" },
    { label: "Heading", class: "text-2xl font-medium" },
    { label: "Paragraph", class: "text-base font-normal" },
  ];

  // Create each option
  options.forEach((opt) => {
    const item = document.createElement("div");
    item.className = `px-3 py-2 hover:bg-[#2a2a2a] rounded cursor-pointer ${opt.class}`;
    item.setAttribute("data-class", opt.class);
    item.textContent = opt.label;

    item.addEventListener("click", () => {
      const [fontSize, fontWeight] = opt.class.split(" ");
      editCreator(fontSize, fontWeight, taskID);
      menu.remove(); // remove the menu after applying class
    });

    menu.appendChild(item);
  });

  // Append menu to block
  elem.appendChild(menu);

  // Optional auto-remove on mouse leave
  menu.addEventListener("mouseleave", () => {
    menu.remove();
  });
};

function editCreator(fontSize, weight, taskID, blockID = null, innerText = "") {
  const taskStr = localStorage.getItem("tasks");
  const tasks = taskStr ? JSON.parse(taskStr) : [];

  const task = tasks.find((task) => task.taskID === taskID); // or taskId based on your naming

  if (!task) {
    console.error("Task not found for ID:", taskID);
    return;
  }

  if (!blockID) {
    const newBlock = {
      blockID: "block-" + Date.now(),
      text: "",
      size: fontSize.replace("text-", ""),
      weight: weight,
    };

    blockID = newBlock.blockID;
    task.blockData.push(newBlock);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const titleContainer = document.querySelector(".titleContainer");
  const newBlockContainer = document.createElement("div");

  newBlockContainer.setAttribute(
    "class",
    "newBlockContainer flex items-center group relative mt-2"
  );

  const hoverElem = document.createElement("div");
  const newBlock = document.createElement("div");
  hoverElem.setAttribute(
    "class",
    "text-4xl font-bold text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer relative top-0 "
  );

  hoverElem.setAttribute("contenteditable", "false");
  newBlock.setAttribute("id", blockID);

  hoverElem.innerText = "+";
  if (hoverElem) {
    hoverElem.addEventListener("click", () => openTextOptions(blockID, taskID));
  }

  newBlock.setAttribute(
    "class",
    `w-full h-min-[3em] mt-2.5 text-white outline-none ${fontSize} ${weight}`
  );
  newBlock.setAttribute("contenteditable", "true"); // ✅ Make it editable
  newBlock.innerHTML = ""; // Start empty
  newBlock.innerHTML = "<br>";
  newBlock.innerHTML = innerText.trim() !== "" ? innerText : "<br>";
  newBlockContainer.appendChild(hoverElem);
  newBlockContainer.appendChild(newBlock);

  newBlock.addEventListener("input", (e) => {
    let index;
    const block = task.blockData.find((elem, idx) => {
      index = idx;
      return elem.blockID == blockID;
    });

    task.blockData[index] = {
      blockID: blockID,
      text: newBlock.innerText,
      size: fontSize.replace("text-", ""),
      weight: weight,
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  newBlock.addEventListener("keydown", (e) => {
    setTimeout(() => {
      const isEmpty = newBlock.innerText.trim().length === 0;

      if (isEmpty && e.key === "Backspace") {
        const container = newBlock.parentElement;

        const parent = container.parentElement;

        if (parent) {
          container.remove();

          // Get all remaining blocks
          const allBlocks = parent.querySelectorAll("[contenteditable='true']");

          // If there are still blocks left
          if (allBlocks.length > 0) {
            const lastBlock = allBlocks[allBlocks.length - 1];
            lastBlock.focus();

            // Move cursor to the end
            const range = document.createRange();
            range.selectNodeContents(lastBlock);
            range.collapse(false);

            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
    }, 0);
  });

  titleContainer.appendChild(newBlockContainer);
  cursonFocus(newBlock); // ✅ Focus and place caret
}

const openCreateTask = (taskID) => {
  const taskStr = localStorage.getItem("tasks"); // this is a string or null
  const tasks = taskStr ? JSON.parse(taskStr) : []; // parse if not null

  home.innerHTML = "";

  home.innerHTML = `
    <div
      contenteditable="false"
      class="titleContainer w-[80%] h-[80%] px-4 py-3 rounded-lg outline-none text-5xl text-white"
    > 
      <h1
          class="title text-5xl text-white outline-none"
          contenteditable="true"
          data-placeholder="Start writing here..."
        >
        Untitled
        </h1>
    </div>
  `;

  const title = document.querySelector(".title");
  let taskIdx;
  const task = tasks.find((task, idx) => {
    taskIdx = idx;
    return task.taskID == taskID;
  });

  title.innerText = task.title;
  if (task.blockData.length > 0) {
    task.blockData.forEach((block) => {
      editCreator(
        "text-" + block.size, // ✅ match the format you expect in classes
        block.weight,
        task.taskID,
        block.blockID,
        block.text
      );
    });
  } else {
    editCreator("text-2xl", "font-normal", task.taskID);
  }

  title.addEventListener("keydown", (e) => {
    if (e.key != "Enter") {
      return;
    }
    e.preventDefault(); // ✅ Fix
    editCreator("text-2xl", "font-medium", task.taskID);
  });

  title.addEventListener("input", (e) => {
    const copyTask = { ...task, title: title.innerText };
    tasks[taskIdx] = copyTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    leftCardRender(taskID, 0);
  });
};

const arr = [];

const leftCardRender = (id, flag) => {
  const taskStr = localStorage.getItem("tasks");
  const tasks = taskStr ? JSON.parse(taskStr) : [];

  const task = tasks.find((elem) => elem.taskID === id);
  if (!task) return; // if no task found, do nothing

  const cardContainer = document.querySelector(".leftCardHolder");

  const card = document.createElement("div");
  card.setAttribute(
    "class",
    "bg-[#1a1a1a] flex items-center justify-between hover:bg-[#222222] p-3 rounded-md text-sm cursor-pointer truncate"
  );
  card.setAttribute("id", id);
  card.innerHTML = `
    <p>${
      task.title.length > 15 ? task.title.slice(0, 15) + "..." : task.title
    }</p>
    <button class="opacity-[0%] hover:opacity-[100] transition duration-150" onclick="deleteTask('${id}')">
    
      <svg class="w-5 h-5" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>trash</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-261.000000, -205.000000)" fill="#ffffff"> <path d="M268,220 C268,219.448 268.448,219 269,219 C269.552,219 270,219.448 270,220 L270,232 C270,232.553 269.552,233 269,233 C268.448,233 268,232.553 268,232 L268,220 L268,220 Z M273,220 C273,219.448 273.448,219 274,219 C274.552,219 275,219.448 275,220 L275,232 C275,232.553 274.552,233 274,233 C273.448,233 273,232.553 273,232 L273,220 L273,220 Z M278,220 C278,219.448 278.448,219 279,219 C279.552,219 280,219.448 280,220 L280,232 C280,232.553 279.552,233 279,233 C278.448,233 278,232.553 278,232 L278,220 L278,220 Z M263,233 C263,235.209 264.791,237 267,237 L281,237 C283.209,237 285,235.209 285,233 L285,217 L263,217 L263,233 L263,233 Z M277,209 L271,209 L271,208 C271,207.447 271.448,207 272,207 L276,207 C276.552,207 277,207.447 277,208 L277,209 L277,209 Z M285,209 L279,209 L279,207 C279,205.896 278.104,205 277,205 L271,205 C269.896,205 269,205.896 269,207 L269,209 L263,209 C261.896,209 261,209.896 261,211 L261,213 C261,214.104 261.895,214.999 262.999,215 L285.002,215 C286.105,214.999 287,214.104 287,213 L287,211 C287,209.896 286.104,209 285,209 L285,209 Z" id="trash" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
    </button>
  `;

  if (flag === 1) {
    arr.push(card);
  } else {
    let index = arr.findIndex((elem) => elem.getAttribute("id") == id);
    if (index !== -1) {
      arr[index].innerHTML = card.innerHTML;
    }
  }

  // Clear container and re-append all cards
  cardContainer.innerHTML = "";
  arr.forEach((elem) => {
    cardContainer.appendChild(elem);
  });
};

const deleteTask = (taskID) => {
  const taskStr = localStorage.getItem("tasks");
  const tasks = taskStr ? JSON.parse(taskStr) : [];

  console.log(taskID);

  const filteredtasks = tasks.filter((task) => task.taskID != taskID);
  localStorage.setItem("tasks", JSON.stringify(filteredtasks));
  homeWindow();

  arr.length = 0; // clear the array that holds the card DOM elements

  const cardContainer = document.querySelector(".leftCardHolder");
  cardContainer.innerHTML = ""; // clear the card container

  const updatedTasksStr = localStorage.getItem("tasks");
  const updatedTasks = updatedTasksStr ? JSON.parse(updatedTasksStr) : [];

  updatedTasks.forEach((task) => {
    leftCardRender(task.taskID, 1); // re-render each left card
  });
};
