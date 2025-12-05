import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getAbout, updateAbout } from '../controllers/aboutController.js';

const router = Router();
router.get('/', getAbout);
router.put('/', authenticate, updateAbout);

export default router;
