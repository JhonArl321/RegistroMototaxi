import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPropietarios } from './registrar-propietarios';

describe('RegistrarPropietarios', () => {
  let component: RegistrarPropietarios;
  let fixture: ComponentFixture<RegistrarPropietarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPropietarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPropietarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
