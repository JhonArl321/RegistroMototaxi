import { Component, inject } from '@angular/core';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {

  // AuthService
  authService = inject(AuthService);

}