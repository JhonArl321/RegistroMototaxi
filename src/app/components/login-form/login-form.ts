import { Component } from '@angular/core';
import { AuthGoogleComponent } from "../auth-google/auth-google";

@Component({
  selector: 'app-login-form',
  imports: [AuthGoogleComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  standalone: true,
})
export class LoginFormComponent {

}
