import { Router } from 'express';
import authRoutes from './authRoutes.js';
import aboutRoutes from './aboutRoutes.js';
import skillsRoutes from './skillsRoutes.js';
import projectsRoutes from './projectsRoutes.js';
import blogsRoutes from './blogsRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import testimonialsRoutes from './testimonialsRoutes.js';
import servicesRoutes from './servicesRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import contactRoutes from './contactRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/about', aboutRoutes);
router.use('/skills', skillsRoutes);
router.use('/projects', projectsRoutes);
router.use('/blogs', blogsRoutes);
router.use('/experience', experienceRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/services', servicesRoutes);
router.use('/upload', uploadRoutes);
router.use('/contact', contactRoutes);

export default router;
