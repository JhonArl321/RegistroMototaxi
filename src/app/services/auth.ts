import { Injectable } from '@angular/core';

import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
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

  logout() {
    return signOut(this.auth);
  }

}