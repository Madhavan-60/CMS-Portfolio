import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { makeList, makeCreate, makeUpdate, makeRemove } from '../controllers/genericController.js';

const router = Router();
router.get('/', makeList('blogs'));
router.post('/', authenticate, makeCreate('blogs'));
router.put('/:id', authenticate, makeUpdate('blogs'));
router.delete('/:id', authenticate, makeRemove('blogs'));

export default router;
