import { Injectable, computed } from '@angular/core';
import { persistentSignal } from '../../shared/utils/persistent-signal';
import { WritableSignal } from '@angular/core';
import { User } from '../../models/user.model';
// Definición de la clave de almacenamiento
const STORAGE_KEY = 'zyphboard:users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  /** Señal que almacena la lista de usuarios */
  private readonly _users: WritableSignal<User[]>; 

  activeUsers = computed(() => this._users().filter(user => user.active));
  userCount = computed(() => this._users().length);

  constructor() {
    this._users = persistentSignal<User[]>(STORAGE_KEY, []);
  }

  private generateId(): string {
    // id simple, para seguir desarrollando de forma locarl y temporal
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  list() : User[] {
    return this._users();
  }

  get(id: string) : User | undefined {
    return this._users().find(user => user.id === id);
  }


}
