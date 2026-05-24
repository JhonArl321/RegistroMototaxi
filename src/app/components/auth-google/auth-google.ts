import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { inject } from '@angular/core';

@Component({
  selector: 'app-auth-google',
  standalone: true,
  imports: [],
  templateUrl: './auth-google.html',
  styleUrls: ['./auth-google.css'],
})

export class AuthGoogleComponent {

  // Inyección de servicios necesarios
  router = inject(Router);
  authService = inject(AuthService);

  // Método para iniciar sesión con Google
  login() {

    this.authService.loginGoogle()
      .then((response) => {

        console.log("Login correcto");
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