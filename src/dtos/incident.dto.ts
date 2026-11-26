export interface ICreateIncidentDTO {
    titulo: string;
    descripcion: string;
    equipmentId: string;
    prioridad: 'baja' | 'media' | 'alta';
}

export const isCreateIncidentDTO = (value: unknown): value is ICreateIncidentDTO => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
    const inc = value as Record<string, unknown>;
    return (
        typeof inc.titulo === 'string' && inc.titulo.trim() !== '' &&
        typeof inc.descripcion === 'string' && inc.descripcion.trim() !== '' &&
        typeof inc.equipmentId === 'string' && inc.equipmentId.trim() !== '' &&
        typeof inc.prioridad === 'string' && ['baja', 'media', 'alta'].includes(inc.prioridad)
    );
};