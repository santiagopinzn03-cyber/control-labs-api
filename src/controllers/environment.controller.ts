import { Request, Response } from 'express';

export class EnvironmentController {
    public static getAllEnvironments = (req: Request, res: Response): void => {
        res.status(501).json({
            success: false,
            message: 'El listado de ambientes todavía no está implementado.'
        });
    };

    public static createEnvironment = (req: Request, res: Response): void => {
        res.status(501).json({
            success: false,
            message: 'El registro de ambiente todavía no está implementado.'
        });
    };

    public static updateEnvironmentPartial = (req: Request, res: Response): void => {
        const { id } = req.params;
        res.status(501).json({
            success: false,
            message: `La actualización parcial del ambiente ${id} todavía no está implementada.`
        });
    };
}