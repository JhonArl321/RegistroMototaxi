import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

}