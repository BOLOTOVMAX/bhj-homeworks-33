const form = document.getElementById('myForm');
const progress = document.getElementById('progress');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      const percentComplete = event.loaded / event.total;
      progress.value = percentComplete;
    }
  });

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Форма успешно отправлена
        console.log(xhr.responseText);
      } else {
        // Ошибка при отправке формы
        console.error('Ошибка:', xhr.status);
      }
    }
  };

  xhr.send(new FormData(form));
});