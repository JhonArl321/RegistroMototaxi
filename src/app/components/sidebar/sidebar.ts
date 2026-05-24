import { Component } from '@angular/core';
import { Dashboard } from "../../pages/dashboard/dashboard";
import { Formulario } from "../formulario/formulario";

@Component({
  selector: 'app-sidebar',
  imports: [Dashboard, Formulario],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
