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

  // =========================================
  // REGISTRAR USUARIO
  // =========================================
  async registrar() {

    // Validar campos vacíos
    if (
      !this.nombre ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {

      Swal.fire({

        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Debes completar todos los campos'

      });

      return;

    }

    // Validar contraseñas
    if (this.password !== this.confirmPassword) {

      Swal.fire({

        icon: 'error',
        title: 'Contraseñas diferentes',
        text: 'Las contraseñas no coinciden'

      });

      return;

    }

    try {

      // Registrar usuario Firebase
      await this.authService.registrarUsuario(
        this.email,
        this.password
      );

      // Mensaje éxito
      Swal.fire({

        icon: 'success',
        title: 'Cuenta creada',
        text: 'Ahora puedes iniciar sesión',
        confirmButtonColor: '#4f46e5'

      });

      // Redirigir login
      this.router.navigate(['/']);

    }

    catch (error) {

      Swal.fire({

        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear la cuenta'

      });

    }

  }

}