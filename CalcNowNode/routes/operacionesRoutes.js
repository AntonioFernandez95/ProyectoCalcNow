import express from 'express';
import operacionController from '../controllers/operacionController.js';

const router = express.Router();

// GET /api/operaciones
router.get('/', operacionController.getAllOperaciones);

// GET /api/operaciones/usuario/:usuarioId (Operaciones por usuario)
router.get('/usuario/:usuarioId', operacionController.getOperacionesByUsuario); 

export default router;