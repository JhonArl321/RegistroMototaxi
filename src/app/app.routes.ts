import { Routes } from '@angular/router';
import { Login  } from './pages/login/login';
import { Sidebar } from './components/sidebar/sidebar';
import { RegistrarPropietarios } from './pages/registrar-propietarios/registrar-propietarios';


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


];