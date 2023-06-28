const signinForm = document.getElementById('signin__form');
const welcomeBlock = document.getElementById('welcome');
const userIdSpan = document.getElementById('user_id');

const userId = localStorage.getItem('user_id');
if (userId) {
  userIdSpan.textContent = userId;
  welcomeBlock.classList.add('welcome_active');
}

signinForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const login = signinForm.elements.login.value;
  const password = signinForm.elements.password.value;

  fetch('https://students.netoservices.ru/nestjs-backend/auth', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('user_id', data.user_id);
        userIdSpan.textContent = data.user_id;
        welcomeBlock.classList.add('welcome_active');
      } else {
        alert('Неверный логин/пароль');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
});