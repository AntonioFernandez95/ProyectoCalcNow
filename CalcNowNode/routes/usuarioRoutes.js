import express from 'express';
import usuarioController from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
// Implementar PUT y DELETE si el controller los tiene

export default router;