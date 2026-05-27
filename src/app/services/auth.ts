import { Injectable } from '@angular/core';

import {

  Auth,
  signInWithPopup,

  GoogleAuthProvider,
  GithubAuthProvider,

  signOut,
  onAuthStateChanged,
  User,

  // Mantener sesión aunque se refresque
  browserLocalPersistence,
  setPersistence,

  createUserWithEmailAndPassword,
  signInWithEmailAndPassword

} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  // Usuario Firebase
  googleUsername: User | null = null;

  // Datos usuario
  githubUsername = '';
  userPhoto = '';
  userEmail = '';

  constructor(private auth: Auth) {

    // Mantener sesión activa
    setPersistence(
      this.auth,
      browserLocalPersistence
    );

    // Cargar cache
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

    // Detectar sesión Firebase
    onAuthStateChanged(this.auth, (usuario) => {

      // Si existe usuario
      if (usuario) {

        this.googleUsername = usuario;

        this.githubUsername =
          (usuario as any)
            .reloadUserInfo?.screenName || '';

        this.userPhoto =
          usuario.photoURL || '';

        this.userEmail =
          usuario.email || '';

        // Guardar cache
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

      // Si no existe usuario
      else {

        this.googleUsername = null;
        this.githubUsername = '';
        this.userPhoto = '';
        this.userEmail = '';

        if (typeof localStorage !== 'undefined') {

          localStorage.removeItem('usuario');

        }

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


  // REGISTRAR USUARIO
registrarUsuario(
  email: string,
  password: string
) {

  return createUserWithEmailAndPassword(
    this.auth,
    email,
    password
  );

}

// LOGIN USUARIO
loginUsuario(
  email: string,
  password: string
) {

  return signInWithEmailAndPassword(
    this.auth,
    email,
    password
  );

}

  // Logout
  logout() {

    if (typeof localStorage !== 'undefined') {

      localStorage.removeItem('usuario');

    }

    return signOut(this.auth);

  }

}