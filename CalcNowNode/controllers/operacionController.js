import operacionService from '../services/operacionService.js';

const operacionController = {
    async getAllOperaciones(req, res) {
        try {
            const operaciones = await operacionService.getAll();
            res.status(200).json(operaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener operaciones', error: error.message });
        }
    },
    
    async getOperacionesByUsuario(req, res) {
        try {
            const usuarioId = req.params.usuarioId;
            const operaciones = await operacionService.getByUsuario(usuarioId);
            res.status(200).json(operaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener operaciones del usuario', error: error.message });
        }
    }
};

export default operacionController;