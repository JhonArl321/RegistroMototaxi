import { Component } from '@angular/core';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth-github',
  standalone: true,
  imports: [],
  templateUrl: './auth-github.html',
  styleUrl: './auth-github.css',
})

export class AuthGithubComponent {

  constructor(private authService: AuthService) {}

  login() {

    this.authService.loginGithub()
      .then((response) => {

        console.log("Login GitHub correcto");
        console.log(response.user);

      })
      .catch((error) => {

        console.log(error);

      });

  }

}