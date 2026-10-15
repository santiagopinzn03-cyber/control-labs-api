import { Request, Response } from 'express';

export class EjemploController {
    public static saludarSena = (req: Request, res: Response): void => {
        // TODO: invocar aquí la operación correspondiente y responder con su resultado.
        res.status(501).json({
            success: false,
            mensaje: 'La operación todavía no está implementada.'
        });
  };
}