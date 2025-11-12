import calculadoraService from '../services/calculadoraService.js';

const calculadoraController = {
    
    async calcularDivisa(req, res) {
        const { usuarioId, monto, origenSimbolo, destinoSimbolo } = req.body; 
        if (!usuarioId || !monto || !origenSimbolo || !destinoSimbolo) {
            return res.status(400).json({ message: 'Faltan parámetros de divisa.' });
        }

        try {
            const resultado = await calculadoraService.calcularDivisa(usuarioId, monto, origenSimbolo, destinoSimbolo);
            res.status(200).json({ message: 'Cálculo de divisa realizado y registrado.', data: resultado });
        } catch (error) {
            res.status(400).json({ message: 'Error en el cálculo de divisa.', error: error.message });
        }
    },

    async calcularNomina(req, res) {
        const { usuarioId, sueldoBrutoAnual, pagasAnuales, ...otrosDatos } = req.body;
        
        if (!usuarioId || !sueldoBrutoAnual || !pagasAnuales) {
            return res.status(400).json({ message: 'Faltan parámetros de nómina esenciales.' });
        }

        try {
            const datosNomina = { sueldoBrutoAnual, pagasAnuales, ...otrosDatos };
            const resultado = await calculadoraService.calcularNomina(usuarioId, datosNomina);
            res.status(200).json({ message: 'Cálculo de nómina realizado y registrado.', data: resultado });
        } catch (error) {
            res.status(400).json({ message: 'Error en el cálculo de nómina.', error: error.message });
        }
    },

    async simularHipoteca(req, res) {
        const { usuarioId, precioInmueble, plazoAnios, ...otrosDatos } = req.body;
        
        if (!usuarioId || !precioInmueble || !plazoAnios) {
            return res.status(400).json({ message: 'Faltan parámetros de hipoteca esenciales.' });
        }
        
        try {
            const datosHipoteca = { precioInmueble, plazoAnios, ...otrosDatos };
            const resultado = await calculadoraService.simularHipoteca(usuarioId, datosHipoteca);
            res.status(200).json({ message: 'Simulación de hipoteca realizada y registrada.', data: resultado });
        } catch (error) {
            res.status(400).json({ message: 'Error en la simulación de hipoteca.', error: error.message });
        }
    }
};

export default calculadoraController;