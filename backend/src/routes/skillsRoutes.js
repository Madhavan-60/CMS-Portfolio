import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { makeList, makeCreate, makeUpdate, makeRemove } from '../controllers/genericController.js';

const router = Router();
router.get('/', makeList('skills'));
router.post('/', authenticate, makeCreate('skills'));
router.put('/:id', authenticate, makeUpdate('skills'));
router.delete('/:id', authenticate, makeRemove('skills'));

export default router;
