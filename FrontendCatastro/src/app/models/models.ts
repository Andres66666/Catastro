// models.ts
export interface Propietario {
  apellido_paterno: string;
  apellido_materno: string;
  nombre: string;
  porcentaje?: number; // Opcional
  tipo_documento: string; // CI, NIT, etc.
  numero_documento: string;
  numero_inmueble: number;
  padron_municipal?: string; // Opcional
  // Agrega más campos según tu formulario
}
