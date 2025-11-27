import { Router } from 'express';
import {
  listarTarefasController,
  buscarTarefaPorIdController,
  criarTarefaController,
  atualizarTarefaController,
  deletarTarefaController
} from '../controllers/tarefas.controller.js';
import {
  validarNovaTarefa,
  validarAtualizacaoTarefa
} from '../middlewares/validateTarefa.js';

const router = Router();

// GET /tarefas  (com ou sem ?status=)
router.get('/', listarTarefasController);

// GET /tarefas/:id
router.get('/:id', buscarTarefaPorIdController);

// POST /tarefas
router.post('/', validarNovaTarefa, criarTarefaController);

// PUT /tarefas/:id
router.put('/:id', validarAtualizacaoTarefa, atualizarTarefaController);

// DELETE /tarefas/:id
router.delete('/:id', deletarTarefaController);

export default router;
