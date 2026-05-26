import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MototaxiService } from '../../services/mototaxi';
import { Router } from '@angular/router';

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
        await this.motoService.obtenerMototaxis();

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

    const confirmar = confirm(
      '¿Desea eliminar este registro?'
    );

    if (!confirmar) return;

    await this.motoService.eliminarMototaxi(id);

    this.mototaxis =
      await this.motoService.obtenerMototaxis();

    // ACTUALIZAR VISTA
    this.cd.detectChanges();

  }

  async editar(moto: any) {

    const confirmar = confirm(
      '¿Desea editar este registro?'
    );

    if (!confirmar) return;

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