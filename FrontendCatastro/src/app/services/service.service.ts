import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ClasificacionDerecho,
  IdentificadorInmueble,
  Inmueble,
  ObraGruesa,
  PropiedadCatastral,
  Propietario,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}

  /* Servicio de login */
  login(correo: string, password: string): Observable<any> {
    const loginData = { correo: correo, password: password };
    return this.http.post<any>(`${this.apiUrl}login/`, loginData);
  }

  /* Propietarios */
  getPropietarios(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(`${this.apiUrl}propietarios/`);
  }

  getUserById(id: number): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.apiUrl}propietarios/${id}/`);
  }

  registrarPropietario(propietario: Propietario): Observable<Propietario> {
    // Aquí propietario ya debe tener inmueble_id agregado antes de llamar este método
    return this.http.post<Propietario>(
      `${this.apiUrl}propietarios/`,
      propietario,
    );
  }

  /* Inmuebles */
  registrarInmueble(inmueble: Partial<Inmueble>): Observable<Inmueble> {
    return this.http.post<Inmueble>(`${this.apiUrl}inmuebles/`, inmueble);
  }

  getInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}inmuebles/`);
  }

  getInmuebleById(id: number): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${this.apiUrl}inmuebles/${id}/`);
  }

  actualizarInmueble(
    id: number,
    inmueble: Partial<Inmueble>,
  ): Observable<Inmueble> {
    return this.http.patch<Inmueble>(
      `${this.apiUrl}inmuebles/${id}/`,
      inmueble,
    );
  }

  /* Clasificación de Derecho */
  obtenerClasificaciones(): Observable<ClasificacionDerecho[]> {
    return this.http.get<ClasificacionDerecho[]>(
      `${this.apiUrl}clasificaciones/`,
    );
  }

  obtenerClasificacionPorId(id: number): Observable<ClasificacionDerecho> {
    return this.http.get<ClasificacionDerecho>(
      `${this.apiUrl}clasificaciones/${id}/`,
    );
  }

  registrarClasificaciones(
    clasificaciones: ClasificacionDerecho[],
  ): Observable<ClasificacionDerecho[]> {
    return this.http.post<ClasificacionDerecho[]>(
      `${this.apiUrl}clasificaciones/`,
      clasificaciones,
    );
  }

  registrarPropiedadCatastral(
    propiedadcatastral: PropiedadCatastral, // debe incluir inmueble_id
  ): Observable<PropiedadCatastral> {
    return this.http.post<PropiedadCatastral>(
      `${this.apiUrl}propiedadCatastral/`,
      propiedadcatastral,
    );
  }

  // Nuevos métodos para PropiedadCatastral
  getPropiedadesCatastrales(): Observable<PropiedadCatastral[]> {
    return this.http.get<PropiedadCatastral[]>(
      `${this.apiUrl}propiedadCatastral/`,
    );
  }

  getPropiedadCatastralById(id: number): Observable<PropiedadCatastral> {
    return this.http.get<PropiedadCatastral>(
      `${this.apiUrl}propiedadCatastral/${id}/`,
    );
  }

  // Nuevos métodos para ObraGruesa
  getObrasGruesas(): Observable<ObraGruesa[]> {
    return this.http.get<ObraGruesa[]>(`${this.apiUrl}obrasGruesas/`);
  }

  getObraGruesaById(id: number): Observable<ObraGruesa> {
    return this.http.get<ObraGruesa>(`${this.apiUrl}obrasGruesas/${id}/`);
  }

  RegistrarObraGruesa(obraGruesa: ObraGruesa): Observable<ObraGruesa> {
    return this.http.post<ObraGruesa>(
      `${this.apiUrl}obrasGruesas/`,
      obraGruesa,
    );
  }

  /* Identificadores */
  getIdentificadores(): Observable<IdentificadorInmueble[]> {
    return this.http.get<IdentificadorInmueble[]>(
      `${this.apiUrl}identificadores/`,
    );
  }

  getIdentificadorById(id: number): Observable<IdentificadorInmueble> {
    return this.http.get<IdentificadorInmueble>(
      `${this.apiUrl}identificadores/${id}/`,
    );
  }
}
