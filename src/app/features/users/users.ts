import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { User} from '../../models/user.model';

/**
 * Componente para la gestión de usuarios
 * Permite listar, crear, editar y eliminar usuarios
 */
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class Users {
  private fb = inject(FormBuilder);
  public usersService = inject(UsersService);

  /** Texto de búsqueda para filtrar usuarios */
  search = signal('');
  /** Usuario que se está editando actualmente */
  editing = signal<User | null>(null);
  /** Indica si el formulario está visible */
  showForm = signal(false);

  /** Formulario reactivo para crear o editar usuarios */
  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', [Validators.required]],
    active: [true],
  });

  /** Computed signal para usuarios filtrados */
  filteredUsers = computed(() => {
    const q = this.search().trim().toLowerCase();
    const all = this.usersService.list();
    if (!q) return all;
    return all.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  });

  constructor() {
    /** Effect: sincronizar formulario cuando cambia editing */
    effect(() => {
      const user = this.editing();
      if (user) {
        this.form.setValue({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
        });
      }
    });
  }

  /**
   * Abre el formulario para crear un nuevo usuario
   */
  openCreate(): void {
    this.editing.set(null);
    this.showForm.set(true);
    this.form.reset({ id: '', name: '', email: '', role: 'user', active: true });
  }
  /**
   * Abre el formulario para editar un usuario existente
   * @param user Usuario a editar
   */
  openEdit(user: User): void {
    this.editing.set(user);
    this.showForm.set(true);
  }
 /**
  * Guarda el usuario (crear o actualizar)
  */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const v = this.form.getRawValue();
    
    if (v.id) {
      this.usersService.update(v.id, {
        name: v.name || '',
        email: v.email || '',
        role: v.role as User['role'],
        active: v.active ?? true,
      });
    } else {
      this.usersService.add({
        name: v.name || '',
        email: v.email || '',
        role: v.role as User['role'],
        active: v.active ?? true,
      });
    }
    
    this.showForm.set(false);
    this.editing.set(null);
  }

  /**
   * Cancela la edición o creación de un usuario
   */
  cancel(): void {
    this.showForm.set(false);
    this.editing.set(null);
  }
  /**
   * Elimina un usuario por id
   * @param id ID del usuario a eliminar
   */
  remove(id: string): void {
    if (!confirm('Eliminar usuario? Esta acción no se puede deshacer.')) return;
    this.usersService.remove(id);
  }
  /** Alterna el estado activo de un usuario
   * @param user Usuario a activar/desactivar
   */
  toggleActive(user: User): void {
    this.usersService.update(user.id, { active: !user.active });
  }
}
