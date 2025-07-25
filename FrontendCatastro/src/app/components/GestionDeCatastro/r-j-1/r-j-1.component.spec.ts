import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RJ1Component } from './r-j-1.component';

describe('RJ1Component', () => {
  let component: RJ1Component;
  let fixture: ComponentFixture<RJ1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RJ1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RJ1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
