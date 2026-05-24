import { Component } from '@angular/core';
import { Dashboard } from "../../pages/dashboard/dashboard";
import { Formulario } from "../formulario/formulario";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
