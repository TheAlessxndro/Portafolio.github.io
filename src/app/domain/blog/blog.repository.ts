import { BlogPost } from './entities/blog-post.entity';

/**
 * Blog Repository Interface (Port)
 * Defines the contract for accessing blog posts data
 */
export abstract class BlogRepository {
  abstract getAll(): BlogPost[];
  abstract getBySlug(slug: string): BlogPost | undefined;
  abstract getByTag(tag: string): BlogPost[];
  abstract getRecent(limit: number): BlogPost[];
  abstract getAllTags(): string[];
}
