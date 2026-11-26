import { Request, Response, NextFunction } from 'express';
import { isCreateUserDTO } from '../dtos/user.dto';

export const validateUserPayload = (req: Request, res: Response, next: NextFunction): void => {
    if (!isCreateUserDTO(req.body)) {
        res.status(400).json({ success: false, error: 'Datos del usuario inválidos o incompletos.' });
        return;
    }
    next();
};