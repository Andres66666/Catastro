import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCatastroComponent } from './ver-catastro.component';

describe('VerCatastroComponent', () => {
  let component: VerCatastroComponent;
  let fixture: ComponentFixture<VerCatastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCatastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCatastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
