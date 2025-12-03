import { Injectable, Signal, WritableSignal, computed } from '@angular/core';
import { DEFAULT_SETTINGS, SettingsModel, Theme } from '../../models/settings.model';
import { persistentSignal } from '../../shared/utils/persistent-signal';

@Injectable({ 
  providedIn: 'root',
})
export class SettingsService {
  // Signal privada que almacena la configuración
  private readonly _settings: WritableSignal<SettingsModel>;

  readonly settings: Signal<SettingsModel>;
  // Signals derivadas para acceder a propiedades específicas
  readonly theme = computed(() => this._settings().theme);
  readonly showSidebar = computed(() => this._settings().showSidebar);
  readonly itemsPerPage = computed(() => this._settings().itemsPerPage);
  readonly notifications = computed(() => this._settings().notifications);

  constructor() {
    this._settings = persistentSignal<SettingsModel>(
      'zyphboard:settings',
      DEFAULT_SETTINGS
    );

    this.settings = this._settings.asReadonly();    
  }
  // Método para actualizar múltiples propiedades de configuración
  update(partial: Partial<SettingsModel>) : void {
    this._settings.update(current => ({
      ...current,
      ...partial,
      notifications: {
        ...current.notifications,
        ...(partial.notifications ?? {}),
      },
    }))
  }
  // Método para establecer el tema
  setTheme(theme: Theme){
    this._settings.update(settings => ({...settings, theme }));
  }
  // Método para alternar la visibilidad de la barra lateral
  toggleSidebar(): void {
    this._settings.update(settingToggle => ({ ...settingToggle, showSidebar: !settingToggle.showSidebar }));
  }
  // Método para establecer el número de ítems por página
  setItemsPerPage(count: number) {
    const itemsPerPage = Math.max(1, Math.floor(count));
    this._settings.update(settings => ({...settings, itemsPerPage }));
  }
  // Método para actualizar las notificaciones
  updateNotifications(partial: Partial<SettingsModel['notifications']>): void {
    this._settings.update(current => ({
      ...current,
      notifications: {
        ...current.notifications,
        ...partial,
      },
    }));
  }
  // Método para resetear la configuración a los valores por defecto
  resetDefaults() {
    this._settings.set(DEFAULT_SETTINGS);
  }
}
