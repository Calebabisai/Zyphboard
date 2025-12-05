import { Injectable, computed } from '@angular/core';
import { persistentSignal } from '../../shared/utils/persistent-signal';
import { WritableSignal } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _users: WritableSignal<User[]>; 

  activeUsers = computed(() => this._users().filter(user => user.active));

  constructor() {
    this._users = persistentSignal<User[]>('zyphboard:users', []);
  }
}
