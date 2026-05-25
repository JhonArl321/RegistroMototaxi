import { Injectable } from '@angular/core';

import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  User

} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  // Usuario autenticado
  user: User | null = null;

  // Username de GitHub
  githubUsername = '';

  constructor(private auth: Auth) {

    // Detecta cambios de autenticación
    onAuthStateChanged(this.auth, (usuario) => {

      if(usuario){

        // Guarda usuario
        this.user = usuario;

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