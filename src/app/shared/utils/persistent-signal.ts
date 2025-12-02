import { signal, effect, type WritableSignal } from '@angular/core';

export function persistentSignal<T>(key: string, initialValue: T): WritableSignal<T> {
  // 1. Intentar recuperar del storage
  const storedValue = localStorage.getItem(key);
  let initial = initialValue;

  if (storedValue) {
    try {
      // Parsear con seguridad
      initial = JSON.parse(storedValue);
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}"`, e);
      // Si falla, nos quedamos con el initialValue por defecto
    }
  }

  // 2. Crear la signal
  const stateSignal = signal<T>(initial);

  // 3. Sincronizar cambios usando 'effect'
  effect(() => {
    const value = stateSignal(); // Leemos la signal para registrar la dependencia
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  });

  return stateSignal;
}
