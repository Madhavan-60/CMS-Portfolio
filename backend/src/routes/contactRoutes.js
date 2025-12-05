import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { submitMessage, listMessages } from '../controllers/contactController.js';

const router = Router();
router.post('/', submitMessage);
router.get('/', authenticate, listMessages);

export default router;
