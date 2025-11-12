import divisaService from '../services/divisaService.js';

const divisaController = {
    async getAllDivisas(req, res) {
        try {
            const divisas = await divisaService.getAll();
            res.status(200).json(divisas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener divisas', error: error.message });
        }
    }
};

export default divisaController;