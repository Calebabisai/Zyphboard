export type Theme = 'light' | 'dark' | 'system';

export interface SettingsModel {
    theme: Theme;
    showSidebar: boolean;
    itemsPerPage: number;
    notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };

}

export const DEFAULT_SETTINGS: SettingsModel = {
    theme: 'system',
    showSidebar: true,
    itemsPerPage: 10,
    notifications: {
        email: true,
        push: true,
        sound: false,
    },
}
