// ===== selector helpers =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

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

// State
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
