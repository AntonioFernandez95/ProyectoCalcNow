import { readData, writeData } from './dataService.js';

const USERS_FILE = 'usuarios.json';

const usuarioService = {
    async getAll() { return readData(USERS_FILE); },

    async getById(id) {
        const usuarios = await this.getAll();
        return usuarios.find(u => u.id === parseInt(id));
    },

    async create(nuevoUsuario) {
        const usuarios = await this.getAll();
        const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
        const usuarioConId = { 
            id: newId, 
            ...nuevoUsuario, 
            fechaRegistro: new Date().toISOString(),
            estadoCuenta: 'Activo' 
        };
        usuarios.push(usuarioConId);
        await writeData(USERS_FILE, usuarios);
        return usuarioConId;
    },
    
    // ... Implementaciones de update y delete
};

export default usuarioService;