/**
 * Slug Value Object
 * Represents a URL-friendly string identifier
 */
export class Slug {
  private readonly _value: string;

  constructor(value: string) {
    this._value = this.generateSlug(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Slug): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens
      .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens
  }

  static fromTitle(title: string): Slug {
    return new Slug(title);
  }
}
