const home = document.querySelector(".home");
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault;
  homeWindow();
});
const homeWindow = () => {
  const homeContent = `<div class="w-full h-full px-2 md:px-8 space-y-10">
          
          <div class="relative">
            <input
              type="text"
              placeholder="Search tasks, notes, or anything..."
              class="w-full pl-12 pr-4 py-3 rounded-lg bg-[#1f1f1f] text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>

        
          <div>
            <h2 class="text-gray-300 text-lg font-semibold mb-4">
              Recently Visited
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                class="rounded-xl p-5 bg-[#1a1a1a] hover:bg-[#222] transition shadow-inner border border-[#2a2a2a]"
              >
                <h3 class="text-white text-base font-semibold mb-1 truncate">
                  📌 Finish UI for Todo App
                </h3>
                <p class="text-xs text-gray-400">Last edited 1 hour ago</p>
              </div>
            </div>
          </div>

          
          <div>
            <div
              class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4"
            >
              <h2 class="text-gray-300 text-lg font-semibold">Your Tasks</h2>
              <select
                class="bg-[#1f1f1f] text-white text-sm rounded-md px-3 py-2 focus:outline-none border border-[#333] focus:ring-2 focus:ring-blue-500"
              >
                <option>All Tasks</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
            >
              <div
                class="rounded-xl p-5 bg-[#1a1a1a] hover:bg-[#222] transition shadow-inner border border-[#2a2a2a] h-40 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <h3 class="text-white text-base font-semibold mb-1 truncate">
                    ✅ Create Task Component
                  </h3>
                  <p class="text-xs text-gray-400">In Progress</p>
                </div>

                <div class="text-xs text-gray-500">Updated: 10 min ago</div>
              </div>

              <div
                class="rounded-xl p-5 bg-[#1a1a1a] hover:bg-[#222] transition shadow-inner border border-[#2a2a2a] h-40 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <h3 class="text-white text-base font-semibold mb-1 truncate">
                    📚 Add Markdown Support
                  </h3>
                  <p class="text-xs text-gray-400">Planned</p>
                </div>
                <div class="text-xs text-gray-500">Updated: Yesterday</div>
              </div>

              
              <button
                onclick="openCreateTask()"
                class="rounded-xl p-5 bg-[#0f0f0f] hover:bg-[#1a1a1a] transition border-2 border-dashed border-gray-600 text-white flex flex-col justify-center items-center h-40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span class="text-sm">Create New Task</span>
              </button>
            </div>
          </div>
        </div> `;

  home.innerHTML = homeContent;
};

const cursonFocus = (elem) => {
  // Ensure the element is editable and focused
  elem.setAttribute("contenteditable", "true");
  elem.focus();

  const range = document.createRange();
  range.selectNodeContents(elem);
  range.collapse(false); // Move cursor to end

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};

const openCreateTask = (textSize, fontWeight) => {
  console.log("clicked");
  home.innerHTML = "";

  home.innerHTML = `
    <div
      contenteditable="true"
      class="title w-[80%] h-[80%] px-4 py-3 rounded-lg outline-none text-5xl text-white"
    >
      Untitled
    </div>
  `;

  const title = document.querySelector(".title");

  title.addEventListener("keydown", (e) => {
    if (e.key != "Enter") {
      return;
    }

    e.preventDefault(); // ✅ Fix

    const newBlock = document.createElement("div");
    newBlock.setAttribute(
      "class",
      `w-full mt-4 outline-none ${textSize} ${fontWeight}`
    );
    newBlock.setAttribute("contenteditable", "true"); // ✅ Make it editable
    newBlock.setAttribute("data-placeholder", "Type something...");
    newBlock.innerHTML = "Hi"; // Start empty
    newBlock.innerHTML = "<br>";

    title.appendChild(newBlock);
    cursonFocus(newBlock); // ✅ Focus and place caret
  });
};
