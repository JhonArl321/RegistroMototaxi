import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

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

  router = inject(Router);

  // =========================================================
  // RECIBE EL ESTADO DEL SIDEBAR DESDE EL LAYOUT
  // =========================================================
  @Input() sidebarOpen = false;

  // =========================================================
  // ENVÍA EVENTO PARA CERRAR EL SIDEBAR
  // =========================================================
  @Output() close = new EventEmitter<void>();

  closeSidebar() {
    this.close.emit();
  }

  cerrarSesion(){
    this.router.navigate(['']);

  }

}