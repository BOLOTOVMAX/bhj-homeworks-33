const modal = document.getElementById('subscribe-modal');
const closeButton = modal.querySelector('.modal__close');

// Проверяем, есть ли информация о закрытии окна в cookie
const isModalClosed = getCookie('modal_closed');
if (!isModalClosed) {
  // Если окно не было закрыто, показываем его
  modal.classList.add('modal_active');
}

closeButton.addEventListener('click', () => {
  // Закрываем окно
  modal.classList.remove('modal_active');
  // Устанавливаем информацию о закрытии окна в cookie на 7 дней
  setCookie('modal_closed', true, 7);
});

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}