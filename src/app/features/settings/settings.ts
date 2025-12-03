import { Component, computed } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { FormsModule } from '@angular/forms';
import { Theme } from '../../models/settings.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings {
  //Constructor que inyecta el servicio de configuración
  constructor(public settingsService: SettingsService) {}

  //Computed para mostrar la configuración en formato JSON
  settingsJson = computed(() =>
    JSON.stringify(this.settingsService.settings(), null, 2));

  //Manejador de cambio de tema
  onThemeChange(event: Event) {
    const theme = (event.target as HTMLSelectElement).value as Theme;
    this.settingsService.setTheme(theme);
  }
  // Manejador para alternar la barra lateral
  toggleSidebar(): void {
    this.settingsService.toggleSidebar();
  }
  // Manejador para el cambio en el número de ítems por página
  onItemsPerPageChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.settingsService.setItemsPerPage(value);
  }
  //Manejador para el cambio en las notificaciones por correo electronico
  onEmailChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.settingsService.updateNotifications({ email: checked });
  }
  //Manejador para el cambio en las notificaciones push
  onPushChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.settingsService.updateNotifications({ push: checked });
  }
  //Manejador para el cambio en las notificaciones de sonido
  onSoundChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.settingsService.updateNotifications({ sound: checked });
  }
  //Manejador para resetear la configuración a los valores por defecto
  reset(): void {
    if (confirm('Are you sure you want to reset settings to default?')) {
      this.settingsService.resetDefaults();
    }
  }
};

