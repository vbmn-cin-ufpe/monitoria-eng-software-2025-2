import {
  listarTarefasService,
  buscarTarefaPorIdService,
  criarTarefaService,
  atualizarTarefaService,
  deletarTarefaService,
  STATUS_VALIDOS
} from '../services/tarefas.service.js';

export function listarTarefasController(req, res, next) {
  try {
    const { status } = req.query;

    if (status && !STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({
        erro: `Status inválido. Use um destes valores: ${STATUS_VALIDOS.join(', ')}.`
      });
    }

    const tarefas = listarTarefasService(status);
    return res.status(200).json(tarefas);
  } catch (err) {
    next(err);
  }
}

export function buscarTarefaPorIdController(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }

    const tarefa = buscarTarefaPorIdService(id);
    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    return res.status(200).json(tarefa);
  } catch (err) {
    next(err);
  }
}

export function criarTarefaController(req, res, next) {
  try {
    const { titulo, descricao, status, data_vencimento } = req.body;

    const nova = criarTarefaService({ titulo, descricao, status, data_vencimento });
    return res.status(201).json(nova);
  } catch (err) {
    next(err);
  }
}

export function atualizarTarefaController(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }

    const existente = buscarTarefaPorIdService(id);
    if (!existente) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    const { titulo, descricao, status, data_vencimento } = req.body;

    const atualizada = atualizarTarefaService(id, {
      ...(titulo !== undefined && { titulo }),
      ...(descricao !== undefined && { descricao }),
      ...(status !== undefined && { status }),
      ...(data_vencimento !== undefined && { data_vencimento })
    });

    return res.status(200).json(atualizada);
  } catch (err) {
    next(err);
  }
}

export function deletarTarefaController(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }

    const removida = deletarTarefaService(id);
    if (!removida) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    return res.status(200).json({ mensagem: 'Tarefa removida com sucesso.' });
  } catch (err) {
    next(err);
  }
}
