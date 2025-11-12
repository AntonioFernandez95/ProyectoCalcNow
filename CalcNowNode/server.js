import express from 'express';
// --- Importación de Rutas ---
// 1. Recursos CRUD
import usuariosRoutes from './routes/usuarioRoutes.js';
import divisasRoutes from './routes/divisaRoutes.js';
import operacionesRoutes from './routes/operacionesRoutes.js';

// 2. Acciones/Cálculo
import calculadoraRoutes from './routes/calculadoraRoutes.js'; 

// 1. Crear instancia de la aplicación
const app = express();

// 2. Middleware esencial: Permite a Express leer cuerpos JSON
app.use(express.json());

// 3. Enlace de Rutas (Endpoints)
// Definir la ruta base y asociarla al router correspondiente
app.use('/api/usuarios', usuariosRoutes);       // /api/usuarios
app.use('/api/divisas', divisasRoutes);         // /api/divisas
app.use('/api/operaciones', operacionesRoutes); // /api/operaciones y /api/operaciones/usuario/:id
app.use('/api/calculadora', calculadoraRoutes); // /api/calculadora/divisa, /nomina, /hipoteca

// 4. Ruta de prueba básica (Root)
app.get('/', (req, res) => {
    // Retorna una respuesta simple y clara
    res.send({ 
        message: 'API REST de Calculadora en ejecución',
        documentation: 'Consulte la documentación para los endpoints /api/...' 
    });
});

// 5. Definir el puerto y arrancar el servidor
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`✅ Servidor en ejecución: http://localhost:${PORT}`);
});