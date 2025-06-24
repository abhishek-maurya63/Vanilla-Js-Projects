const taskData = [];

const home = document.querySelector(".home");
window.addEventListener("DOMContentLoaded", (e) => {
  homeWindow();
  // setToLocal();
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
    console.log(elem)
    const card = document.createElement("div");
    card.setAttribute(
      "class",
      "rounded-xl p-5 bg-[#1a1a1a] hover:bg-[#222] transition shadow-inner border border-[#2a2a2a] h-40 flex flex-col justify-between cursor-pointer"
    );

    // card.addEventListener("click",()=>{
    //   openCreateTask()
    // })

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

const homeWindow = () => {
  const taskStr = localStorage.getItem("tasks");
  const tasks = taskStr ? JSON.parse(taskStr) : [];
  tasksList = tasks;

  const home = document.querySelector(".home");
  home.innerHTML = ""; // Clear previous content

  const homeWrapper = document.createElement("div");
  homeWrapper.setAttribute("class", "w-full h-full px-2 md:px-8 space-y-10");

  const searchBar = document.createElement("div");
  searchBar.setAttribute("class", "relative");
  searchBar.innerHTML = `
    <input
      type="text"
      placeholder="Search tasks, notes, or anything..."
      class="w-full h-15 pl-12 pr-4 py-3 rounded-lg bg-[#1f1f1f] text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <svg
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-4.35-4.35M4.5 10.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
      />
    </svg>
  `;

  const recentlyViewed = document.createElement("div");



  recentlyViewed.innerHTML = `
    <h2 class="text-gray-300 text-lg font-semibold mb-4">Recently Visited</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="rounded-xl p-5 bg-[#1a1a1a] hover:bg-[#222] transition shadow-inner border border-[#2a2a2a]">
        <h3 class="text-white text-base font-semibold mb-1 truncate">📌 Finish UI for Todo App</h3>
        <p class="text-xs text-gray-400">Last edited 1 hour ago</p>
      </div>
    </div>
  `;

  const taskHeader = document.createElement("div");
  taskHeader.setAttribute(
    "class",
    "flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4"
  );

  taskHeader.innerHTML = `
    <h2 class="text-gray-300 text-lg font-semibold">Your Tasks</h2>
    <select onchange="taskFilter(this.value)"
      class="bg-[#1f1f1f] text-white text-sm rounded-md px-3 py-2 focus:outline-none border border-[#333] focus:ring-2 focus:ring-blue-500"
    >
      <option value="allTasks">All Tasks</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
    </select>
  `;

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

  homeWrapper.appendChild(searchBar);
  homeWrapper.appendChild(recentlyViewed);
  homeWrapper.appendChild(taskHeader);
  homeWrapper.appendChild(grid);
  home.appendChild(homeWrapper);
};

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
    title: "Hey this is title",
    timeCreated: Date.now(),
    timeLastUpdated: Date.now(),
    runningStatus: "Pending",
    blockData: [
      {
        blockID: "block-" + Date.now(),
        text: "heyyyyyyyyyyy",
        size: "2xl",
        weight: "font-normal",
      },
    ],
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  openCreateTask(newTask.taskID);
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
  console.log(taskIdx);

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
  });
};
