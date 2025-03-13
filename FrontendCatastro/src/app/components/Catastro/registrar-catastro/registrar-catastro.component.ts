import { Component } from '@angular/core';
import { Propietario } from '../../../models/models';
import { ServiceService } from '../../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-catastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registrar-catastro.component.html',
  styleUrl: './registrar-catastro.component.css',
})
export class RegistrarCatastroComponent {
  propietarioData: Propietario = {
    apellido_paterno: '',
    apellido_materno: '',
    nombre: '',
    porcentaje: undefined, // Opcional
    tipo_documento: '',
    numero_documento: '',
    numero_inmueble: 0,
    padron_municipal: '', // Opcional
    // Agrega más campos según tu formulario
  };
  constructor(private propietarioService: ServiceService) {}
  onSubmit() {
    this.propietarioService
      .registrarPropietario(this.propietarioData)
      .subscribe(
        (response) => {
          console.log('Propietario registrado:', response);
          // Maneja la respuesta, como mostrar un mensaje de éxito
          this.resetForm();
          // Reinicia el formulario
        },
        (error) => {
          console.error('Error al registrar propietario:', error);
          // Maneja el error, como mostrar un mensaje de error
        }
      );
  }
  // Método para reiniciar el formulario
  resetForm() {
    this.propietarioData = {
      apellido_paterno: '',
      apellido_materno: '',
      nombre: '',
      porcentaje: undefined,
      tipo_documento: '',
      numero_documento: '',
      numero_inmueble: 0,
      padron_municipal: '',
    };
  }
}
