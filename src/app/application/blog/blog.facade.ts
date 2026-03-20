import { Injectable, inject, signal, computed } from '@angular/core';
import { BlogRepository } from '../../domain/blog/blog.repository';
import { BlogRepositoryImpl } from '../../infrastructure/persistence/blog.repository.impl';
import { BlogPost } from '../../domain/blog/entities/blog-post.entity';

/**
 * Blog Facade
 * Orchestrates blog-related operations with filtering support
 */
@Injectable({
  providedIn: 'root'
})
export class BlogFacade {
  private readonly repository: BlogRepository = inject(BlogRepositoryImpl);

  // State
  private readonly _selectedTag = signal<string | null>(null);
  private readonly _searchQuery = signal<string>('');

  // Computed values
  readonly selectedTag = this._selectedTag.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();

  readonly posts = computed(() => {
    let posts = this.repository.getAll();
    const tag = this._selectedTag();
    const query = this._searchQuery();

    if (tag) {
      posts = posts.filter(post => post.hasTag(tag));
    }

    if (query) {
      posts = posts.filter(post => post.matchesSearch(query));
    }

    return posts;
  });

  readonly recentPosts = computed(() =>
    this.repository.getRecent(3)
  );

  readonly tags = computed(() =>
    this.repository.getAllTags()
  );

  readonly postCount = computed(() => this.posts().length);

  readonly hasFilter = computed(() =>
    this._selectedTag() !== null || this._searchQuery().length > 0
  );

  // Actions
  filterByTag(tag: string | null): void {
    this._selectedTag.set(tag);
  }

  search(query: string): void {
    this._searchQuery.set(query);
  }

  clearFilters(): void {
    this._selectedTag.set(null);
    this._searchQuery.set('');
  }

  toggleTag(tag: string): void {
    if (this._selectedTag() === tag) {
      this._selectedTag.set(null);
    } else {
      this._selectedTag.set(tag);
    }
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.repository.getBySlug(slug);
  }
}
