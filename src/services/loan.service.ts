import { ICreateLoanDTO } from '../dtos/loan.dto';
import { BusinessRuleError, NotFoundError } from '../errors/domain.errors';
import { Loan, LoanFilters, LoanRepository } from '../repositories/loan.repository';

export class LoanService {
  constructor(private readonly loanRepository: LoanRepository) {}

  // Coordina el caso de uso: la forma la valida el middleware y la integridad PostgreSQL.
  public async createLoan(input: ICreateLoanDTO): Promise<Loan> {
    return this.loanRepository.create(input);
  }

  public async getLoans(filters: LoanFilters = {}): Promise<Loan[]> {
    return this.loanRepository.findAll(filters);
  }

  public async getLoanById(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findById(id);
    if (!loan) {
      throw new NotFoundError(`Préstamo ${id} no encontrado.`);
    }
    return loan;
  }

  public async acceptLoan(id: number): Promise<Loan> {
    const updated = await this.loanRepository.updateStatus(
      id,
      'PENDIENTE_APROBACION',
      'APROBADO_Y_FIRMADO'
    );

    if (!updated) {
      const exists = await this.loanRepository.findById(id);
      if (!exists) {
        throw new NotFoundError(`Préstamo ${id} no encontrado.`);
      }
      throw new BusinessRuleError(
        'Transición de estado inválida: solo se permite PENDIENTE_APROBACION -> APROBADO_Y_FIRMADO.'
      );
    }

    return updated;
  }
}
