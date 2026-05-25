import { Injectable } from '@angular/core';

import {
  //la instancia de autenticación de Firebase
  Auth,
  //proveedor para login con Google.
  signInWithPopup,
  //proveedor para login con GitHub
  GoogleAuthProvider,
  //abre el popup para iniciar sesión
  GithubAuthProvider,
  //cerrar sesión.
  signOut,
  //detectar cambios de autenticación
  onAuthStateChanged,
  //tipo de usuario autenticado.
  User

} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  // Usuario autenticado con Goolge
  googleUsername: User | null = null;

  // Username de GitHub
  githubUsername = '';

  constructor(private auth: Auth) {

    // Detecta cambios de autenticación
    onAuthStateChanged(this.auth, (usuario) => {

      if(usuario){

        // Guarda usuario
        this.googleUsername= usuario;

        // Obtiene username GitHub
        this.githubUsername =
          (usuario as any).reloadUserInfo.screenName;

      }

    });

  }

  // Login Google
  loginGoogle() {

    return signInWithPopup(
      this.auth,
      new GoogleAuthProvider()
    );

  }

  // Login GitHub
  loginGithub() {

    return signInWithPopup(
      this.auth,
      new GithubAuthProvider()
    );

  }

  // Logout
  logout() {
    return signOut(this.auth);
  }

}