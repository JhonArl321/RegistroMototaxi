import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-auth-google',
  standalone: true,
  imports: [],
  templateUrl: './auth-google.html',
  styleUrl: './auth-google.css',
})

export class AuthGoogleComponent {

  // Servicios
  router = inject(Router);
  authService = inject(AuthService);

  // Login con Google
  async login() {

    try {

      await this.authService.loginGoogle();

      // Redirigir al dashboard
      this.router.navigate(['/dashboard']);

    }

    catch {

      // Mostrar error
      Swal.fire({

        icon: 'error',
        title: 'Error al iniciar sesión con Google'

      });

    }

  }

}