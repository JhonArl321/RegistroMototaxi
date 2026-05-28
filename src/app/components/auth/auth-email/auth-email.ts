import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-auth-email',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './auth-email.html',
  styleUrl: './auth-email.css',
})

export class AuthEmailComponent {

  // Servicios
  authService = inject(AuthService);
  router = inject(Router);

  // Campos del formulario
  email = '';
  password = '';

  // Iniciar sesión
  async login() {

    try {

      await this.authService.loginUsuario(
        this.email,
        this.password
      );

      // Redirigir al dashboard
      this.router.navigate(['/dashboard']);

    }

    catch {

      // Mostrar error
      Swal.fire({

        icon: 'error',
        title: 'Error al iniciar sesión'

      });

    }

  }

}