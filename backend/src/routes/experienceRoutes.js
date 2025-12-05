import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { makeList, makeCreate, makeUpdate, makeRemove } from '../controllers/genericController.js';

const router = Router();
router.get('/', makeList('experience'));
router.post('/', authenticate, makeCreate('experience'));
router.put('/:id', authenticate, makeUpdate('experience'));
router.delete('/:id', authenticate, makeRemove('experience'));

export default router;
