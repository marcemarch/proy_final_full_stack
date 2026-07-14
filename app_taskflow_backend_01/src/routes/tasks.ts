import { Router } from 'express';
import { tasksController } from '../controllers/tasks.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schemas';

const router = Router();

router.get('/project/:projectId', authMiddleware, tasksController.getByProject);
router.get('/:id', authMiddleware, tasksController.getById);
router.post('/', authMiddleware, validate(createTaskSchema), tasksController.create);
router.put('/:id', authMiddleware, validate(updateTaskSchema), tasksController.update);
router.delete('/:id', authMiddleware, tasksController.remove);

export default router;