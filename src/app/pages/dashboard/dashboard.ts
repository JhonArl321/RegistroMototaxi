import { Component, inject } from '@angular/core';
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

  // inyecta el servicio de autenticion
  authService = inject(AuthService);
  //inyectar el servicio de mototaxi
  motoService = inject(MototaxiService);


  totalMototaxis = 0;
  totalConSeguro = 0;
  totalSinSeguro = 0;

  async ngOnInit() {

    this.totalMototaxis = await this.motoService.totalMototaxis();
    this.totalConSeguro = await this.motoService.totalConSeguro();
    this.totalSinSeguro = await this.motoService.totalSinSeguro();

  }

}