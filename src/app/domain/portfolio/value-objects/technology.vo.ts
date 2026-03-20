/**
 * Technology Value Object
 * Represents a technology/skill with optional styling
 */
export class Technology {
  constructor(
    public readonly name: string,
    public readonly color?: string
  ) {
    if (!name || name.trim().length === 0) {
      throw new Error('Technology name cannot be empty');
    }
  }

  get slug(): string {
    return this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  equals(other: Technology): boolean {
    return this.name.toLowerCase() === other.name.toLowerCase();
  }

  matches(search: string): boolean {
    return this.name.toLowerCase().includes(search.toLowerCase());
  }

  toString(): string {
    return this.name;
  }
}
