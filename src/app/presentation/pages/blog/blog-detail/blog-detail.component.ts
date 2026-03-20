import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogFacade } from '../../../../application/blog/blog.facade';
import { BlogPost } from '../../../../domain/blog/entities/blog-post.entity';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AnimateOnScrollDirective],
  template: `
    @if (post()) {
      <article class="blog-detail">
        <div class="container">
          <header class="article-header" appAnimateOnScroll>
            <a routerLink="/blog" class="back-link">
              <i class="fas fa-arrow-left"></i>
              Volver al blog
            </a>

            <div class="article-meta">
              <span class="date">{{ post()!.formattedDate }}</span>
              <span class="separator">•</span>
              <span class="reading-time">{{ post()!.readingTimeText }}</span>
            </div>

            <h1 class="article-title">{{ post()!.title }}</h1>

            <div class="article-tags">
              @for (tag of post()!.tags; track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </div>
          </header>

          <div class="article-cover" appAnimateOnScroll [delay]="100">
            <img [src]="post()!.coverImage" [alt]="post()!.title" />
          </div>

          <div class="article-content" appAnimateOnScroll [delay]="200">
            <div class="content-body" [innerHTML]="formattedContent()"></div>
          </div>

          <footer class="article-footer" appAnimateOnScroll [delay]="300">
            <a routerLink="/blog" class="btn-back">
              <i class="fas fa-arrow-left"></i>
              Ver más artículos
            </a>
          </footer>
        </div>
      </article>
    } @else {
      <div class="not-found">
        <div class="container">
          <h1>Artículo no encontrado</h1>
          <p>El artículo que buscas no existe.</p>
          <a routerLink="/blog" class="btn-back">
            <i class="fas fa-arrow-left"></i>
            Volver al blog
          </a>
        </div>
      </div>
    }
  `,
  styles: [`
    .blog-detail {
      min-height: 100vh;
      padding: 7rem 0 4rem;

      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .article-header {
        margin-bottom: 2rem;

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent);
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease-in-out;

          &:hover {
            transform: translateX(-5px);
          }
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-family: 'Fira Code', monospace;

          .separator {
            color: var(--accent);
          }
        }

        .article-title {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 700;
          color: var(--text-heading);
          line-height: 1.3;
          margin: 0 0 1.5rem;
        }

        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .tag {
            padding: 0.35rem 0.75rem;
            background: var(--accent-soft);
            color: var(--accent);
            border-radius: 4px;
            font-size: 0.85rem;
            font-family: 'Fira Code', monospace;
          }
        }
      }

      .article-cover {
        margin-bottom: 2.5rem;
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
          height: auto;
          display: block;
        }
      }

      .article-content {
        .content-body {
          color: var(--text-primary);
          font-size: 1.1rem;
          line-height: 1.8;

          h2 {
            font-size: 1.5rem;
            color: var(--text-heading);
            margin: 2.5rem 0 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
          }

          h3 {
            font-size: 1.25rem;
            color: var(--text-heading);
            margin: 2rem 0 0.75rem;
          }

          p {
            margin-bottom: 1.25rem;
            color: var(--text-secondary);
          }

          strong {
            color: var(--text-heading);
          }

          ul, ol {
            margin: 1rem 0 1.5rem 1.5rem;
            padding: 0;

            li {
              margin-bottom: 0.5rem;
              color: var(--text-secondary);

              &::marker {
                color: var(--accent);
              }
            }
          }

          ul li {
            list-style-type: disc;
          }

          ol li {
            list-style-type: decimal;
          }

          code {
            background: var(--code-bg);
            padding: 0.2em 0.4em;
            border-radius: 4px;
            font-size: 0.9em;
            color: var(--accent);
            font-family: 'Fira Code', monospace;
          }

          pre {
            background: var(--code-bg);
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1.5rem 0;

            code {
              background: none;
              padding: 0;
              font-size: 0.9rem;
            }
          }
        }
      }

      .article-footer {
        margin-top: 4rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
        text-align: center;
      }

      .btn-back {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: 1px solid var(--accent);
        color: var(--accent);
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.3s ease-in-out;

        &:hover {
          background: var(--accent-soft);
          box-shadow: 0 0 15px var(--accent-glow);
        }
      }
    }

    .not-found {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      .container {
        padding: 2rem;
      }

      h1 {
        font-size: 2rem;
        color: var(--text-heading);
        margin-bottom: 1rem;
      }

      p {
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .btn-back {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: 1px solid var(--accent);
        color: var(--accent);
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.3s ease-in-out;

        &:hover {
          background: var(--accent-soft);
        }
      }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly blogFacade = inject(BlogFacade);

  readonly post = signal<BlogPost | undefined>(undefined);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.post.set(this.blogFacade.getPostBySlug(slug));
    }
  }

  formattedContent(): string {
    const content = this.post()?.content || '';
    return this.markdownToHtml(content);
  }

  private markdownToHtml(markdown: string): string {
    return markdown
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)+/gs, '<ul>$&</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[hulo])(.+)$/gm, '<p>$1</p>')
      .replace(/<p><\/p>/g, '');
  }
}
