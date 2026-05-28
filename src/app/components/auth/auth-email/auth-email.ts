import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-email',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './auth-email.html',
  styleUrl: './auth-email.css',
})

export class AuthEmailComponent {

  authService = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';

  // LOGIN
  async login() {

    try {

      await this.authService.loginUsuario(
        this.email,
        this.password
      );
      this.router.navigate(['/dashboard']);

    }

    catch {

      Swal.fire({

        icon: 'error',
        title: 'Error al iniciar sesión'

      });

    }

  }

  // REGISTRO
  async registrar() {

    try {

      await this.authService.registrarUsuario(
        this.email,
        this.password
      );

      Swal.fire({

        icon: 'success',
        title: 'Cuenta creada'

      });

    }

    catch {

      Swal.fire({

        icon: 'error',
        title: 'Error al registrar usuario'

      });

    }

  }

}