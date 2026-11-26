import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
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

  // Mapeo de errores conocidos de Prisma a respuestas HTTP.
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      res.status(404).json({ success: false, error: 'Registro no encontrado.' });
      return;
    }
    if (err.code === 'P2003') {
      res.status(409).json({ success: false, error: 'Violación de llave foránea.' });
      return;
    }
    if (err.code === 'P2004') {
      res
        .status(400)
        .json({ success: false, error: 'Violación de restricción de la base de datos.' });
      return;
    }
  }

  // CHECK puede llegar como error desconocido (sin code); se detecta por texto.
  const message = err instanceof Error ? err.message : String(err);
  if (message.toLowerCase().includes('violates check constraint') || message.toLowerCase().includes('restricción «check»')) {
    res
      .status(400)
      .json({ success: false, error: 'Violación de restricción de la base de datos.' });
    return;
  }

  const e = err as any;
  console.error({
    name: e?.name,
    code: e?.code,
    meta: e?.meta,
    message: e?.message,
    error: err
  });
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor en ControlLabs',
    timestamp: new Date().toISOString()
  });
};
