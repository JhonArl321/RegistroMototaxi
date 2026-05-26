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

  // Servicios
  router = inject(Router);
  authService = inject(AuthService);

  // Spinner usuario
  loadingUser = true;

  // Sidebar
  @Input() sidebarOpen = false;

  // Evento cerrar
  @Output() close = new EventEmitter<void>();

  constructor(
    private cd: ChangeDetectorRef
  ) {

    // Esperar restauración auth
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