import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { RegistrarPropietarios } from './pages/registrar-propietarios/registrar-propietarios';

export const routes: Routes = [

  // Login
  {
    path: '',
    component: Login
  },

  // Sistema con sidebar fijo
  {
    path: '',
    component: MainLayout,

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'registrar-propietarios',
        component: RegistrarPropietarios
      }

    ]

  }

];