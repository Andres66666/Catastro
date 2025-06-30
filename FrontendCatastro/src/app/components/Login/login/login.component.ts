import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    public router: Router,
    private service: ServiceService,
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isFormValid(): boolean {
    return this.correo.trim() !== '' && this.password.trim() !== '';
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.mensajeError = 'Por favor, complete todos los campos antes de continuar.';
      return;
    }
    this.mensajeError = '';
    this.mensajeExito = '';
    this.iniciarSesion();
  }

  iniciarSesion(): void {
    this.isLoading = true;

    this.service.login(this.correo, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        
        const usuario = {
          id: response.usuario_id,
          nombre: response.nombre_usuario,
          apellido: response.apellido,
          imagen_url: response.imagen_url,
          roles: response.roles,
          permisos: response.permisos,
        };
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        this.mensajeExito = '¡Inicio de sesión exitoso!';
        this.router.navigate(['/panelControl']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.mensajeError = 'Correo electrónico o contraseña incorrectos. Por favor, inténtelo nuevamente.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/index']);
  }

  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['/panelControl']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
