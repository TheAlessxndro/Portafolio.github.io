import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../../domain/blog/entities/blog-post.entity';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="blog-card">
      <a [routerLink]="['/blog', post.slug.value]" class="card-link">
        <div class="card-image">
          <img [src]="post.coverImage" [alt]="post.title" />
        </div>

        <div class="card-content">
          <div class="card-meta">
            <span class="date">{{ post.shortDate }}</span>
            <span class="separator">•</span>
            <span class="reading-time">{{ post.readingTimeText }}</span>
          </div>

          <h3 class="card-title">{{ post.title }}</h3>

          <p class="card-summary">{{ post.summary }}</p>

          <div class="card-tags">
            @for (tag of post.tags.slice(0, 3); track tag) {
              <span class="tag">{{ tag }}</span>
            }
          </div>
        </div>
      </a>
    </article>
  `,
  styles: [`
    .blog-card {
      background: var(--bg-secondary);
      border-radius: 8px;
      overflow: hidden;
      height: 100%;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 30px -15px var(--shadow-color);

        .card-image img {
          transform: scale(1.05);
          filter: none;
        }

        .card-title {
          color: var(--accent);
        }
      }

      .card-link {
        display: block;
        text-decoration: none;
        color: inherit;
        height: 100%;
      }

      .card-image {
        height: 180px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(50%);
          transition: all 0.3s ease-in-out;
        }
      }

      .card-content {
        padding: 1.5rem;
      }

      .card-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-family: 'Fira Code', monospace;

        .separator {
          color: var(--accent);
        }
      }

      .card-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-heading);
        margin: 0 0 0.75rem;
        transition: color 0.3s ease-in-out;
        line-height: 1.4;
      }

      .card-summary {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 0 0 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        .tag {
          padding: 0.25rem 0.6rem;
          background: var(--accent-soft);
          color: var(--accent);
          border-radius: 4px;
          font-size: 0.75rem;
          font-family: 'Fira Code', monospace;
        }
      }
    }
  `]
})
export class BlogCardComponent {
  @Input({ required: true }) post!: BlogPost;
}
