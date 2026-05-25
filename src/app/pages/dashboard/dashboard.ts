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

  // Username GitHub
  githubUsername = '';


  constructor(
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit() {

    // Detecta usuario autenticado
    onAuthStateChanged(this.auth, (usuario) => {

      if(usuario){

        // Guarda usuario
        this.user = usuario;

        // Obtiene username GitHub
        this.githubUsername =
          (usuario as any).reloadUserInfo.screenName;

        console.log(this.user);

        // Actualiza vista
        this.cd.detectChanges();

      }

    });

  }

}