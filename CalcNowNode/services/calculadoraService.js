import { readData, writeData } from './dataService.js';

const OPERACIONES_FILE = 'operaciones.json';
const TASAS_FILE = 'tasas_cambio.json';
const DIVISAS_FILE = 'divisas.json';

const calculadoraService = {

    async registrarOperacion(usuarioId, tipo, datosEntrada, resultado) {
        const operaciones = await readData(OPERACIONES_FILE);
        const newId = operaciones.length > 0 ? Math.max(...operaciones.map(o => o.id)) + 1 : 1;
        
        const nuevaOperacion = {
            id: newId, usuarioId, tipoOperacion: tipo, datosEntrada, resultado,
            fechaHora: new Date().toISOString()
        };
        operaciones.push(nuevaOperacion);
        await writeData(OPERACIONES_FILE, operaciones);
        return nuevaOperacion;
    },

    async calcularDivisa(usuarioId, monto, origenSimbolo, destinoSimbolo) {
        const divisas = await readData(DIVISAS_FILE);
        const tasas = await readData(TASAS_FILE);

        const divOrigen = divisas.find(d => d.simbolo === origenSimbolo);
        const divDestino = divisas.find(d => d.simbolo === destinoSimbolo);
        if (!divOrigen || !divDestino) { throw new Error('Divisa no encontrada.'); }

        // Buscar tasa EUR -> USD o USD -> EUR etc.
        let tasa = tasas.find(t => t.origenId === divOrigen.id && t.destinoId === divDestino.id);
        if (!tasa) { throw new Error(`Tasa de ${origenSimbolo} a ${destinoSimbolo} no encontrada.`); }

        const montoFinal = monto * tasa.valorTasa;
        const resultado = { montoFinal: parseFloat(montoFinal.toFixed(2)), tasaUsada: tasa.valorTasa };
        const datosEntrada = { monto, origen: origenSimbolo, destino: destinoSimbolo };

        await this.registrarOperacion(usuarioId, 'CALCULO_DIVISA', datosEntrada, resultado);
        return resultado;
    },

    async calcularNomina(usuarioId, datosNomina) {
        // Lógica de simulación simplificada
        const { sueldoBrutoAnual, pagasAnuales } = datosNomina;
        const IRPF_RATE = 0.20; 
        const SS_RATE = 0.04;

        const sueldoNetoAnual = sueldoBrutoAnual * (1 - IRPF_RATE - SS_RATE);
        const sueldoNetoMensual = sueldoNetoAnual / pagasAnuales;

        const resultado = {
            sueldoNetoMensual: parseFloat(sueldoNetoMensual.toFixed(2)),
            IRPF_Aplicado: IRPF_RATE * 100 + '%',
        };

        await this.registrarOperacion(usuarioId, 'CALCULO_NOMINA', datosNomina, resultado);
        return resultado;
    },

    async simularHipoteca(usuarioId, datosHipoteca) {
        // Lógica de cálculo de cuota (fórmula de anualidad)
        const { precioInmueble, pagoAportado, plazoAnios, porcentajeInteres } = datosHipoteca;

        const principal = precioInmueble - pagoAportado;
        const tasaMensual = porcentajeInteres / 100 / 12;
        const numeroPagos = plazoAnios * 12;

        if (tasaMensual === 0) {
            const cuotaMensual = principal / numeroPagos;
            const resultado = { cuotaMensual: parseFloat(cuotaMensual.toFixed(2)), pagoTotal: principal.toFixed(2), interesTotal: 0 };
            await this.registrarOperacion(usuarioId, 'SIMULACION_HIPOTECA', datosHipoteca, resultado);
            return resultado;
        }

        const cuotaMensual = principal * (tasaMensual * Math.pow((1 + tasaMensual), numeroPagos)) / (Math.pow((1 + tasaMensual), numeroPagos) - 1);
        const pagoTotal = cuotaMensual * numeroPagos;
        const interesTotal = pagoTotal - principal;

        const resultado = {
            cuotaMensual: parseFloat(cuotaMensual.toFixed(2)),
            pagoTotal: parseFloat(pagoTotal.toFixed(2)),
            interesTotal: parseFloat(interesTotal.toFixed(2))
        };

        await this.registrarOperacion(usuarioId, 'SIMULACION_HIPOTECA', datosHipoteca, resultado);
        return resultado;
    }
};

export default calculadoraService;