import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MototaxiService } from '../../services/mototaxi';
import { UsuarioMototaxi } from '../../models/usuario-mototaxi';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-propietarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-propietarios.html',
})

export class ListarPropietarios implements OnInit {

  // Datos mostrados en la tabla
  mototaxis: UsuarioMototaxi[] = [];

  // Controla el spinner de carga
  loading = true;

  // Servicios utilizados por el componente
  motoService = inject(MototaxiService);
  router = inject(Router);

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  async ngOnInit() {

    await this.cargarMototaxis();

  }

  // Centralizar la carga facilita reutilizarla
  // si más adelante se necesita refrescar la tabla
  private async cargarMototaxis() {

    this.loading = true;

    try {

      this.mototaxis =
        await this.motoService.actualizarCache();

    }

    catch (error) {

      console.error(error);

    }

    finally {

      this.loading = false;

      // Forzar la actualización visual
      // después de finalizar la carga
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

    // Evita eliminar registros por accidente
    if (!confirmar.isConfirmed) return;

    try {

      await this.motoService.eliminarMototaxi(id);

      // Actualizar la lista sin recargar la página
      this.mototaxis = this.mototaxis.filter(

        moto => moto.id !== id

      );

      // Mantener sincronizado el cache local
      await this.motoService.actualizarCache();

      this.cd.detectChanges();

      Swal.fire({

        icon: 'success',
        title: 'Registro eliminado',
        text: 'El propietario fue eliminado correctamente',

        confirmButtonColor: '#4f46e5'

      });

    }

    catch (error) {

      console.error(error);

      Swal.fire({

        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el registro'

      });

    }

  }

  async editar(
    moto: UsuarioMototaxi
  ) {

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