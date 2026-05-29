import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  ChangeDetectorRef
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

  // Servicios utilizados por el componente
  router = inject(Router);
  authService = inject(AuthService);

  // Controla la carga de información del usuario
  loadingUser = true;

  // Estado del sidebar
  @Input() sidebarOpen = false;

  // Notifica al componente padre que debe cerrarse
  @Output() close =
    new EventEmitter<void>();

  constructor(
    private cd: ChangeDetectorRef
  ) {

    // Se espera brevemente para permitir
    // que Firebase restaure la sesión
    setTimeout(() => {

      this.loadingUser = false;

      this.cd.detectChanges();

    }, 1000);

  }

  closeSidebar() {

    this.close.emit();

  }

  async cerrarSesion() {

    await this.authService.logout();

    this.router.navigate(['']);

  }

}