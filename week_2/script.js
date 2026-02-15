/* ===================================
   Gestor de Freelancers
   Dominio: Plataformas Freelancers
   =================================== */

// ====== ESTADO GLOBAL ======
let freelancers = [];
let editingId = null;

// ====== ELEMENTOS DEL DOM ======
const form = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const descriptionInput = document.getElementById("item-description");
const categoryInput = document.getElementById("item-category");
const levelInput = document.getElementById("item-priority");

const itemList = document.getElementById("item-list");
const emptyState = document.getElementById("empty-state");

const statTotal = document.getElementById("stat-total");
const statActive = document.getElementById("stat-active");
const statInactive = document.getElementById("stat-inactive");

const filterStatus = document.getElementById("filter-status");
const filterCategory = document.getElementById("filter-category");
const filterPriority = document.getElementById("filter-priority");
const searchInput = document.getElementById("search-input");

const cancelBtn = document.getElementById("cancel-btn");
const submitBtn = document.getElementById("submit-btn");

// ====== EVENTOS ======
form.addEventListener("submit", handleSubmit);
cancelBtn.addEventListener("click", resetForm);

filterStatus.addEventListener("change", render);
filterCategory.addEventListener("change", render);
filterPriority.addEventListener("change", render);
searchInput.addEventListener("input", render);

// ====== FUNCIONES ======

function handleSubmit(e) {
  e.preventDefault();

  const freelancer = {
    id: editingId ?? Date.now(),
    name: nameInput.value.trim(),
    description: descriptionInput.value.trim(),
    category: categoryInput.value,
    level: levelInput.value,
    active: true,
    createdAt: new Date().toLocaleDateString()
  };

  if (editingId) {
    freelancers = freelancers.map(f =>
      f.id === editingId ? freelancer : f
    );
  } else {
    freelancers.push(freelancer);
  }

  resetForm();
  render();
}

function resetForm() {
  form.reset();
  editingId = null;
  submitBtn.textContent = "Crear";
  cancelBtn.style.display = "none";
}

function toggleStatus(id) {
  freelancers = freelancers.map(f =>
    f.id === id ? { ...f, active: !f.active } : f
  );
  render();
}

function editFreelancer(id) {
  const freelancer = freelancers.find(f => f.id === id);
  if (!freelancer) return;

  nameInput.value = freelancer.name;
  descriptionInput.value = freelancer.description;
  categoryInput.value = freelancer.category;
  levelInput.value = freelancer.level;

  editingId = id;
  submitBtn.textContent = "Actualizar";
  cancelBtn.style.display = "inline-block";
}

function deleteFreelancer(id) {
  freelancers = freelancers.filter(f => f.id !== id);
  render();
}

function applyFilters(list) {
  return list.filter(f => {
    const statusOk =
      filterStatus.value === "all" ||
      (filterStatus.value === "active" && f.active) ||
      (filterStatus.value === "inactive" && !f.active);

    const categoryOk =
      filterCategory.value === "all" ||
      f.category === filterCategory.value;

    const levelOk =
      filterPriority.value === "all" ||
      f.level === filterPriority.value;

    const searchOk =
      f.name.toLowerCase().includes(searchInput.value.toLowerCase());

    return statusOk && categoryOk && levelOk && searchOk;
  });
}

function render() {
  itemList.innerHTML = "";

  const filtered = applyFilters(freelancers);

  emptyState.classList.toggle("show", filtered.length === 0);

  filtered.forEach(f => {
    const div = document.createElement("div");
    div.className = `item ${f.active ? "" : "completed"}`;

    div.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${f.active ? "" : "checked"}
        onclick="toggleStatus(${f.id})">

      <div class="task-content">
        <h3>${f.name}</h3>
        <p>${f.description || "Sin descripción"}</p>

        <div class="task-meta">
          <span class="task-badge badge-category">${f.category}</span>
          <span class="task-badge badge-priority ${f.level}">
            ${f.level.toUpperCase()}
          </span>
          <span class="task-date">📅 ${f.createdAt}</span>
        </div>
      </div>

      <div class="task-actions">
        <button class="btn-edit" onclick="editFreelancer(${f.id})">✏️</button>
        <button class="btn-delete" onclick="deleteFreelancer(${f.id})">🗑️</button>
      </div>
    `;

    itemList.appendChild(div);
  });

  updateStats();
}

function updateStats() {
  statTotal.textContent = freelancers.length;
  statActive.textContent = freelancers.filter(f => f.active).length;
  statInactive.textContent = freelancers.filter(f => !f.active).length;
}

// ====== EXPONER FUNCIONES ======
window.toggleStatus = toggleStatus;
window.editFreelancer = editFreelancer;
window.deleteFreelancer = deleteFreelancer;
