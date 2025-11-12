// Contenido de server.js
import express from 'express';
// Importar todas las rutas
import usuariosRoutes from './routes/usuarioRoutes.js';
import divisasRoutes from './routes/divisaRoutes.js';
import operacionesRoutes from './routes/operacionesRoutes.js';
import calculadoraRoutes from './routes/calculadoraRoutes.js'; // Ya creada en la respuesta anterior

const app = express();
app.use(express.json());

// Enlace de Rutas (Endpoints)
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/divisas', divisasRoutes);
app.use('/api/operaciones', operacionesRoutes);
app.use('/api/calculadora', calculadoraRoutes); // Para /divisa, /nomina, /hipoteca

// Rutas de cálculo
// POST para enviar datos y obtener el resultado, creando una OPERACION
router.post('/divisa', calculadoraController.calcularDivisa);
router.post('/nomina', calculadoraController.calcularNomina);
router.post('/hipoteca', calculadoraController.simularHipoteca);

export default router;
// Si usa require/module.exports:
// module.exports = router;