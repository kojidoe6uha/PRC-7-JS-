// ========== ДАННЫЕ ПРОЕКТОВ ==========
const projects = [
  { id: 1, title: 'Лендинг кофейни', category: 'frontend', description: 'Адаптивная вёрстка на Flexbox и Grid' },
  { id: 2, title: 'Бот для Telegram', category: 'backend', description: 'Python, обработка заказов и уведомлений' },
  { id: 3, title: 'Игра 2048', category: 'frontend', description: 'Логика на чистом JS, анимации' },
  { id: 4, title: 'Дизайн-макет портала', category: 'design', description: 'UI/UX в Figma, прототипирование' },
  { id: 5, title: 'REST API для блога', category: 'backend', description: 'Node.js, Express, MongoDB' },
  { id: 6, title: 'Брендинг стартапа', category: 'design', description: 'Логотип, фирменный стиль, гайдлайн' },
];

// ========== ГЕНЕРАЦИЯ КАРТОЧЕК ==========
function createCard(project) {
  return `
    <article class="project-card" data-category="${project.category}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </article>
  `;
}

function renderProjects(list) {
  const container = document.getElementById('projects-grid');
  container.innerHTML = list.map(createCard).join('');
}

// Первоначальная отрисовка
renderProjects(projects);

// ========== ТЕМА (localStorage) ==========
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// ========== БУРГЕР-МЕНЮ ==========
const burgerBtn = document.getElementById('burger-btn');
const nav = document.querySelector('nav');

burgerBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// ========== КНОПКА «ПОКАЗАТЬ БОЛЬШЕ» ==========
const toggleBtn = document.getElementById('toggle-btn');
const extraInfo = document.getElementById('extra-info');

toggleBtn.addEventListener('click', () => {
  extraInfo.classList.toggle('expanded');
  toggleBtn.textContent = extraInfo.classList.contains('expanded')
    ? 'Скрыть'
    : 'Показать больше';
});

// ========== ФИЛЬТРАЦИЯ ПО КАТЕГОРИЯМ ==========
const filterButtons = document.querySelectorAll('.filters button');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // снимаем active со всех кнопок
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const filtered = filter === 'all'
      ? projects
      : projects.filter(p => p.category === filter);
    renderProjects(filtered);
  });
});

// ========== ПОИСК ПО НАЗВАНИЮ ==========
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  // фильтруем по названию (регистронезависимо)
  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(query)
  );
  renderProjects(filtered);
});

// ========== ВАЛИДАЦИЯ ФОРМЫ ==========
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Введите имя';
    isValid = false;
  } else {
    nameError.textContent = '';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = 'Введите корректный email';
    isValid = false;
  } else {
    emailError.textContent = '';
  }

  if (isValid) {
    alert('Форма заполнена верно! (отправка на сервер не настроена)');
    form.reset();
  }
});