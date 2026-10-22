import { Request, Response } from 'express';

export class DashboardController {
    public static getDashboardSummary = (req: Request, res: Response): void => {
        res.status(501).json({
            success: false,
            message: 'El resumen del dashboard todavía no está implementado.'
        });
    };
}