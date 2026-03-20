import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeRepository } from '../../domain/theme/theme.repository';
import { Theme } from '../../domain/theme/entities/theme.entity';
import { LocalStorageAdapter } from '../adapters/local-storage.adapter';

const THEME_STORAGE_KEY = 'theme';

/**
 * Theme Repository Implementation (Adapter)
 * Manages theme persistence using localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeRepositoryImpl extends ThemeRepository {
  private readonly storage = inject(LocalStorageAdapter);
  private readonly platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getCurrent(): Theme {
    const saved = this.storage.getString(THEME_STORAGE_KEY);
    if (saved) {
      return Theme.fromString(saved);
    }
    return this.getSystemPreference();
  }

  save(theme: Theme): void {
    this.storage.setString(THEME_STORAGE_KEY, theme.type);
    this.applyTheme(theme);
  }

  getSystemPreference(): Theme {
    // Default to light theme
    return Theme.light();
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) return;
    document.documentElement.setAttribute('data-theme', theme.type);
  }
}
