// models.ts
export interface Inmueble {
  id: number;
  numero_inmueble: number;
  padron_municipal: string;
}
export interface Propietario {
  id: number;
  inmueble: Inmueble;
  apellido_paterno: string | null;
  apellido_materno: string | null;
  nombre: string | null;
  porcentaje: number | null;
  tipo_documento: string | null;
  numero_documento: string | null;
}

export interface ClasificacionDerecho {
  id: number;
  inmueble: Inmueble;
  notario_juez: string;
  nombre_notario_juez: string; // Nombre del notario o juez
  fecha_inscripcion: string | null; // puede ser nulo
  matricula_partida: string | null; // puede ser nulo
  numero_testimonio: string | null; // puede ser nulo
  fecha_testimonio: string | null; // puede ser nulo
  superficie: number;
}

export interface PropiedadCatastral {
  id: number;
  inmueble: Inmueble;
  DistritoPropietario: string | null;
  SectorPropietario: string | null;
  ManzanoPropietario: string | null;
  PredioPropietario: string | null;
  SubPredioPropietario: string | null;
  DireccionPropietario: string | null;
  ViasDe: string | null;

  DistritoCatastro: string | null;
  SectorCatastro: string | null;
  ManzanoCatastro: string | null;
  PredioCatastro: string | null;
  SubPredioCatastro: string | null;
  DireccionCatastro: string | null;
  Zona: string | null;
}
export interface ObraGruesa {
  id: number;
  inmueble: Inmueble;
  b1: number | null;
  b2: number | null;
  b3: number | null;
  b4: number | null;
  b5: number | null;
}
export interface IdentificadorInmueble {
  id: number;
  inmueble: Inmueble;
  identificador_catastral_id: string;
  identificador_propietario_id: string;
}
