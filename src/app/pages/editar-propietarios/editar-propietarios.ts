import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MototaxiService } from '../../services/mototaxi';
import { inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-editar-propietarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-propietarios.html',
  styleUrl: './editar-propietarios.css',
})

export class EditarPropietarios implements OnInit{

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
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  // async ngOnInit() {

  //   this.id =
  //     this.route.snapshot.queryParamMap.get('id')!;

  //   const data =
  //     await this.motoService.obtenerPorId(this.id);

  //   this.nombres = data.nombres;
  //   this.apellidos = data.apellidos;
  //   this.dpi = data.dpi;
  //   this.domicilio = data.domicilio;
  //   this.modelo = data.modelo;
  //   this.color = data.color;
  //   this.seguroVida = data.seguroVida;
  //   this.codigo = data.codigo;

  // }



async ngOnInit() {

  console.log('SI ENTRA');

  this.id =
    this.route.snapshot.queryParamMap.get('id')!;

  console.log(this.id);

  const data =
    await this.motoService.obtenerPorId(this.id);

  console.log(data);

  this.nombres = data.nombres;
  this.apellidos = data.apellidos;
  this.dpi = data.dpi;
  this.domicilio = data.domicilio;
  this.modelo = data.modelo;
  this.color = data.color;
  this.seguroVida = data.seguroVida;
  this.codigo = data.codigo;

  this.cdRef.detectChanges();

}

  async actualizarMototaxi() {

  console.log('Actualizando');

}
}