import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Propietario } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  /* servicio de login */
  login(correo: string, password: string): Observable<any> {
  const loginData = { correo: correo, password: password };
    return this.http.post<any>(`${this.apiUrl}login/`, loginData);
  }
  
  getPropietarios(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(`${this.apiUrl}propietarios/`);
  }
  getUserById(id: number): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.apiUrl}propietarios/${id}/`);
  }
  registrarPropietario(propietarios: Propietario): Observable<Propietario> {
    return this.http.post<Propietario>(
      `${this.apiUrl}propietarios/`,
      propietarios
    );
  }
  actualizarPropietarios(
    id: number,
    propietarios: Propietario
  ): Observable<Propietario> {
    return this.http.put<Propietario>(
      `${this.apiUrl}propietarios/${id}/`,
      propietarios
    );
  }
}
