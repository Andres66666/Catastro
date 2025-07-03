import { Component, OnInit } from '@angular/core';
import {
  ClasificacionDerecho,
  Inmueble,
  ObraGruesa,
  PropiedadCatastral,
  Propietario,
} from '../../../models/models';
import { ServiceService } from '../../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-registrar-catastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registrar-catastro.component.html',
  styleUrl: './registrar-catastro.component.css',
})
export class RegistrarCatastroComponent implements OnInit {
  propietariosData: Propietario[] = [];
  numero_inmueble: number = 0;
  padron_municipal: string = '';

  /* seccion 2 */
  clasificacionesData: ClasificacionDerecho[] = [];
  propiedadCatastralData: PropiedadCatastral[] = [];
  @ViewChildren('obraInput') obraInputs!: QueryList<ElementRef>;

  ObraGruesaData: ObraGruesa[] = [];
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.propietariosData = Array.from({ length: 4 }, () => ({
      id: 0,
      apellido_paterno: null,
      apellido_materno: null,
      nombre: null,
      porcentaje: 0,
      tipo_documento: null,
      numero_documento: null,
      inmueble: { id: 0, numero_inmueble: 0, padron_municipal: '' },
    }));
    this.clasificacionesData = Array.from({ length: 2 }, () => ({
      id: 0,
      notario_juez: '',
      nombre_notario_juez: '',
      fecha_inscripcion: null,
      matricula_partida: null,
      numero_testimonio: null,
      fecha_testimonio: null,
      superficie: 0,
      inmueble: { id: 0, numero_inmueble: 0, padron_municipal: '' },
    }));
    this.propiedadCatastralData = Array.from({ length: 2 }, () => ({
      id: 0,
      DistritoPropietario: null,
      SectorPropietario: null,
      ManzanoPropietario: null,
      PredioPropietario: null,
      SubPredioPropietario: null,
      DireccionPropietario: null,
      ViasDe: null,
      DistritoCatastro: null,
      SectorCatastro: null,
      ManzanoCatastro: null,
      PredioCatastro: null,
      SubPredioCatastro: null,
      DireccionCatastro: null,
      Zona: null,
      inmueble: { id: 0, numero_inmueble: 0, padron_municipal: '' },
    }));
  }

  onSubmit(): void {
    const propietariosValidos = this.propietariosData.filter(
      (prop) =>
        prop.apellido_paterno?.trim() ||
        prop.apellido_materno?.trim() ||
        prop.nombre?.trim() ||
        prop.tipo_documento?.trim() ||
        prop.numero_documento?.trim() ||
        prop.porcentaje,
    );

    if (propietariosValidos.length === 0) {
      console.warn('No hay propietarios válidos para enviar.');
      return;
    }

    const inmuebleData: Partial<Inmueble> = {
      numero_inmueble: this.numero_inmueble,
      padron_municipal: this.padron_municipal,
    };

    this.service.registrarInmueble(inmuebleData).subscribe(
      (nuevoInmueble) => {
        console.log('Inmueble creado:', nuevoInmueble);

        // Actualizar el inmueble en los datos para que sea consistente
        this.propietariosData.forEach((p) => (p.inmueble = nuevoInmueble));
        this.clasificacionesData.forEach((c) => (c.inmueble = nuevoInmueble));
        this.propiedadCatastralData.forEach(
          (pc) => (pc.inmueble = nuevoInmueble),
        );
        this.ObraGruesaData.forEach((og) => (og.inmueble = nuevoInmueble));

        // Pasar el id a cada método que lo necesita
        this.registrarPropietarios(nuevoInmueble.id);
        this.registrarClasificaciones(nuevoInmueble.id);
        this.registrarPropiedadCatastral(nuevoInmueble.id);
        this.registrarObraGruesa(nuevoInmueble.id);
      },
      (error) => {
        console.error('Error al registrar inmueble:', error);
      },
    );
  }
  registrarPropietarios(inmuebleId: number): void {
    const propietariosValidos = this.propietariosData.filter(
      (prop) =>
        prop.apellido_paterno?.trim() ||
        prop.apellido_materno?.trim() ||
        prop.nombre?.trim() ||
        prop.tipo_documento?.trim() ||
        prop.numero_documento?.trim() ||
        prop.porcentaje,
    );

    propietariosValidos.forEach((prop) => {
      const propEnviar: any = {
        ...prop,
        inmueble_id: inmuebleId,
      };
      delete propEnviar.inmueble;

      this.service.registrarPropietario(propEnviar).subscribe(
        (resp) => console.log('Propietario registrado', resp),
        (err) => console.error('Error al registrar propietario', err),
      );
    });
  }
  registrarClasificaciones(inmuebleId: number): void {
    const registros = this.clasificacionesData;

    // Copiar campos obligatorios del primero al segundo si no están llenos
    if (registros.length >= 2) {
      const r0 = registros[0];
      const r1 = registros[1];

      if (!r1.notario_juez?.trim()) r1.notario_juez = r0.notario_juez;
      if (!r1.superficie) r1.superficie = r0.superficie;
    }

    const registrosParaEnviar = registros
      .map((r) => {
        if (
          r.notario_juez?.trim() ||
          r.nombre_notario_juez?.trim() ||
          r.superficie
        ) {
          const copia: any = {
            ...r,
            inmueble_id: inmuebleId,
          };
          delete copia.inmueble;

          // Reemplazar strings vacíos por null si es necesario
          if (!copia.nombre_notario_juez?.trim())
            copia.nombre_notario_juez = null;
          if (!copia.matricula_partida?.trim()) copia.matricula_partida = null;
          if (!copia.numero_testimonio?.trim()) copia.numero_testimonio = null;
          if (!copia.fecha_inscripcion) copia.fecha_inscripcion = null;
          if (!copia.fecha_testimonio) copia.fecha_testimonio = null;

          return copia;
        }
        return null;
      })
      .filter((r) => r !== null);

    if (registrosParaEnviar.length === 0) {
      console.warn('No hay clasificaciones válidas para registrar.');
      return;
    }

    this.service.registrarClasificaciones(registrosParaEnviar).subscribe(
      (resp) => {
        console.log('Clasificaciones registradas:', resp);
      },
      (err) => {
        console.error('Error al registrar clasificaciones:', err);
      },
    );
  }

  registrarPropiedadCatastral(inmuebleId: number): void {
    const propiedadesValidas = this.propiedadCatastralData.filter(
      (p) => p.DistritoPropietario?.trim() !== '',
    );

    if (propiedadesValidas.length === 0) {
      console.warn('No hay propiedades catastrales válidas para registrar.');
      return;
    }

    const propiedadParaEnviar: any = {
      ...propiedadesValidas[0],
      inmueble_id: inmuebleId,
    };
    delete propiedadParaEnviar.inmueble;

    this.service.registrarPropiedadCatastral(propiedadParaEnviar).subscribe(
      (resp) => console.log('Propiedades catastrales registradas:', resp),
      (err) =>
        console.error('Error al registrar propiedades catastrales:', err),
    );
  }

  registrarObraGruesa(inmuebleId: number): void {
    const estructurasMap = new Map<string, ObraGruesa>();

    this.obraInputs.forEach((inputRef) => {
      const input = inputRef.nativeElement as HTMLInputElement;
      const estructura = input.dataset['estructura']!;
      const columna = input.dataset['columna']!;
      const valor = input.value ? Number(input.value) : null;

      if (!estructurasMap.has(estructura)) {
        estructurasMap.set(estructura, {
          id: 0,
          b1: null,
          b2: null,
          b3: null,
          b4: null,
          b5: null,
          inmueble: { id: 0, numero_inmueble: 0, padron_municipal: '' },
        });
      }

      const fila = estructurasMap.get(estructura)!;
      (fila as any)[columna] = valor;
    });

    const estructurasFinales = Array.from(estructurasMap.values());

    estructurasFinales.forEach((obra: ObraGruesa) => {
      const obraParaEnviar: any = { ...obra, inmueble_id: inmuebleId };
      delete obraParaEnviar.inmueble;

      this.service.RegistrarObraGruesa(obraParaEnviar).subscribe(
        (resp) => console.log(`ObraGruesa registrada`, resp),
        (err) => console.error(`Error al registrar ObraGruesa`, err),
      );
    });
  }
}
