import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-auth-github',
  standalone: true,
  imports: [],
  templateUrl: './auth-github.html',
  styleUrl: './auth-github.css',
})

export class AuthGithubComponent {

  // Servicios
  router = inject(Router);
  authService = inject(AuthService);

  // Login con GitHub
  async login() {

    try {

      await this.authService.loginGithub();

      // Redirigir al dashboard
      this.router.navigate(['/dashboard']);

    }

    catch {

      // Mostrar error
      Swal.fire({

        icon: 'error',
        title: 'Error al iniciar sesión con GitHub'

      });

    }

  }

}