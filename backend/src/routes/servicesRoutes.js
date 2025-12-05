import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { makeList, makeCreate, makeUpdate, makeRemove } from '../controllers/genericController.js';

const router = Router();
router.get('/', makeList('services'));
router.post('/', authenticate, makeCreate('services'));
router.put('/:id', authenticate, makeUpdate('services'));
router.delete('/:id', authenticate, makeRemove('services'));

export default router;
