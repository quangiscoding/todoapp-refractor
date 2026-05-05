import { $$, $ } from "./helpers/selector.helper.js";
import { capitalize, fmtDate } from "./helpers/format.helper.js";

// ===== UI references =====
const dom = {
  list: {
    taskList: $("#taskList"),
    emptyState: $("#emptyState"),
  },

  footer: {
    stats: $("#footerStats"),
    exportBtn: $("#btnExport"),
    clearBtn: $("#btnClear"),
  },

  progress: {
    fill: $("#progressFill"),
    count: $("#progressCount"), // fixed selector
  },

  controls: {
    filterPills: $$(".pill"),
    searchBox: $("#searchBox"),
    addBtn: $("#addBtn"),
  },

  modal: {
    overlay: $("#modalOverlay"),
    card: $("modalCard"),

    title: $("#modalTitle"),
    btnClose: $("#modalClose"),

    inputName: $("#inputName"),
    inputPriority: $("#inputPriority"),
    inputDeadline: $("#inputDeadline"),
    inputTag: $("#inputTag"),

    btnSave: $("#btnSave"),
    btnCancel: $("#btnCancel"),
  },
};

// =====================
// State
// =====================
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let modalMode = "add"; // "add" | "edit"
let editingTaskId = null;

// =====================
//  Modal HTML
// =====================
function openAddModal() {
  dom.modal.overlay.classList.add("visible");
}

function closeModal() {
  dom.modal.overlay.classList.remove("visible");
}

dom.controls.addBtn.addEventListener("click", openAddModal);

dom.modal.btnClose.addEventListener("click", closeModal);
dom.modal.btnCancel.addEventListener("click", closeModal);
dom.modal.overlay.addEventListener("click", (e) => {
  if (e.target === dom.modal.overlay) {
    closeModal();
  }
});

// Save and Render
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkbox(task) {
  return `
    <input 
      class="task-checkbox"
      type="checkbox"
      data-action="toggle"
      ${task.completed ? "checked" : ""}
    />
  `;
}

function titleRow(task) {
  return `
    <div class="task-title-row">
      <span class="task-name">${task.name}</span>
      <span class="priority-badge ${task.priority}">
        ${capitalize(task.priority)}
      </span>
    </div>
  `;
}

function meta(task) {
  return `
    <div class="task-meta">
    <span class="task-deadline upcoming">${task.deadline}</span>
      ${task.tag ? `<span class="task-tag">${task.tag}</span>` : ""}
    </div>
  `;
}

function body(task) {
  return `
    <div class="task-body">
      ${titleRow(task)}
      ${meta(task)}
    </div>
  `;
}

function menu() {
  return `
    <div class="task-menu">
      <button class="task-edit-btn" data-action="edit">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button class="task-delete-btn" data-action="delete">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  `;
}

function createTaskElement(task) {
  const el = document.createElement("div");
  el.className = `task-item priority-${task.priority}`;
  el.dataset.id = task.id;

  el.innerHTML = `
    ${checkbox(task)}
    ${body(task)}
    ${menu()}
  `;

  return el;
}

dom.modal.btnSave.addEventListener("click", handleSave);

function handleSave() {
  const name = dom.modal.inputName.value.trim();
  if (!name) return;

  const task = {
    id: Date.now(),
    name,
    priority: dom.modal.inputPriority.value,
    deadline: dom.modal.inputDeadline.value,
    tag: dom.modal.inputTag.value,
    completed: false,
  };

  tasks.push(task);
  saveTasks();

  renderTasks(); // NOT forEach append
  closeModal();
  resetModal();
}

function renderTasks() {
  dom.list.taskList.innerHTML = "";

  if (!tasks.length) {
    dom.list.emptyState.style.display = "block";
    return;
  }

  dom.list.emptyState.style.display = "none";

  tasks.forEach((task) => {
    dom.list.taskList.appendChild(createTaskElement(task));
  });
}

function resetModal() {
  dom.modal.inputName.value = "";
  dom.modal.inputPriority.value = "low";
  dom.modal.inputDeadline.value = "";
  dom.modal.inputTag.value = "";
}

// ===== Init =====
renderTasks();
