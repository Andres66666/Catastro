import { Component, OnInit } from '@angular/core';
import {
  ClasificacionDerecho,
  Propietario,
  /*  PropiedadCatastral, */
  ObraGruesa,
  /*   IdentificadorInmueble, */
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
export class ListarCatastroComponent {}
