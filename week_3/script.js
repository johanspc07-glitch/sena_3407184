class BaseItem {
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  constructor(name, location) {
    if (this.constructor === BaseItem) {
      throw new Error('No se puede instanciar BaseItem directamente');
    }

    this.#id = Date.now();
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get isActive() {
    return this.#active;
  }

  get location() {
    return this.#location;
  }

  get dateCreated() {
    return this.#dateCreated;
  }

  set location(value) {
    if (!value || value.length < 2) {
      throw new Error('Ubicación inválida');
    }
    this.#location = value;
  }

  activate() {
    this.#active = true;
  }

  deactivate() {
    this.#active = false;
  }

  getType() {
    return this.constructor.name;
  }

  getInfo() {
    throw new Error('getInfo() debe ser implementado');
  }
}

class WebProject extends BaseItem {
  #budget;
  #technology;

  constructor(name, location, budget, technology) {
    super(name, location);
    this.#budget = budget;
    this.#technology = technology;
  }

  getInfo() {
    return `Proyecto Web | ${this.#technology} | $${this.#budget}`;
  }
}


class MobileProject extends BaseItem {
  #platform;
  #budget;

  constructor(name, location, platform, budget) {
    super(name, location);
    this.#platform = platform;
    this.#budget = budget;
  }

  getInfo() {
    return `Proyecto Mobile | ${this.#platform} | $${this.#budget}`;
  }
}

class DesignProject extends BaseItem {
  #designType;

  constructor(name, location, designType) {
    super(name, location);
    this.#designType = designType;
  }

  getInfo() {
    return `Diseño | ${this.#designType}`;
  }
}

class Person {
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    this.#id = Date.now();
    this.#name = name;
    this.email = email;
    this.#registrationDate = new Date().toISOString();
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (!value.includes('@')) {
      throw new Error('Email inválido');
    }
    this.#email = value;
  }
}

class Freelancer extends Person {
  #skill;

  constructor(name, email, skill) {
    super(name, email);
    this.#skill = skill;
  }

  get role() {
    return 'Freelancer';
  }
}

class Client extends Person {
  #company;

  constructor(name, email, company) {
    super(name, email);
    this.#company = company;
  }

  get role() {
    return 'Client';
  }
}

class FreelancePlatform {
  #items = [];
  #users = [];

  static {
    this.VERSION = '1.0.0';
  }

  addItem(item) {
    this.#items = [...this.#items, item];
  }

  removeItem(id) {
    this.#items = this.#items.filter(item => item.id !== id);
  }

  toggleItem(id) {
    this.#items = this.#items.map(item => {
      if (item.id === id) {
        item.isActive ? item.deactivate() : item.activate();
      }
      return item;
    });
  }

  getItems() {
    return [...this.#items];
  }

  addUser(user) {
    this.#users = [...this.#users, user];
  }

  getUsers() {
    return [...this.#users];
  }

  getStats() {
    return {
      total: this.#items.length,
      active: this.#items.filter(i => i.isActive).length,
      inactive: this.#items.filter(i => !i.isActive).length,
      users: this.#users.length
    };
  }
}

const platform = new FreelancePlatform();

const itemList = document.getElementById('item-list');
const emptyState = document.getElementById('empty-state');

const statTotal = document.getElementById('stat-total');
const statActive = document.getElementById('stat-active');
const statInactive = document.getElementById('stat-inactive');
const statUsers = document.getElementById('stat-users');

function renderItems() {
  const items = platform.getItems();
  itemList.innerHTML = '';

  if (items.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <h3 class="item-title">${item.name}</h3>
      <p class="item-details">${item.getInfo()}</p>
      <p class="item-details">Ubicación: ${item.location}</p>
      <span class="availability-badge ${item.isActive ? 'available' : 'borrowed'}">
        ${item.isActive ? 'Activo' : 'Inactivo'}
      </span>
      <div class="item-actions">
        <button class="btn btn-small btn-warning" data-id="${item.id}">Toggle</button>
        <button class="btn btn-small btn-danger" data-id="${item.id}">Eliminar</button>
      </div>
    `;

    itemList.appendChild(card);
  });
}

function renderStats() {
  const stats = platform.getStats();
  statTotal.textContent = stats.total;
  statActive.textContent = stats.active;
  statInactive.textContent = stats.inactive;
  statUsers.textContent = stats.users;
}

itemList.addEventListener('click', e => {
  const id = Number(e.target.dataset.id);
  if (e.target.classList.contains('btn-warning')) {
    platform.toggleItem(id);
  }
  if (e.target.classList.contains('btn-danger')) {
    platform.removeItem(id);
  }
  renderItems();
  renderStats();
});

platform.addItem(new WebProject('Landing Page', 'Remoto', 800, 'React'));
platform.addItem(new MobileProject('App Delivery', 'Bogotá', 'Android', 1500));
platform.addItem(new DesignProject('Branding', 'Medellín', 'UI/UX'));

platform.addUser(new Freelancer('Carlos', 'carlos@mail.com', 'Frontend'));
platform.addUser(new Client('Empresa XYZ', 'contacto@xyz.com', 'XYZ S.A.'));

renderItems();
renderStats();
