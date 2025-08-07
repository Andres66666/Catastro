import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodigoIdentificador, Propietario } from '../../../models/models';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-r-j-1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './r-j-1.component.html',
  styleUrl: './r-j-1.component.css',
})
export class RJ1Component {
  nuevoCodigo: string = '';
  codigoRegistrado: CodigoIdentificador | null = null;
  mensaje: string = '';
  numeroInmueble: number = 0;
  padronMunicipal: string = '';
  propietarios: Propietario[] = [];

  constructor(private service: ServiceService) {}

  registrarTodo() {
    if (!this.nuevoCodigo.trim()) {
      this.mensaje = 'Por favor ingrese un código válido.';
      return;
    }
    const codigoObj: CodigoIdentificador = { codigo: this.nuevoCodigo };
    this.service.registrarCodigo(codigoObj).subscribe({
      next: (codigo) => {
        this.codigoRegistrado = codigo;
        console.log('Código registrado:', codigo);
        const inmuebleData = {
          codigo: { codigo: codigo.codigo },
          numero_inmueble: this.numeroInmueble,
          padron_municipal: this.padronMunicipal,
        };
        this.service.registrarInmueble(inmuebleData).subscribe({
          next: (inmueble) => {
            console.log('Inmueble registrado:', inmueble);
            const propietariosConCodigo = this.propietarios.map((prop) => ({
              ...prop,
              codigo: { codigo: codigo.codigo },
            }));
            const requests = propietariosConCodigo.map((prop) =>
              this.service.registrarPropietario(prop),
            );
            Promise.all(requests.map((req) => req.toPromise()))
              .then((res) => {
                console.log('Propietarios registrados:', res);
                this.mensaje = 'Todo registrado exitosamente.';
              })
              .catch((error) => {
                console.error('Error al registrar propietarios:', error);
                this.mensaje = 'Error al registrar propietarios.';
              });
          },
          error: (error) => {
            console.error('Error al registrar inmueble:', error);
            this.mensaje = 'Error al registrar inmueble.';
          },
        });
      },
      error: (error) => {
        console.error('Error al registrar el código:', error);
        this.mensaje = 'Error al registrar el código.';
      },
    });
  }

  agregarPropietario() {
    this.propietarios.push({
      codigo: { codigo: '' },
      numero_documento: null,
      apellido_paterno: null,
      apellido_materno: null,
      nombre: null,
      porcentaje: null,
      tipo_documento: null,
    });
  }

  eliminarPropietario(index: number) {
    this.propietarios.splice(index, 1);
  }
}
