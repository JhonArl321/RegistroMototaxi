import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MototaxiService } from '../../services/mototaxi';
import { inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';



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
    private cdRef: ChangeDetectorRef,
    private router: Router
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

    const confirmar = await Swal.fire({

      icon: 'question',
      title: 'Actualizar registro',
      text: '¿Desea guardar los cambios?',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4f46e5'

    });

    if (!confirmar.isConfirmed) return;

    try {

      await this.motoService.actualizarMototaxi(

        this.id,

        {
          nombres: this.nombres.trim(),
          apellidos: this.apellidos.trim(),
          dpi: this.dpi.trim(),
          domicilio: this.domicilio.trim(),
          modelo: this.modelo,
          color: this.color.trim(),
          seguroVida: this.seguroVida,
          codigo: this.codigo
        }

      );

      // ACTUALIZAR CACHE
      await this.motoService.actualizarCache();

      // MENSAJE
      await Swal.fire({

        icon: 'success',
        title: 'Registro actualizado',
        text: 'La información fue actualizada correctamente',
        confirmButtonColor: '#4f46e5'

      });

      // REDIRECCIONAR
      this.router.navigate([
        '/listar-propietarios'
      ]);

    }

    catch (error) {

      console.log(error);

      Swal.fire({

        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar'

      });

    }

  }

  cancelar() {
    this.router.navigate([
      '/listar-propietarios'
    ])
  }

}

