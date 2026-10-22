import { Request, Response, NextFunction } from 'express';
import { isCreateEquipmentDTO } from '../dtos/equipment.dto';

export const validateEquipmentPayload = (req: Request, res: Response, next: NextFunction): void => {
    if (!isCreateEquipmentDTO(req.body)) {
        res.status(400).json({ success: false, error: 'Datos del equipo inválidos o incompletos.' });
        return;
    }
    next();
};