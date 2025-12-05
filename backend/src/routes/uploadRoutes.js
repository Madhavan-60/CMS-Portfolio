import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { uploadImage, uploadMiddleware } from '../controllers/uploadController.js';

const router = Router();
router.post('/image', authenticate, uploadMiddleware.single('file'), uploadImage);

export default router;
