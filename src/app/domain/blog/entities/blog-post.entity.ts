import { Slug } from '../value-objects/slug.vo';

/**
 * Blog Post Entity
 * Represents a blog article
 */
export class BlogPost {
  public readonly slug: Slug;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly summary: string,
    public readonly content: string,
    public readonly coverImage: string,
    public readonly publishedAt: Date,
    public readonly tags: string[] = [],
    public readonly readingTime: number = 5,
    slug?: string
  ) {
    this.slug = slug ? new Slug(slug) : Slug.fromTitle(title);
  }

  get formattedDate(): string {
    return this.publishedAt.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  get shortDate(): string {
    return this.publishedAt.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  get readingTimeText(): string {
    return `${this.readingTime} min de lectura`;
  }

  hasTag(tag: string): boolean {
    return this.tags.some(t => t.toLowerCase() === tag.toLowerCase());
  }

  matchesSearch(query: string): boolean {
    const searchTerm = query.toLowerCase();
    return (
      this.title.toLowerCase().includes(searchTerm) ||
      this.summary.toLowerCase().includes(searchTerm) ||
      this.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
}
