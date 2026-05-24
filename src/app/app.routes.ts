import { Routes } from '@angular/router';
import { Login  } from './pages/login/login';
import { Sidebar } from './components/sidebar/sidebar';
import { RegistrarPropietarios } from './pages/registrar-propietarios/registrar-propietarios';
import { Dashboard } from './pages/dashboard/dashboard';


export const routes: Routes = [

  {
    path: '',
    component: Login,
  },

  { path: 'sidebar',
    component:Sidebar,

  },
  {
  path: 'registrar-propietarios',
  component: RegistrarPropietarios,
},

{
  path: 'dashboard',
  component: Dashboard,
}

];