import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
})
export class MainLayout {
  collapsed = signal(false);

  menu = [
    {label : 'Dashboard', route: '/dashboard', icon: '🏠'},
    {label : 'Analíticas', route: '/analytics', icon: '📊'},
    {label : 'Usuarios', route: '/users', icon: '👥'},
    {label : 'Configuración', route: '/settings', icon: '⚙️'},
  ]

  toggleBar() {
    const next = !this.collapsed();
    this.collapsed.set(next);
  }
};
