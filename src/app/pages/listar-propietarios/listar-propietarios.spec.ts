import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPropietarios } from './listar-propietarios';

describe('ListarPropietarios', () => {
  let component: ListarPropietarios;
  let fixture: ComponentFixture<ListarPropietarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPropietarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPropietarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
