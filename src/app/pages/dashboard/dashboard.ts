import {
  Component,
  inject,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import {
  Auth,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {

  // Firebase Auth
  auth = inject(Auth);

  // Usuario autenticado
  user: User | null = null;


  constructor(
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit() {

    // Detecta usuario autenticado
    onAuthStateChanged(this.auth, (usuario) => {

      // Guarda usuario
      this.user = usuario;

      console.log(this.user);

      // Fuerza la actualización de la vista para mostrar el usuario autenticado
      this.cd.detectChanges();

    });

  }

}