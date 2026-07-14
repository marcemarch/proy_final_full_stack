import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import projectsRouter from './routes/projects';
import tasksRouter from './routes/tasks';
import commentsRouter from './routes/comments';
import { errorMiddleware } from './middleware/error.middleware';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

dotenv.config();
const app: Application = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

//app.use(cors());
// Reemplaza app.use(cors()) con esta versión específica:
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
// Guardar el archivo y reiniciar el backend (Ctrl+C → npm run dev)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use('/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/comments', commentsRouter);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    project: 'TaskFlow API', version: '1.2.0', clase: 3,
    endpoints: ['/api/auth', '/api/users', '/api/projects', '/api/tasks',
      '/api/comments']
  });
});

app.use((_req: Request, res: Response) =>
  res.status(404).json({ error: 'Ruta no encontrada' }));
// El error middleware SIEMPRE va al final con 4 parámetros

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`\n🚀 TaskFlow API v3 — http://localhost:${PORT}`);
  console.log(`🔐 Auth: /api/auth/register /api/auth/login`);
  console.log(`✅ Tasks: /api/tasks`);
  console.log(`💬 Comments: /api/comments\n`);
});

export default app;