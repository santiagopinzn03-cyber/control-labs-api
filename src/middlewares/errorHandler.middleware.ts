import { Request, Response, NextFunction } from 'express';
import { BusinessRuleError, NotFoundError } from '../errors/domain.errors';

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (
    typeof err === 'object' &&
    err !== null &&
    'type' in err &&
    (err as { type?: string }).type === 'entity.parse.failed'
  ) {
    res.status(400).json({
      success: false,
      error: 'El cuerpo JSON está malformado.'
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({ success: false, error: err.message });
    return;
  }

  if (err instanceof BusinessRuleError) {
    res.status(422).json({ success: false, error: err.message });
    return;
  }

  console.error(err);

  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor en ControlLabs',
    timestamp: new Date().toISOString()
  });
};
