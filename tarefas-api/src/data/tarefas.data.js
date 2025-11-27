export const STATUS_VALIDOS = ['pendente', 'realizando', 'concluída'];

let tarefas = [
  {
    id: 1,
    titulo: 'Estudar API',
    descricao: 'Estudar como criar uma API RESTful',
    status: 'pendente',
    data_vencimento: '2024-12-31'
  },
  {
    id: 2,
    titulo: 'Finalizar projeto',
    descricao: 'Finalizar o projeto de API',
    status: 'realizando',
    data_vencimento: '2024-12-25'
  }
];

let nextId = 3;

export function getAllTarefasData() {
  return tarefas;
}

export function getTarefasByStatusData(status) {
  return tarefas.filter(t => t.status === status);
}

export function getTarefaByIdData(id) {
  return tarefas.find(t => t.id === id);
}

export function createTarefaData({ titulo, descricao, status, data_vencimento }) {
  const nova = {
    id: nextId++,
    titulo,
    descricao: descricao || null,
    status,
    data_vencimento: data_vencimento || null
  };
  tarefas.push(nova);
  return nova;
}

export function updateTarefaData(id, campos) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return null;

  const atual = tarefas[index];

  tarefas[index] = {
    ...atual,
    ...campos
  };

  return tarefas[index];
}

export function deleteTarefaData(id) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return false;
  tarefas.splice(index, 1);
  return true;
}
