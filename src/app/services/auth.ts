import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

// Importaciones necesarias de Firebase Authentication
import {

  // Servicio principal de autenticación
  Auth,

  // Método para iniciar sesión usando una ventana emergente
  signInWithPopup,

  // Proveedor de autenticación con Google
  GoogleAuthProvider,

  // Proveedor de autenticación con GitHub
  GithubAuthProvider,

  // Método para cerrar sesión
  signOut

} from '@angular/fire/auth';


// Hace que este servicio pueda usarse en toda la aplicación
@Injectable({
  providedIn: 'root',
})

export class AuthService {


  //inyeccion del servicio de Auth de Firebase
  auth = inject(Auth);



  // Método para iniciar sesión con Google
  loginGoogle() {

    // Abre una ventana emergente para autenticarse con Google
    return signInWithPopup(this.auth, new GoogleAuthProvider());

  }



  // Método para iniciar sesión con GitHub
  loginGithub() {

    // Abre una ventana emergente para autenticarse con GitHub
    return signInWithPopup(this.auth, new GithubAuthProvider());

  }

  // Método para cerrar sesión
  logout() {

    // Cierra la sesión del usuario actual
    return signOut(this.auth);

  }

}