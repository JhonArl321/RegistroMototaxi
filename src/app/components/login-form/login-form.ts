import { Component } from '@angular/core';
import { AuthGoogleComponent } from "../auth-google/auth-google";
import { AuthGithubComponent } from "../auth-github/auth-github";
import { AuthEmailComponent } from "../auth-email/auth-email";


@Component({
  selector: 'app-login-form',
  imports: [AuthGoogleComponent, AuthGithubComponent, AuthEmailComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  standalone: true,
})
export class LoginFormComponent {

}
