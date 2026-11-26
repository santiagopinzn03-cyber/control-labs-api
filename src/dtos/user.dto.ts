export interface ICreateUserDTO {
    nombre: string;
    correo: string;
    rol: 'estudiante' | 'docente' | 'administrador';
}

export const isCreateUserDTO = (value: unknown): value is ICreateUserDTO => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
    const user = value as Record<string, unknown>;
    return (
        typeof user.nombre === 'string' && user.nombre.trim() !== '' &&
        typeof user.correo === 'string' && user.correo.trim() !== '' &&
        typeof user.rol === 'string' && ['estudiante', 'docente', 'administrador'].includes(user.rol)
    );
};