import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

// Guard para proteger rutas
export const authGuard: CanActivateFn = () => {

  // Inyectar servicios
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(

    // Tomar solo un valor
    take(1),

    map(usuario => {

      // Si existe usuario autenticado
      if (usuario) {

        return true;

      }

      // Redirigir al login
      router.navigate(['/']);
      return false;

    })

  );

};