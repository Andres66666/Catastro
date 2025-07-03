import { Component, OnInit } from '@angular/core';
import {
  ClasificacionDerecho,
  Propietario,
  PropiedadCatastral,
  ObraGruesa,
  IdentificadorInmueble,
} from '../../../models/models';
import { ServiceService } from '../../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-catastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './listar-catastro.component.html',
  styleUrl: './listar-catastro.component.css',
})
export class ListarCatastroComponent implements OnInit {
  propietarios: Propietario[] = [];
  inmueblesUnicos: Propietario[] = [];
  propietariosData: Propietario[] = []; // Usado en los registros
  propiedadCatastralData: PropiedadCatastral[] = []; // Agregar esta línea
  clasificacionesData: ClasificacionDerecho[] = []; // Para clasificaciones
  obrasGruesasData: ObraGruesa[] = []; // Para obras gruesas
  mostrandoDetalles: boolean = false;
  inmuebleSeleccionado: number | null = null;

  filtroId: string = '';
  filtroNombre: string = '';
  inmueblesFiltrados: Propietario[] = [];

  // Agrega estas 2 variables si no las tenías en el componente
  numero_inmueble: number = 0;
  padron_municipal: string = '';

  identificadores: IdentificadorInmueble[] = [];
  identificadoresFiltrados: IdentificadorInmueble[] = [];
  filtroIdentificadorCatastral: string = '';

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.service.getPropietarios().subscribe((data) => {
      this.propietarios = data;

      // Agrupar por inmueble.id
      const gruposMap = new Map<number, Propietario>();
      this.propietarios.forEach((prop) => {
        if (!gruposMap.has(prop.inmueble.id)) {
          gruposMap.set(prop.inmueble.id, prop);
        }
      });
      this.inmueblesUnicos = Array.from(gruposMap.values());
      this.inmueblesFiltrados = this.inmueblesUnicos;
    });
    // Cargar identificadores
    this.service.getIdentificadores().subscribe((data) => {
      this.identificadores = data;
      this.identificadoresFiltrados = data;
    });
  }
  buscarIdentificador() {
    const filtro = this.filtroIdentificadorCatastral.trim().toLowerCase();
    this.identificadoresFiltrados = this.identificadores.filter((ident) =>
      ident.identificador_catastral_id.toLowerCase().includes(filtro),
    );
  }

  limpiarFiltroIdentificador() {
    this.filtroIdentificadorCatastral = '';
    this.identificadoresFiltrados = this.identificadores;
  }

  verDetalles(inmuebleId: number) {
    // Obtener el propietario correspondiente al inmueble seleccionado
    this.propietariosData = this.propietarios
      .filter((p) => p.inmueble.id === inmuebleId)
      .slice(0, 4); // Asegura que solo 4 se llenen

    // Rellenar hasta 4 registros con datos vacíos si hay menos
    while (this.propietariosData.length < 4) {
      this.propietariosData.push({
        id: 0,
        apellido_paterno: '',
        apellido_materno: '',
        nombre: '',
        porcentaje: 0,
        tipo_documento: '',
        numero_documento: '',
        inmueble: { id: inmuebleId, numero_inmueble: 0, padron_municipal: '' },
      });
    }

    // Asignar datos a propiedadCatastralData
    const propietario = this.propietariosData[0];
    const inmueble = propietario.inmueble;

    // Recuperar datos de Propiedad Catastral
    this.service.getPropiedadesCatastrales().subscribe((propiedades) => {
      const propiedadCatastral = propiedades.find(
        (p) => p.inmueble.id === inmuebleId,
      );

      this.propiedadCatastralData[0] = {
        id: propiedadCatastral?.id || 0,
        Zona: propiedadCatastral?.Zona || '',
        DistritoPropietario: propiedadCatastral?.DistritoPropietario || '',
        SectorPropietario: propiedadCatastral?.SectorPropietario || '',
        ManzanoPropietario: propiedadCatastral?.ManzanoPropietario || '',
        PredioPropietario: propiedadCatastral?.PredioPropietario || '',
        SubPredioPropietario: propiedadCatastral?.SubPredioPropietario || '',
        DireccionPropietario: propiedadCatastral?.DireccionPropietario || '',
        ViasDe: propiedadCatastral?.ViasDe || '',
        DistritoCatastro: propiedadCatastral?.DistritoCatastro || '',
        SectorCatastro: propiedadCatastral?.SectorCatastro || '',
        ManzanoCatastro: propiedadCatastral?.ManzanoCatastro || '',
        PredioCatastro: propiedadCatastral?.PredioCatastro || '',
        SubPredioCatastro: propiedadCatastral?.SubPredioCatastro || '',
        DireccionCatastro: propiedadCatastral?.DireccionCatastro || '',
        inmueble: { id: inmuebleId, numero_inmueble: 0, padron_municipal: '' },
      };
    });

    // Recuperar datos de Clasificación de Derecho
    this.service.obtenerClasificaciones().subscribe((clasificaciones) => {
      this.clasificacionesData = clasificaciones.filter(
        (c) => c.inmueble.id === inmuebleId,
      );

      // Rellenar hasta 2 registros con datos vacíos si hay menos
      while (this.clasificacionesData.length < 2) {
        this.clasificacionesData.push({
          id: 0,
          inmueble: {
            id: inmuebleId,
            numero_inmueble: 0,
            padron_municipal: '',
          },
          notario_juez: '',
          nombre_notario_juez: '',
          fecha_inscripcion: null,
          matricula_partida: null,
          numero_testimonio: null,
          fecha_testimonio: null,
          superficie: 0,
        });
      }
    });

    // Recuperar datos de Obra Gruesa
    this.service.getObrasGruesas().subscribe((obras) => {
      this.obrasGruesasData = obras.filter((o) => o.inmueble.id === inmuebleId);

      // Rellenar hasta 5 registros con datos vacíos si hay menos
      while (this.obrasGruesasData.length < 5) {
        this.obrasGruesasData.push({
          id: 0,
          inmueble: {
            id: inmuebleId,
            numero_inmueble: 0,
            padron_municipal: '',
          },
          b1: null,
          b2: null,
          b3: null,
          b4: null,
          b5: null,
        });
      }
    });

    this.inmuebleSeleccionado = inmueble?.id || null;
    this.numero_inmueble = inmueble?.numero_inmueble || 0;
    this.padron_municipal = inmueble?.padron_municipal || '';
    this.mostrandoDetalles = true;
  }

  cerrarDetalles() {
    this.mostrandoDetalles = false;
    this.inmuebleSeleccionado = null;
    this.propietariosData = [];
    this.propiedadCatastralData = [];
    this.clasificacionesData = [];
    this.obrasGruesasData = [];
  }

  buscar() {
    const id = this.filtroId.trim();
    const nombre = this.filtroNombre.trim().toLowerCase();

    this.inmueblesFiltrados = this.inmueblesUnicos.filter((inmueble) => {
      const matchId = id ? inmueble.inmueble.id.toString().includes(id) : true;
      const matchNombre = nombre
        ? `${inmueble.nombre} ${inmueble.apellido_paterno}`
            .toLowerCase()
            .includes(nombre)
        : true;
      return matchId && matchNombre;
    });
  }

  limpiarFiltros() {
    this.filtroId = '';
    this.filtroNombre = '';
    this.inmueblesFiltrados = this.inmueblesUnicos;
  }
  getNombrePropietario(inmuebleId: number): string {
    // Buscar el primer propietario que coincida con el ID de inmueble
    const propietario = this.propietarios.find(
      (p) => p.inmueble.id === inmuebleId,
    );

    if (propietario) {
      return `${propietario.nombre || ''} ${propietario.apellido_paterno || ''} ${propietario.apellido_materno || ''}`.trim();
    }

    return 'Propietario no encontrado';
  }
}
