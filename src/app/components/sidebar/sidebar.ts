import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';

import {
  Auth,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';


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

githubUsername = '';






  router = inject(Router);
  authService = inject(AuthService);

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

  async cerrarSesion(){
    await this.authService.logout();
    this.router.navigate(['']);

  }




























   // Firebase Auth
  auth = inject(Auth);

  // Usuario autenticado
  user: User | null = null;


  constructor(
    private cd: ChangeDetectorRef
  ) {}







  // ngOnInit() {

   
  //   onAuthStateChanged(this.auth, (usuario) => {

  //     this.user = usuario;

  //     console.log(this.user);

  //     this.cd.detectChanges();


  //   });

  // }


ngOnInit() {

  // Detecta usuario autenticado
  onAuthStateChanged(this.auth, (usuario) => {

    // Verifica si existe usuario
    if(usuario){

      // Guarda usuario autenticado
      this.user = usuario;

      // Obtiene username de GitHub
      this.githubUsername =
        (usuario as any).reloadUserInfo.screenName;

      console.log(this.githubUsername);

      // Actualiza la vista
      this.cd.detectChanges();

    }

  });

}





}