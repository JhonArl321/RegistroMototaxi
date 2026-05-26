import {
  Component,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { AuthService } from '../../services/auth';
import { MototaxiService } from '../../services/mototaxi';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {

  // Servicios
  authService = inject(AuthService);
  motoService = inject(MototaxiService);

  // Detectar cambios manualmente
  constructor(
    private cd: ChangeDetectorRef
  ) {}

  loading = true;
  // Variables
  totalMototaxis = 0;
  totalConSeguro = 0;
  totalSinSeguro = 0;

 async ngOnInit() {

  this.loading = true;

  try {

    this.totalMototaxis =
      await this.motoService.totalMototaxis();

    this.totalConSeguro =
      await this.motoService.totalConSeguro();

    this.totalSinSeguro =
      await this.motoService.totalSinSeguro();

  }

  catch(error) {

    console.log(error);

  }

  finally {

    this.loading = false;

    this.cd.detectChanges();

  }

}

}