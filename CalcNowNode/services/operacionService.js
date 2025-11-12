import { readData } from './dataService.js';

const OPERACIONES_FILE = 'operaciones.json';

const operacionService = {
    async getAll() { return readData(OPERACIONES_FILE); },
    
    // Obtiene operaciones de un usuario específico (relación del ERD)
    async getByUsuario(usuarioId) {
        const operaciones = await this.getAll();
        return operaciones.filter(o => o.usuarioId === parseInt(usuarioId)); 
    }
};

export default operacionService;