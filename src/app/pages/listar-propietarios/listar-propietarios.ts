import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MototaxiService } from '../../services/mototaxi';

@Component({
  selector: 'app-listar-propietarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-propietarios.html',
})

export class ListarPropietarios implements OnInit {

  // Arreglo
  mototaxis: any[] = [];

  // Spinner
  loading = false;

  // Service
  motoService = inject(MototaxiService);

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    this.loading = true;

    try {

      this.mototaxis =
        await this.motoService.obtenerMototaxis();

      console.log(this.mototaxis);

      // IMPORTANTE
      this.cd.detectChanges();

    } catch (error) {

      console.log(error);

    } finally {

      this.loading = false;

      // IMPORTANTE
      this.cd.detectChanges();

    }

  }

}