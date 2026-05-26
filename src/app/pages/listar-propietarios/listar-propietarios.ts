import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
  
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MototaxiService } from '../../services/mototaxi';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-propietarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-propietarios.html',
})

export class ListarPropietarios implements OnInit {

  // Datos
  mototaxis: any[] = [];

  // Spinner
  loading = true;

  // Servicio
  motoService = inject(MototaxiService);
  router = inject(Router)

  // DetectChanges
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  async ngOnInit() {

    this.loading = true;

    try {

      this.mototaxis =
       this.mototaxis =
  await this.motoService.actualizarCache();

      console.log(this.mototaxis);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      this.loading = false;

      // IMPORTANTE
      this.cd.detectChanges();

    }

  }












 async eliminar(id: string) {

  const confirmar = await Swal.fire({

    icon: 'warning',
    title: 'Eliminar registro',
    text: '¿Desea eliminar este registro?',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626'

  });

  if (!confirmar.isConfirmed) return;

  try {

    await this.motoService.eliminarMototaxi(id);

    // ELIMINAR VISUALMENTE
    this.mototaxis = this.mototaxis.filter(

      moto => moto.id !== id

    );

    // ACTUALIZAR CACHE
    await this.motoService.actualizarCache();

    this.cd.detectChanges();

    // MENSAJE
    Swal.fire({

      icon: 'success',
      title: 'Registro eliminado',
      text: 'El propietario fue eliminado correctamente',
      confirmButtonColor: '#4f46e5'

    });

  }

  catch(error) {

    console.log(error);

    Swal.fire({

      icon: 'error',
      title: 'Error',
      text: 'No se pudo eliminar el registro'

    });

  }

}






























  async editar(moto: any) {

    this.router.navigate(
      ['editar-propietario'],
      {
        queryParams: {
          id: moto.id
        }
      }
    );

  }

}