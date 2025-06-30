import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCatastroComponent } from './actualizar-catastro.component';

describe('ActualizarCatastroComponent', () => {
  let component: ActualizarCatastroComponent;
  let fixture: ComponentFixture<ActualizarCatastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarCatastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCatastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
