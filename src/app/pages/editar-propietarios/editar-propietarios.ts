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

export class EditarPropietarios implements OnInit {

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
  ) { }




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

    const confirmar = confirm(
      '¿Desea actualizar este registro?'
    );

    if (!confirmar) return;

    await this.motoService.actualizarMototaxi(

      this.id,

      {
        nombres: this.nombres,
        apellidos: this.apellidos,
        dpi: this.dpi,
        domicilio: this.domicilio,
        modelo: this.modelo,
        color: this.color,
        seguroVida: this.seguroVida,
        codigo: this.codigo
      }

    );

    alert('Registro actualizado');

  }
}