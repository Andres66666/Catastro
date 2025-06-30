import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent  {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToPanel() {
    this.router.navigate(['/panelControl']);
  }

  navigateToInicio() {
    this.router.navigate(['/inicio']);
  }

  navigateToNoticias() {
    this.router.navigate(['/noticias']);
  }

  navigateToTurismo() {
    this.router.navigate(['/turismo']);
  }

  navigateToContacto() {
    this.router.navigate(['/contacto']);
  }
}
