import { Injectable } from '@angular/core';

import {

  // Instancia de autenticación Firebase
  Auth,

  // Login popup
  signInWithPopup,

  // Providers
  GoogleAuthProvider,
  GithubAuthProvider,

  // Logout
  signOut,

  // Detectar cambios auth
  onAuthStateChanged,

  // Tipo usuario
  User

} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  // Usuario Firebase
  googleUsername: User | null = null;

  // Username GitHub
  githubUsername = '';

  // Foto usuario
  userPhoto = '';

  // Correo usuario
  userEmail = '';

  constructor(private auth: Auth) {

    // ================================
    // CARGAR CACHE
    // ================================
    if (typeof localStorage !== 'undefined') {

      const usuarioGuardado =
        localStorage.getItem('usuario');

      if (usuarioGuardado) {

        const usuario =
          JSON.parse(usuarioGuardado);

        this.githubUsername =
          usuario.githubUsername || '';

        this.userPhoto =
          usuario.userPhoto || '';

        this.userEmail =
          usuario.userEmail || '';

      }

    }

    // ================================
    // FIREBASE AUTH
    // ================================
    onAuthStateChanged(this.auth, (usuario) => {

      if (usuario) {

        // Guardar usuario Firebase
        this.googleUsername = usuario;

        // Username GitHub
        this.githubUsername =
          (usuario as any)
          .reloadUserInfo?.screenName || '';

        // Foto
        this.userPhoto =
          usuario.photoURL || '';

        // Correo
        this.userEmail =
          usuario.email || '';

        // ================================
        // GUARDAR CACHE
        // ================================
        if (typeof localStorage !== 'undefined') {

          localStorage.setItem(

            'usuario',

            JSON.stringify({

              githubUsername:
                this.githubUsername,

              userPhoto:
                this.userPhoto,

              userEmail:
                this.userEmail

            })

          );

        }

      }

    });

  }

  // ================================
  // LOGIN GOOGLE
  // ================================
  loginGoogle() {

    return signInWithPopup(
      this.auth,
      new GoogleAuthProvider()
    );

  }

  // ================================
  // LOGIN GITHUB
  // ================================
  loginGithub() {

    return signInWithPopup(
      this.auth,
      new GithubAuthProvider()
    );

  }

  // ================================
  // LOGOUT
  // ================================
  logout() {

    // Limpiar cache
    if (typeof localStorage !== 'undefined') {

      localStorage.removeItem('usuario');

    }

    return signOut(this.auth);

  }

}