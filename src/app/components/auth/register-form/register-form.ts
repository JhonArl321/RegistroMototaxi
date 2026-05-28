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
      text: 'Debes completar todos los campos'
    });

    return;

  }

  // SOLO GMAIL
  if (!this.email.endsWith('@gmail.com')) {

    Swal.fire({
      icon: 'warning',
      title: 'Solo se permiten correos Gmail'
    });

    return;

  }

  // Contraseñas iguales
  if (this.password !== this.confirmPassword) {

    Swal.fire({
      icon: 'error',
      title: 'Contraseñas diferentes',
      text: 'Las contraseñas no coinciden'
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
      title: 'Cuenta creada'
    });

    this.router.navigate(['/']);

  }

  catch {

    Swal.fire({
      icon: 'error',
      title: 'Error'
    });

  }

}

}