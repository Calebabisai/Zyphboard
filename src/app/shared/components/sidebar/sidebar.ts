import { Component,input,signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  //Signal interna (Este component maneja su propio estado)
  collapsed = signal(false);
  //SOlo recibe el menu desde el componente padre
  menu = input<Array<{ label: string; route: string; icon: string }>>([]);
  //Emite evento cuando se colapsa o expande la barra
  onToggle() {
    this.collapsed.update(value => !value);
  }
}
