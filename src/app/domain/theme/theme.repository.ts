import { Theme } from './entities/theme.entity';

/**
 * Theme Repository Interface (Port)
 * Defines the contract for persisting theme preferences
 */
export abstract class ThemeRepository {
  abstract getCurrent(): Theme;
  abstract save(theme: Theme): void;
  abstract getSystemPreference(): Theme;
}
