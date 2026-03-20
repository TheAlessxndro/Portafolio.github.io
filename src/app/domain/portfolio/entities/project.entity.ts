import { Technology } from '../value-objects/technology.vo';

/**
 * Project Entity
 * Represents a portfolio project
 */
export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly image: string,
    public readonly technologies: Technology[],
    public readonly githubUrl?: string,
    public readonly liveUrl?: string,
    public readonly featured: boolean = false
  ) {}

  get technologyNames(): string[] {
    return this.technologies.map(tech => tech.name);
  }

  hasTechnology(techName: string): boolean {
    return this.technologies.some(
      tech => tech.name.toLowerCase() === techName.toLowerCase()
    );
  }

  matchesFilter(filter: string | null): boolean {
    if (!filter) return true;
    return this.hasTechnology(filter);
  }

  hasGithub(): boolean {
    return !!this.githubUrl;
  }

  hasLiveDemo(): boolean {
    return !!this.liveUrl;
  }
}
