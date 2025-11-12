import { readData } from './dataService.js';

const DIVISAS_FILE = 'divisas.json';

const divisaService = {
    async getAll() { return readData(DIVISAS_FILE); },
    // Puede añadir lógica de creación si es necesario
};

export default divisaService;