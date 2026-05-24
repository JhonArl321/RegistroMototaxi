import { Routes } from '@angular/router';
import { Login  } from './pages/login/login';
import { Sidebar } from './components/sidebar/sidebar';


export const routes: Routes = [

  {
    path: '',
    component: Login,
  },

  { path: 'sidebar',
    component:Sidebar,

  }



];