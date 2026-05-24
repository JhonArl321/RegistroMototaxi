import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {

  @Output() close = new EventEmitter<void>();

  closeSidebar() {
    this.close.emit();
  }

}