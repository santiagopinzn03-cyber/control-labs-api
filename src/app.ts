import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes'
import { requestLogger } from './middlewares/logger.middleware';
import { globalErrorHandler } from './middlewares/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health Check Endpoint (ubicado antes de las rutas principales/404)
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'ControlLabs API operando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta temporal para provocar el 500 (solo desarrollo, eliminar al terminar)
app.get('/__test/error', (_req, _res, next) => {
  next(new Error('Error de prueba'));
});

app.use('/api/v1', router);

// Manejador de ruta no encontrada (404)[cite: 11]
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada.' });
});

// Manejador global de errores (debe ir al final con 4 parámetros)[cite: 11]
app.use(globalErrorHandler);

export default app;