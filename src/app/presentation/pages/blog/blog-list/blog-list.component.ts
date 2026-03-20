import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogFacade } from '../../../../application/blog/blog.facade';
import { BlogCardComponent } from '../../../components/blog-card/blog-card.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BlogCardComponent,
    AnimateOnScrollDirective
  ],
  template: `
    <main class="blog-page">
      <div class="container">
        <div class="blog-header" appAnimateOnScroll>
          <a routerLink="/" class="back-link">
            <i class="fas fa-arrow-left"></i>
            Volver al inicio
          </a>
          <h1 class="blog-title">Blog</h1>
          <p class="blog-description">
            Artículos sobre desarrollo web, arquitectura de software y tecnologías modernas.
          </p>
        </div>

        <div class="tags-filter" appAnimateOnScroll [delay]="100">
          <button
            class="tag-btn"
            [class.active]="!selectedTag()"
            (click)="clearFilter()"
          >
            Todos
          </button>
          @for (tag of tags(); track tag) {
            <button
              class="tag-btn"
              [class.active]="selectedTag() === tag"
              (click)="filterByTag(tag)"
            >
              {{ tag }}
            </button>
          }
        </div>

        <div class="posts-grid">
          @for (post of posts(); track post.id; let i = $index) {
            <div appAnimateOnScroll [delay]="(i + 1) * 100">
              <app-blog-card [post]="post" />
            </div>
          } @empty {
            <p class="no-posts">No hay artículos disponibles.</p>
          }
        </div>
      </div>
    </main>
  `,
  styles: [`
    .blog-page {
      min-height: 100vh;
      padding: 7rem 0 4rem;

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .blog-header {
        text-align: center;
        margin-bottom: 3rem;

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent);
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease-in-out;

          &:hover {
            transform: translateX(-5px);
          }
        }
      }

      .blog-title {
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 700;
        color: var(--text-heading);
        margin: 0 0 1rem;
      }

      .blog-description {
        color: var(--text-secondary);
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
      }

      .tags-filter {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 3rem;

        .tag-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease-in-out;

          &:hover {
            color: var(--accent);
            border-color: var(--accent);
          }

          &.active {
            background: var(--accent);
            color: var(--bg-primary);
            border-color: var(--accent);
          }
        }
      }

      .posts-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
      }

      .no-posts {
        grid-column: 1 / -1;
        text-align: center;
        color: var(--text-secondary);
        padding: 4rem 0;
      }
    }

    @media (max-width: 992px) {
      .blog-page .posts-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .blog-page .posts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BlogListComponent {
  private readonly blogFacade = inject(BlogFacade);

  readonly posts = this.blogFacade.posts;
  readonly tags = this.blogFacade.tags;
  readonly selectedTag = this.blogFacade.selectedTag;

  filterByTag(tag: string): void {
    this.blogFacade.toggleTag(tag);
  }

  clearFilter(): void {
    this.blogFacade.filterByTag(null);
  }
}
