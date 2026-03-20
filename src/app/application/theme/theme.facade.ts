import { Injectable, inject, signal, computed, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeRepository } from '../../domain/theme/theme.repository';
import { ThemeRepositoryImpl } from '../../infrastructure/persistence/theme.repository.impl';
import { Theme } from '../../domain/theme/entities/theme.entity';

/**
 * Theme Facade
 * Orchestrates theme-related operations with reactive state
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeFacade {
  private readonly repository: ThemeRepository = inject(ThemeRepositoryImpl);
  private readonly platformId = inject(PLATFORM_ID);

  // State
  private readonly _theme = signal<Theme>(this.repository.getCurrent());

  // Computed values
  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme().isDark);
  readonly isLight = computed(() => this._theme().isLight);
  readonly icon = computed(() => this._theme().icon);
  readonly toggleIcon = computed(() => this._theme().toggleIcon);
  readonly label = computed(() => this._theme().label);
  readonly toggleLabel = computed(() => this._theme().toggleLabel);

  constructor() {
    // Apply theme whenever it changes
    effect(() => {
      const theme = this._theme();
      this.repository.save(theme);
    });

    // Listen for system theme changes
    if (isPlatformBrowser(this.platformId)) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't set a preference
        const hasStoredPreference = localStorage.getItem('theme') !== null;
        if (!hasStoredPreference) {
          this._theme.set(e.matches ? Theme.dark() : Theme.light());
        }
      });
    }
  }

  // Actions
  toggle(): void {
    this._theme.update(current => current.toggle());
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }

  setDark(): void {
    this._theme.set(Theme.dark());
  }

  setLight(): void {
    this._theme.set(Theme.light());
  }

  resetToSystem(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('theme');
      this._theme.set(this.repository.getSystemPreference());
    }
  }
}
