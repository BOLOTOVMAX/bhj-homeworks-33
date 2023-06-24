const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

fetch('https://students.netoservices.ru/nestjs-backend/poll')
  .then(response => response.json())
  .then(data => {
    pollTitle.textContent = data.data.title;
    data.data.answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.classList.add('poll__answer');
        answerButton.textContent = answer;
        answerButton.addEventListener('click', () => {
          alert('Спасибо, ваш голос засчитан!');
        });
        pollAnswers.appendChild(answerButton);
      });
    })
    .catch(error => console.error(error));