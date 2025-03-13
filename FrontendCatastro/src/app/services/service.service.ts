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
  /* esto para manejo de errores en Windowes  */
  private windowWidthSubject = new BehaviorSubject<number>(0);
  windowWidth$ = this.windowWidthSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') {
      this.windowWidthSubject.next(window.innerWidth);
      window.addEventListener('resize', () => {
        this.windowWidthSubject.next(window.innerWidth);
      });
    }
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
