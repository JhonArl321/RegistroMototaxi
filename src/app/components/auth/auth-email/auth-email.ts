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

  // Servicios utilizados por el componente
  authService = inject(AuthService);
  router = inject(Router);

  // Datos del formulario
  email = '';
  password = '';

  // Centralizar las alertas evita repetir
  // la misma configuración en todo el componente
  private mostrarAlerta(
    icon: 'success' | 'error' | 'warning',
    title: string,
    text?: string
  ) {

    Swal.fire({

      icon,
      title,
      text,

      width: '320px',
      background: '#1f2937',
      color: '#fff',
      confirmButtonColor: '#4f46e5'

    });

  }

  async login() {

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Evita enviar un formulario incompleto
    if (
      !this.email ||
      !this.password
    ) {

      this.mostrarAlerta(
        'warning',
        'Campos vacíos',
        'Completa todos los campos'
      );

      return;

    }

    // Evita correos con formato incorrecto
    if (!emailValido.test(this.email)) {

      this.mostrarAlerta(
        'warning',
        'Correo inválido'
      );

      return;

    }

    // Restringir el acceso únicamente
    // a cuentas Gmail
    if (
      !this.email
        .toLowerCase()
        .endsWith('@gmail.com')
    ) {

      this.mostrarAlerta(
        'warning',
        'Solo se permiten correos Gmail'
      );

      return;

    }

    // Evita contraseñas demasiado cortas
    if (this.password.length < 6) {

      this.mostrarAlerta(
        'warning',
        'Contraseña inválida',
        'Mínimo 6 caracteres'
      );

      return;

    }

    try {

      await this.authService.loginUsuario(
        this.email,
        this.password
      );

      // Redirigir únicamente si el login fue exitoso
      this.router.navigate([
        '/dashboard'
      ]);

    }

    catch {

      // Mostrar un mensaje claro
      // cuando las credenciales son incorrectas
      this.mostrarAlerta(
        'error',
        'Error al iniciar sesión',
        'Credenciales incorrectas'
      );

    }

  }

}