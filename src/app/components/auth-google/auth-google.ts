import { Component } from '@angular/core';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth-google',
  standalone: true,
  imports: [],
  templateUrl: './auth-google.html',
  styleUrls: ['./auth-google.css'],
})

export class AuthGoogleComponent {

  constructor(private authService: AuthService) {}

  login() {

    this.authService.loginGoogle()
      .then((response) => {

        console.log("Login correcto");
        console.log(response.user);

      })
      .catch((error) => {

        console.log(error);

      });
  }
}