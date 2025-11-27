import { STATUS_VALIDOS } from '../services/tarefas.service.js';

function isValidDate(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

// POST /tarefas
export function validarNovaTarefa(req, res, next) {
  const { titulo, status, data_vencimento } = req.body;

  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({
      erro: 'O campo "titulo" é obrigatório e deve ser uma string não vazia.'
    });
  }

  if (!status || !STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({
      erro: `O campo "status" é obrigatório e deve ser um destes valores: ${STATUS_VALIDOS.join(', ')}.`
    });
  }

  if (data_vencimento && !isValidDate(data_vencimento)) {
    delete req.body.data_vencimento; // trata como não enviada
  }

  next();
}

// PUT /tarefas/:id
export function validarAtualizacaoTarefa(req, res, next) {
  const { titulo, status, data_vencimento } = req.body;

  if (typeof titulo !== 'undefined') {
    if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
      return res.status(400).json({
        erro: 'Se enviado, "titulo" deve ser uma string não vazia.'
      });
    }
  }

  if (typeof status !== 'undefined') {
    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({
        erro: `Se enviado, "status" deve ser um destes valores: ${STATUS_VALIDOS.join(', ')}.`
      });
    }
  }

  if (typeof data_vencimento !== 'undefined') {
    if (data_vencimento && !isValidDate(data_vencimento)) {
      delete req.body.data_vencimento;
    }
  }

  next();
}
