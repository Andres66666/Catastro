// models.ts
export interface CodigoIdentificador {
  codigo: string; // clave primaria
}
export interface Inmueble {
  codigo: CodigoIdentificador; // corresponde a CodigoIdentificador
  numero_inmueble: number;
  padron_municipal: string;
}

export interface Propietario {
  codigo: CodigoIdentificador; // corresponde a CodigoIdentificador
  numero_documento: string | null;
  apellido_paterno: string | null;
  apellido_materno: string | null;
  nombre: string | null;
  porcentaje: number | null;
  tipo_documento: string | null;
}

export interface ClasificacionDerecho {
  codigo: CodigoIdentificador; // corresponde a CodigoIdentificador
  notario_juez: string;
  nombre_notario_juez: string;
  fecha_inscripcion: string | null;
  matricula_partida: string | null;
  numero_testimonio: string | null;
  fecha_testimonio: string | null;
  superficie: number;
}
export interface CodigoCatastral {
  codigo: CodigoIdentificador; // corresponde a CodigoIdentificador
  Distrito: string | null;
  Sector: string | null;
  Manzano: string | null;
  Predio: string | null;
  SubPredio: string | null;
  Direccion: string | null;
  Zona: string | null;
  ViasDe: string | null;
}
export interface ObraGruesa {
  codigo: CodigoIdentificador; // corresponde a CodigoIdentificador
  b1: number | null;
  b2: number | null;
  b3: number | null;
  b4: number | null;
  b5: number | null;
}
