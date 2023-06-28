
const editor = document.getElementById('editor');

const editorValue = localStorage.getItem('editor_value');
if (editorValue) {
  editor.value = editorValue;
}

editor.addEventListener('input', () => {
  localStorage.setItem('editor_value', editor.value);
});