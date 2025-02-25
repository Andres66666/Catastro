import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCatastroComponent } from './registrar-catastro.component';

describe('RegistrarCatastroComponent', () => {
  let component: RegistrarCatastroComponent;
  let fixture: ComponentFixture<RegistrarCatastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCatastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCatastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
