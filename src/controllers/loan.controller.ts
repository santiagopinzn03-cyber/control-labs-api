import { Request, Response, NextFunction } from 'express';
import { ICreateLoanDTO } from '../dtos/loan.dto';
import { prisma } from '../db/prisma';
import { PrismaLoanRepository } from '../repositories/prisma-loan.repository';
import { LoanService } from '../services/loan.service';

const loanService = new LoanService(new PrismaLoanRepository(prisma));

export class LoanController {
  public static createLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const input = req.body as ICreateLoanDTO;
      const loan = await loanService.createLoan(input);
      res.status(201).json({ success: true, data: loan });
    } catch (error) {
      next(error);
    }
  };

  public static getLoansByFilter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const roomId =
        typeof req.query.roomId === 'string' ? req.query.roomId : undefined;
      const loans = await loanService.getLoans({ roomId });
      res.status(200).json({ success: true, data: loans });
    } catch (error) {
      next(error);
    }
  };

  public static getLoanById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const loan = await loanService.getLoanById(id);
      res.status(200).json({ success: true, data: loan });
    } catch (error) {
      next(error);
    }
  };

  public static acceptLoanInventory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const loan = await loanService.acceptLoan(id);
      res.status(200).json({ success: true, data: loan });
    } catch (error) {
      next(error);
    }
  };
}
