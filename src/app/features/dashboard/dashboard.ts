import { Component, signal } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { Analytics } from '../analytics/analytics';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Card, Analytics],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  //Datos mock para las tarjetas del dashboard
  users = signal(1240);
  revenue = signal(8934);
  sessions = signal(5321);
  conversion = signal(4.7);

  //(Funciones para actualizar las signals (simular cambios))
    bump() {
    this.users.update(v => v + Math.floor(Math.random() * 10));
    this.revenue.update(v => v + Math.floor(Math.random() * 200));
    this.sessions.update(v => v + Math.floor(Math.random() * 50));
    this.conversion.update(v => Number((this.conversion() + Math.random() * 0.3).toFixed(1)));
  }
}

