import { Prisma, PrismaClient } from '@prisma/client';
import { ICreateLoanDTO } from '../dtos/loan.dto';
import {
  Loan,
  LoanFilters,
  LoanRepository,
  LoanStatus
} from './loan.repository';

// Repositorio Prisma: mapea snake_case de BD a camelCase del contrato.
export class PrismaLoanRepository implements LoanRepository {
  constructor(private readonly database: PrismaClient) {}

  public async create(input: ICreateLoanDTO): Promise<Loan> {
    const loan = await this.database.loans.create({
      data: {
        room_id: input.roomId,
        instructor_id: input.instructorId,
        guarda_id: input.guardaId,
        numero_pc: input.numeroPc
      }
    });
    return this.toDomain(loan);
  }

  public async findAll(filters: LoanFilters = {}): Promise<Loan[]> {
    const loans = await this.database.loans.findMany({
      where: filters.roomId ? { room_id: filters.roomId } : undefined,
      orderBy: { created_at: 'desc' }
    });
    return loans.map((loan) => this.toDomain(loan));
  }

  public async findById(id: number): Promise<Loan | null> {
    const loan = await this.database.loans.findUnique({
      where: { id: BigInt(id) }
    });
    return loan ? this.toDomain(loan) : null;
  }

  public async updateStatus(
    id: number,
    expectedStatus: LoanStatus,
    status: LoanStatus
  ): Promise<Loan | null> {
    // Actualiza solo si el estado actual coincide con expectedStatus.
    const result = await this.database.loans.updateMany({
      where: {
        id: BigInt(id),
        estado: expectedStatus
      },
      data: {
        estado: status,
        accepted_at: status === 'APROBADO_Y_FIRMADO' ? new Date() : null
      }
    });

    return result.count === 0 ? null : this.findById(id);
  }

  private toDomain(loan: {
    id: bigint;
    room_id: string;
    instructor_id: string;
    guarda_id: string;
    numero_pc: number;
    estado: string;
    created_at: Date;
    accepted_at: Date | null;
  }): Loan {
    return {
      id: Number(loan.id),
      roomId: loan.room_id,
      instructorId: loan.instructor_id,
      guardaId: loan.guarda_id,
      numeroPc: loan.numero_pc,
      estado: loan.estado as LoanStatus,
      createdAt: loan.created_at.toISOString(),
      acceptedAt: loan.accepted_at?.toISOString() ?? null
    };
  }
}
