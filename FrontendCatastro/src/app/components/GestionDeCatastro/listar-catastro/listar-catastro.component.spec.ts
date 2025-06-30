import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCatastroComponent } from './listar-catastro.component';

describe('ListarCatastroComponent', () => {
  let component: ListarCatastroComponent;
  let fixture: ComponentFixture<ListarCatastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCatastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCatastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
