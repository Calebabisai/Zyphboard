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
    // id simple, para seguir desarrollando de forma local y temporal
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  /**
   * funcion que retorna la lista de usuarios
   */
  list() : User[] {
    return this._users();
  }

  // funcion que retorna un usuario por id
  get(id: string) : User | undefined {
    return this._users().find(user => user.id === id);
  }

  /**
   * funcion que agrega un nuevo usuario
   */
  add(payload: Omit<User, 'id' | 'createdAt'>) : User {
    const newUser: User = {
      ...payload,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    };
    this._users.set([newUser, ...this._users()]);
    return newUser;
  }
  /**
   * funcion que actualiza un usuario existente
   */
    update(id: string, patch: Partial<Omit<User, 'id' | 'createdAt'>>): User | undefined {
    const list = this._users().map(u => (u.id === id ? { ...u, ...patch } : u));
    this._users.set(list);
    return list.find(u => u.id === id);
  }

  /**
   * funcion que elimina un usuario por id
   */
  remove(id: string): void {
    this._users.set(this._users().filter(u => u.id !== id));
  }

  /**
   * funcion que agrega o actualiza un usuario
   */
    upsert(payload: Partial<User> & { email: string; name: string; role: User['role']; active?: boolean }): User {
    
    if (payload.id) {
      const updated = this.update(payload.id, payload as Partial<User>);
      if (updated) return updated;
    }
    return this.add({
      name: payload.name,
      email: payload.email,
      role: payload.role,
      active: payload.active ?? true,
    });
  }
  /** funcion que resetea la lista de usuarios
   */
  reset() {
    this._users.set([]);
  }
}
