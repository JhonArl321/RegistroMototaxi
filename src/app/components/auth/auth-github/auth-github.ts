import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-auth-github',
  standalone: true,
  imports: [],
  templateUrl: './auth-github.html',
  styleUrl: './auth-github.css',
})

export class AuthGithubComponent {

  // Inyección de servicios necesarios
  router = inject(Router);
  authService = inject(AuthService);

  // Método para iniciar sesión con GitHub
  login() {

    this.authService.loginGithub()
      .then((response) => {

        console.log("Login GitHub correcto");
        console.log(response.user);

        // Redirige al dashboard después del login
        this.router.navigate(['/dashboard']);

      })
      .catch((error) => {

        // Muestra errores en consola
        console.log(error);

      });

  }

}