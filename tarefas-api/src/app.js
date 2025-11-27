import express from 'express';
import tarefasRoutes from './routes/tarefas.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/tarefas', tarefasRoutes);

// middleware de erro (sempre por último)
app.use(errorHandler);

export default app;
