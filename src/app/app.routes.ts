import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { MainLayoutComponent } from './layouts/main-layout/main-layout';

import { Dashboard } from './pages/dashboard/dashboard';

import { RegistrarPropietarios } from './pages/registrar-propietarios/registrar-propietarios';

import { ListarPropietarios } from './pages/listar-propietarios/listar-propietarios';

import { EditarPropietarios } from './pages/editar-propietarios/editar-propietarios';
import { RegisterFormComponent } from './components/register-form/register-form';

// IMPORTAR GUARD
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // Login
  {
    path: '',
    component: Login
  },

  { 
    path: 'register',
    component: RegisterFormComponent

  },

  // Sistema con sidebar fijo
  {
    path: '',
    component: MainLayoutComponent,

    // PROTEGER TODO EL LAYOUT
    canActivate: [authGuard],
    

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
      },

      {
        path: 'editar-propietario',
        component: EditarPropietarios,
      }

    ]

  }

];