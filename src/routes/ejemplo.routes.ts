import { Router } from 'express';
import { EjemploController } from '../controllers/ejemplo.controller';

const router = Router();

// Vinculación: Ruta -> Método Controlador
router.get('/saludo', EjemploController.saludarSena);

export default router;