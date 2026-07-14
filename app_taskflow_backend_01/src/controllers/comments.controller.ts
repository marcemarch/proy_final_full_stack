import { Request, Response } from 'express';
import { commentsService } from '../services/comments.service';
import { CreateCommentDto } from '../types/comment.types';

export const commentsController = {
    async getByTask(req: Request, res: Response): Promise<void> {
        try {
            const comments = await commentsService.findByTask(String(req.params.taskId));
            res.json({ data: comments, count: comments.length });
        } catch (e: any) {
            res.status(e?.status ?? 500).json({ error: e?.message });
        }
    },
    async create(req: Request, res: Response): Promise<void> {
        try {
            const comment = await commentsService.create(
                req.body as CreateCommentDto,
                req.user!.userId
            );
            res.status(201).json({ data: comment });
        } catch (e: any) {
            res.status(e?.status ?? 500).json({ error: e?.message });
        }
    },
    async remove(req: Request, res: Response): Promise<void> {
        try {
            await commentsService.remove(String(req.params.id), req.user!.userId);
            res.status(204).send();
        } catch (e: any) {
            res.status(e?.status ?? 500).json({ error: e?.message });
        }
    },
};