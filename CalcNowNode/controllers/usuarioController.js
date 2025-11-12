import usuarioService from '../services/usuarioService.js';

const usuarioController = {
    async getAllUsuarios(req, res) {
        try {
            const usuarios = await usuarioService.getAll();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
        }
    },
    
    async getUsuarioById(req, res) {
        try {
            const id = req.params.id;
            const usuario = await usuarioService.getById(id);
            if (!usuario) { return res.status(404).json({ message: 'Usuario no encontrado.' }); }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
        }
    },

    async createUsuario(req, res) {
        try {
            const nuevoUsuario = await usuarioService.create(req.body);
            res.status(201).json(nuevoUsuario); // 201 Created
        } catch (error) {
            res.status(400).json({ message: 'Error al crear el usuario', error: error.message });
        }
    },
    // ... Implementaciones de updateUsuario y deleteUsuario
};

export default usuarioController;