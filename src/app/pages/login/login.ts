import { Component } from '@angular/core';

import { LoginFormComponent } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

}