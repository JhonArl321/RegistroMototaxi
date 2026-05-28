import { Component } from '@angular/core';
import { AuthGoogleComponent } from "../auth-google/auth-google";
import { AuthGithubComponent } from "../auth-github/auth-github";
import { AuthEmailComponent } from "../auth-email/auth-email";
import { AuthLayoutComponent } from "../auth-layout/auth-layout";

@Component({
  selector: 'app-login-form',
  imports: [
    AuthGoogleComponent,
    AuthGithubComponent,
    AuthEmailComponent,
    AuthLayoutComponent
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  standalone: true,
})
export class LoginFormComponent {

}