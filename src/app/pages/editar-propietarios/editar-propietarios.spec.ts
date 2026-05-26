import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPropietarios } from './editar-propietarios';

describe('EditarPropietarios', () => {
  let component: EditarPropietarios;
  let fixture: ComponentFixture<EditarPropietarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPropietarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPropietarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
