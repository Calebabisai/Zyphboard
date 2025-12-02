import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  //Inputs para personalizar la tarjeta
  tittle = input<string>('');
  value = input<string | number>('');
  icon = input<string>('');
  delta = input<string | null>(null);
}
