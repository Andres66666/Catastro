import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
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
  navigateNavegacion() {
    this.router.navigate(['/panelControl']);
  }
}
