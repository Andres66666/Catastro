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
export class IndexComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    // Aquí puedes agregar lógica adicional después de que la vista se haya inicializado
    const h1 = this.el.nativeElement.querySelector('h1');

    if (h1) {
      this.renderer.listen(h1, 'input', () => {
        this.renderer.setAttribute(h1, 'data-heading', h1.innerText);
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
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
