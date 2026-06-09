// ==========================================
// SELETORES
// ==========================================
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');

// ==========================================
// ADICIONAR TAREFA
// ==========================================
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const texto = input.value.trim();

  if (!texto) return;

  const li = criarItemTarefa(texto);
  lista.appendChild(li);

  input.value = '';
  input.focus();
});

function criarItemTarefa(texto) {
  const li = document.createElement('li');
  li.classList.add('item-tarefa');

  li.innerHTML = `
    <button class="btn-check" aria-label="Concluir tarefa">
      <i class="fa-regular fa-circle"></i>
    </button>
    <span class="texto-tarefa">${texto}</span>
    <button class="btn-deletar" aria-label="Deletar tarefa">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  return li;
}