import express from 'express';
import divisaController from '../controllers/divisaController.js';

const router = express.Router();

router.get('/', divisaController.getAllDivisas);

export default router;