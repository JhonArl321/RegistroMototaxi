import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject

} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './sidebar.html',
})

export class SidebarComponent {

  // inyeccion de servicios necesarios
  router = inject(Router);
  authService = inject(AuthService);

  // Estado sidebar
  @Input() sidebarOpen = false;

  // Evento cerrar sidebar
  @Output() close = new EventEmitter<void>();


  closeSidebar() {
    this.close.emit();
  }

  async cerrarSesion(){

    await this.authService.logout();

    this.router.navigate(['']);

  }

}