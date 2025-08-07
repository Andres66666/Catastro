import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inmueble, Propietario, CodigoIdentificador } from '../models/models';

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
  // Codigo Identificador Services
  getCodigos(): Observable<CodigoIdentificador[]> {
    return this.http.get<CodigoIdentificador[]>(`${this.apiUrl}codigo/`);
  }
  getCodigoById(id: string): Observable<CodigoIdentificador> {
    return this.http.get<CodigoIdentificador>(`${this.apiUrl}codigo/${id}/`);
  }
  registrarCodigo(
    codigo: CodigoIdentificador,
  ): Observable<CodigoIdentificador> {
    return this.http.post<CodigoIdentificador>(`${this.apiUrl}codigo/`, codigo);
  }
  // Inmueble Services
  registrarInmueble(inmueble: Partial<Inmueble>): Observable<Inmueble> {
    return this.http.post<Inmueble>(`${this.apiUrl}inmueble/`, inmueble);
  }
  getInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}inmueble/`);
  }
  getInmuebleById(id: number): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${this.apiUrl}inmueble/${id}/`);
  }
  actualizarInmueble(
    id: number,
    inmueble: Partial<Inmueble>,
  ): Observable<Inmueble> {
    return this.http.patch<Inmueble>(`${this.apiUrl}inmueble/${id}/`, inmueble);
  }
  // Propietario Services
  getPropietarios(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(`${this.apiUrl}propietario/`);
  }
  getUserById(id: number): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.apiUrl}propietario/${id}/`);
  }
  registrarPropietario(propietario: Propietario): Observable<Propietario> {
    return this.http.post<Propietario>(
      `${this.apiUrl}propietario/`,
      propietario,
    );
  }
}
