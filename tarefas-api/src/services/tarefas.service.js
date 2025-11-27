import {
  STATUS_VALIDOS,
  getAllTarefasData,
  getTarefasByStatusData,
  getTarefaByIdData,
  createTarefaData,
  updateTarefaData,
  deleteTarefaData
} from '../data/tarefas.data.js';

export { STATUS_VALIDOS };

export function listarTarefasService(status) {
  if (status) {
    return getTarefasByStatusData(status);
  }
  return getAllTarefasData();
}

export function buscarTarefaPorIdService(id) {
  return getTarefaByIdData(id);
}

export function criarTarefaService({ titulo, descricao, status, data_vencimento }) {
  return createTarefaData({ titulo, descricao, status, data_vencimento });
}

export function atualizarTarefaService(id, campos) {
  return updateTarefaData(id, campos);
}

export function deletarTarefaService(id) {
  return deleteTarefaData(id);
}
