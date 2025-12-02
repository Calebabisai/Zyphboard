import { Component,input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { persistentSignal } from '../../utils/persistent-signal';
import { MenuItemModel } from '../../../models/menuItem.model';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  //Signal interna (Este component maneja su propio estado)
  collapsed = persistentSignal<boolean>('sidebar-collapsed', false);
  //SOlo recibe el menu desde el componente padre
  menu = input<Array<MenuItemModel>>([]);
  //Emite evento cuando se colapsa o expande la barra
  onToggle() {
    this.collapsed.update(value => !value);
  }
}
