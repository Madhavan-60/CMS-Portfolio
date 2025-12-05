import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { makeList, makeCreate, makeUpdate, makeRemove } from '../controllers/genericController.js';

const router = Router();
router.get('/', makeList('projects'));
router.post('/', authenticate, makeCreate('projects'));
router.put('/:id', authenticate, makeUpdate('projects'));
router.delete('/:id', authenticate, makeRemove('projects'));

export default router;
