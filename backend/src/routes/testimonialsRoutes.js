import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { makeList, makeCreate, makeUpdate, makeRemove } from '../controllers/genericController.js';

const router = Router();
router.get('/', makeList('testimonials'));
router.post('/', authenticate, makeCreate('testimonials'));
router.put('/:id', authenticate, makeUpdate('testimonials'));
router.delete('/:id', authenticate, makeRemove('testimonials'));

export default router;
