import { Request, Response } from 'express';

export class IncidentController {
    public static createIncident = (req: Request, res: Response): void => {
        res.status(501).json({
            success: false,
            message: 'El registro de novedad todavía no está implementado.'
        });
    };

    public static getAllIncidents = (req: Request, res: Response): void => {
        res.status(501).json({
            success: false,
            message: 'El historial de incidencias todavía no está implementado.'
        });
    };

    public static updateIncidentPartial = (req: Request, res: Response): void => {
        const { id } = req.params;
        res.status(501).json({
            success: false,
            message: `La actualización parcial de la novedad ${id} todavía no está implementada.`
        });
    };
}