import { Request, Response, NextFunction } from 'express';
import { isCreateIncidentDTO } from '../dtos/incident.dto';

export const validateIncidentPayload = (req: Request, res: Response, next: NextFunction): void => {
    if (!isCreateIncidentDTO(req.body)) {
        res.status(400).json({ success: false, error: 'Datos de la novedad inválidos o incompletos.' });
        return;
    }
    next();
};