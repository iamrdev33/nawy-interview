import apartmentsRoutes from './apartments.routes';
import express from 'express';

const router = express.Router();

router.use('/apartments', apartmentsRoutes);

export default router;
