export interface ICreateEquipmentDTO {
    nombre: string;
    serial: string;
    estado: string;
    environmentId: string;
}

export const isCreateEquipmentDTO = (value: unknown): value is ICreateEquipmentDTO => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
    const eq = value as Record<string, unknown>;
    return (
        typeof eq.nombre === 'string' && eq.nombre.trim() !== '' &&
        typeof eq.serial === 'string' && eq.serial.trim() !== '' &&
        typeof eq.estado === 'string' && eq.estado.trim() !== '' &&
        typeof eq.environmentId === 'string' && eq.environmentId.trim() !== ''
    );
};