import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
})
export class MainLayout {

  menu = [
    {label : 'Dashboard', route: '/dashboard', icon: '🏠'},
    {label : 'Analíticas', route: '/analytics', icon: '📊'},
    {label : 'Usuarios', route: '/users', icon: '👥'},
    {label : 'Configuración', route: '/settings', icon: '⚙️'},
  ]
};
