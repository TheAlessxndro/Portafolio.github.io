/**
 * Theme Entity
 * Represents the application theme (dark/light)
 */
export type ThemeType = 'dark' | 'light';

export class Theme {
  constructor(public readonly type: ThemeType) {}

  get isDark(): boolean {
    return this.type === 'dark';
  }

  get isLight(): boolean {
    return this.type === 'light';
  }

  get icon(): string {
    return this.isDark ? 'fas fa-moon' : 'fas fa-sun';
  }

  get label(): string {
    return this.isDark ? 'Modo Oscuro' : 'Modo Claro';
  }

  get toggleIcon(): string {
    return this.isDark ? 'fas fa-sun' : 'fas fa-moon';
  }

  get toggleLabel(): string {
    return this.isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
  }

  toggle(): Theme {
    return new Theme(this.isDark ? 'light' : 'dark');
  }

  equals(other: Theme): boolean {
    return this.type === other.type;
  }

  static dark(): Theme {
    return new Theme('dark');
  }

  static light(): Theme {
    return new Theme('light');
  }

  static fromString(value: string): Theme {
    return new Theme(value === 'light' ? 'light' : 'dark');
  }
}
