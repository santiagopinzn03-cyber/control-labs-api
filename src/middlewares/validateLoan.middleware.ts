import { Request, Response, NextFunction } from 'express';
import { ICreateLoanDTO } from '../dtos/loan.dto';

const isCreateLoanDTO = (value: unknown): value is ICreateLoanDTO => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const loan = value as Record<string, unknown>;
  return (
    typeof loan.roomId === 'string' &&
    loan.roomId.trim() !== '' &&
    typeof loan.instructorId === 'string' &&
    loan.instructorId.trim() !== '' &&
    typeof loan.guardaId === 'string' &&
    loan.guardaId.trim() !== '' &&
    typeof loan.numeroPc === 'number' &&
    Number.isInteger(loan.numeroPc)
  );
};

export const validateLoanPayload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body: unknown = req.body;

  if (!isCreateLoanDTO(body)) {
    res.status(400).json({
      success: false,
      error: 'Datos del préstamo inválidos.'
    });
    return;
  }

  next();
};
