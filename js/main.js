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
  atualizarContador();
  salvarTarefas();

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

// ==========================================
// CONCLUIR E DELETAR (Event Delegation)
// ==========================================
lista.addEventListener('click', (e) => {
  const item = e.target.closest('.item-tarefa');
  if (!item) return;

  // Deletar
  if (e.target.closest('.btn-deletar')) {
    item.remove();
    atualizarContador();
    salvarTarefas();
    return;
  }

  // Concluir
  if (e.target.closest('.btn-check')) {
    item.classList.toggle('concluida');
    atualizarIconeCheck(item);
    atualizarContador();
    salvarTarefas();
  }
});

function atualizarIconeCheck(item) {
  const icone = item.querySelector('.btn-check i');
  const concluida = item.classList.contains('concluida');

  icone.className = concluida
    ? 'fa-solid fa-circle-check'
    : 'fa-regular fa-circle';
}

// ==========================================
// CONTADOR
// ==========================================
function atualizarContador() {
  const pendentes = lista.querySelectorAll('.item-tarefa:not(.concluida)').length;
  const contador = document.querySelector('.contador');
  contador.textContent = `${pendentes} pendente${pendentes !== 1 ? 's' : ''}`;
}

// ==========================================
// LOCALSTORAGE — SALVAR
// ==========================================
function salvarTarefas() {
  const itens = lista.querySelectorAll('.item-tarefa');

  const tarefas = Array.from(itens).map((item) => ({
    texto: item.querySelector('.texto-tarefa').textContent,
    concluida: item.classList.contains('concluida'),
  }));

  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// ==========================================
// LOCALSTORAGE — CARREGAR
// ==========================================
function carregarTarefas() {
  const salvas = localStorage.getItem('tarefas');
  if (!salvas) return;

  const tarefas = JSON.parse(salvas);

  tarefas.forEach((tarefa) => {
    const li = criarItemTarefa(tarefa.texto);
    if (tarefa.concluida) {
      li.classList.add('concluida');
      atualizarIconeCheck(li);
    }
    lista.appendChild(li);
  });

  atualizarContador();
}

// Carrega as tarefas assim que a página abre
carregarTarefas();

// ==========================================
// FILTROS
// ==========================================
const botoesFiltro = document.querySelectorAll('.btn-filtro');

botoesFiltro.forEach((btn) => {
  btn.addEventListener('click', () => {
    botoesFiltro.forEach((b) => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    filtrar(btn.dataset.filtro);
  });
});

function filtrar(tipo) {
  const itens = lista.querySelectorAll('.item-tarefa');

  itens.forEach((item) => {
    switch (tipo) {
      case 'ativas':
        item.style.display = item.classList.contains('concluida')
          ? 'none'
          : 'flex';
        break;
      case 'concluidas':
        item.style.display = item.classList.contains('concluida')
          ? 'flex'
          : 'none';
        break;
      default:
        item.style.display = 'flex';
    }
  });
}