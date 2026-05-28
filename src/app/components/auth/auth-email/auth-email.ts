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

  // Campos formulario
  email = '';
  password = '';

  // LOGIN
  async login() {

    // Regex email
    const emailValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Campos vacíos
    if (
      !this.email ||
      !this.password
    ) {

      Swal.fire({

        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Completa todos los campos',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

      return;

    }

    // Validar email
    if (!emailValido.test(this.email)) {

      Swal.fire({

        icon: 'warning',
        title: 'Correo inválido',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

      return;

    }

    // SOLO GMAIL
    if (
      !this.email
        .toLowerCase()
        .endsWith('@gmail.com')
    ) {

      Swal.fire({

        icon: 'warning',
        title: 'Solo se permiten correos Gmail',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

      return;

    }

    // Validar contraseña
    if (this.password.length < 6) {

      Swal.fire({

        icon: 'warning',
        title: 'Contraseña inválida',
        text: 'Mínimo 6 caracteres',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

      return;

    }

    try {

      // Login Firebase
      await this.authService.loginUsuario(
        this.email,
        this.password
      );

      // Redireccionar
      this.router.navigate(['/dashboard']);

    }

    catch {

      Swal.fire({

        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Credenciales incorrectas',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

    }

  }

}