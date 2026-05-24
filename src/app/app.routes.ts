import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { RegistrarPropietarios } from './pages/registrar-propietarios/registrar-propietarios';
import { ListarPropietarios } from './pages/listar-propietarios/listar-propietarios';

export const routes: Routes = [

  // Login
  {
    path: '',
    component: Login
  },

  // Sistema con sidebar fijo
  {
    path: '',
    component: MainLayoutComponent,

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'registrar-propietarios',
        component: RegistrarPropietarios
      },

    {
      path: 'listar-propietarios',
      component: ListarPropietarios,
    }




    ]

  }

];