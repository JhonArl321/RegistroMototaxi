import { Injectable } from '@angular/core';

import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
   GithubAuthProvider,
  signOut
  
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private auth: Auth) {}

  loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }


  loginGithub() {
  return signInWithPopup(this.auth, new GithubAuthProvider());
}
  logout() {
    return signOut(this.auth);
  }

}