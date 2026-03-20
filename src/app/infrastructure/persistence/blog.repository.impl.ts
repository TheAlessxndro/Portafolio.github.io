import { Injectable } from '@angular/core';
import { BlogRepository } from '../../domain/blog/blog.repository';
import { BlogPost } from '../../domain/blog/entities/blog-post.entity';
import { BLOG_POSTS_DATA } from '../data/blog-posts.data';

/**
 * Blog Repository Implementation (Adapter)
 * Provides blog posts data from static data source
 */
@Injectable({
  providedIn: 'root'
})
export class BlogRepositoryImpl extends BlogRepository {
  private readonly posts: BlogPost[] = BLOG_POSTS_DATA;

  getAll(): BlogPost[] {
    return [...this.posts].sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  getBySlug(slug: string): BlogPost | undefined {
    return this.posts.find(post => post.slug.value === slug);
  }

  getByTag(tag: string): BlogPost[] {
    return this.posts
      .filter(post => post.hasTag(tag))
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  getRecent(limit: number): BlogPost[] {
    return this.getAll().slice(0, limit);
  }

  getAllTags(): string[] {
    const tagSet = new Set<string>();
    this.posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }
}
