const signinForm = document.getElementById('signin__form');
const welcomeBlock = document.getElementById('welcome');
const userIdElement = document.getElementById('user_id');

// При отправке формы
signinForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем данные из формы
  const formData = new FormData(signinForm);
  const login = formData.get('login');
  const password = formData.get('password');

  // Отправляем POST-запрос на сервер
  const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Проверяем статус ответа
  if (response.ok) {
    const data = await response.json();

    if (data.success) {
      // Сохраняем id пользователя в локальное хранилище
      localStorage.setItem('user_id', data.user_id);

      // Отображаем блок приветствия с id пользователя
      userIdElement.textContent = data.user_id;
      welcomeBlock.classList.add('welcome_active');

      // Скрываем блок с инпутами
      const signinInputsBlock = document.getElementById('signin');
      signinInputsBlock.style.display = 'none';
    } else {
      alert('Неверный логин/пароль');
    }
  } else {
    alert('Ошибка сервера');
  }
});

// При загрузке страницы
window.addEventListener('load', () => {
  // Проверяем, есть ли сохраненный id пользователя в локальном хранилище
  const userId = localStorage.getItem('user_id');

  if (userId) {
    // Отображаем блок приветствия с сохраненным id пользователя
    userIdElement.textContent = userId;
    welcomeBlock.classList.add('welcome_active');

    // Скрываем блок с инпутами
    const signinInputsBlock = document.getElementById('signin');
    signinInputsBlock.style.display = 'none';
  }
});