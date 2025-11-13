import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  // Métodos helpers para objetos JSON
  getObject<T>(key: string): T | null {
    const item = this.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch {
        return null;
      }
    }
    return null;
  }

  setObject<T>(key: string, value: T): void {
    this.setItem(key, JSON.stringify(value));
  }
}