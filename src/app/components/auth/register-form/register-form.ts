import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})

export class RegisterFormComponent {

  // Services
  authService = inject(AuthService);
  router = inject(Router);

  // Variables
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';

  // REGISTRAR USUARIO
  async registrar() {

    // Campos vacíos
    if (
      !this.nombre ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {

      Swal.fire({

        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Debes completar todos los campos',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

      return;

    }

    // SOLO GMAIL
    if (!this.email.endsWith('@gmail.com')) {

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

    // Contraseñas iguales
    if (this.password !== this.confirmPassword) {

      Swal.fire({

        icon: 'error',
        title: 'Contraseñas diferentes',
        text: 'Las contraseñas no coinciden',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

      return;

    }

    try {

      await this.authService.registrarUsuario(
        this.nombre,
        this.email,
        this.password
      );

      Swal.fire({

        icon: 'success',
        title: 'Cuenta creada',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

      this.router.navigate(['/']);

    }

    catch {

      Swal.fire({

        icon: 'error',
        title: 'Error',

        width: '320px',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5'

      });

    }

  }

}