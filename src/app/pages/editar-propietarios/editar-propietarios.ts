import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MototaxiService } from '../../services/mototaxi';
import { inject } from '@angular/core';


@Component({
  selector: 'app-editar-propietarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-propietarios.html',
  styleUrl: './editar-propietarios.css',
})

export class EditarPropietarios {

  nombres = '';
  apellidos = '';
  dpi = '';
  domicilio = '';
  modelo = '';
  color = '';
  seguroVida = '';
  codigo = '';

  id = '';

  motoService = inject(MototaxiService);

  constructor(
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {

    this.id =
      this.route.snapshot.queryParamMap.get('id')!;

    const data =
      await this.motoService.obtenerPorId(this.id);

    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.dpi = data.dpi;
    this.domicilio = data.domicilio;
    this.modelo = data.modelo;
    this.color = data.color;
    this.seguroVida = data.seguroVida;
    this.codigo = data.codigo;

  }


  async actualizarMototaxi() {

  console.log('Actualizando');

}
}