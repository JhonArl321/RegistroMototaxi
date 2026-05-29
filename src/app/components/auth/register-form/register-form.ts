import {
  Component,
  inject,
  AfterViewInit
} from '@angular/core';

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

export class RegisterFormComponent
  implements AfterViewInit {

  // Servicios utilizados por el componente
  authService = inject(AuthService);
  router = inject(Router);

  // Datos del formulario
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';

  widgetId: any;

  ngAfterViewInit(): void {

    // Se espera un momento para asegurar
    // que el contenedor del captcha ya existe
    setTimeout(() => {

      this.widgetId =
        (window as any).grecaptcha.render(
          'recaptcha-container',
          {
            sitekey:
              '6LfulQEtAAAAACYtu-kjfAQH_UR8caQgmA1PUJzy'
          }
        );

    }, 500);

  }

  // Centralizar la configuración evita
  // repetir el mismo código en cada alerta
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

  async registrar() {

    // Evita enviar información incompleta
    if (
      !this.nombre ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {

      this.mostrarAlerta(
        'warning',
        'Campos vacíos',
        'Debes completar todos los campos'
      );

      return;

    }

    // Limitar registros únicamente
    // a cuentas de Gmail
    if (!this.email.endsWith('@gmail.com')) {

      this.mostrarAlerta(
        'warning',
        'Solo se permiten correos Gmail'
      );

      return;

    }

    // Verificar que el usuario escribió
    // correctamente su contraseña
    if (
      this.password !==
      this.confirmPassword
    ) {

      this.mostrarAlerta(
        'error',
        'Contraseñas diferentes',
        'Las contraseñas no coinciden'
      );

      return;

    }

    const captcha =
      (window as any)
        .grecaptcha
        .getResponse();

    // Evita registros automáticos o bots
    if (!captcha) {

      this.mostrarAlerta(
        'warning',
        'Completa el captcha'
      );

      return;

    }

    try {

      await this.authService
        .registrarUsuario(
          this.nombre,
          this.email,
          this.password
        );

      this.mostrarAlerta(
        'success',
        'Cuenta creada'
      );

      (window as any)
        .grecaptcha
        .reset();

      this.router.navigate(['/']);

    }

    catch {

      // Mostrar un mensaje amigable
      // si ocurre cualquier error
      this.mostrarAlerta(
        'error',
        'Error'
      );

    }

  }

}