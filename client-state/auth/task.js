const signinForm = document.getElementById('signin__form');
const welcomeBlock = document.getElementById('welcome');
const userIdSpan = document.getElementById('user_id');

// Проверяем, есть ли id пользователя в локальном хранилище
const userId = localStorage.getItem('user_id');
if (userId) {
  // Если есть, отображаем блок приветствия с заданным id пользователя
  welcomeBlock.classList.add('welcome_active');
  userIdSpan.textContent = userId;
}

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Авторизация успешна
          welcomeBlock.classList.add('welcome_active');
          userIdSpan.textContent = response.user_id;
          // Сохраняем id пользователя в локальное хранилище
          localStorage.setItem('user_id', response.user_id);
        } else {
          // Неверный логин/пароль
          console.error('Неверный логин/пароль');
        }
      } else {
        // Ошибка при авторизации
        console.error('Ошибка:', xhr.status);
      }
    }
  };

  xhr.send(new FormData(signinForm));
});
