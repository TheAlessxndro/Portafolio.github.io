import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../domain/portfolio/entities/project.entity';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="project-card">
      <div class="project-image">
        <img [src]="project.image" [alt]="project.title" />
      </div>

      <div class="project-content">
        <h3 class="project-title">{{ project.title }}</h3>

        <p class="project-description">{{ project.description }}</p>

        <div class="project-tech">
          @for (tech of project.technologyNames; track tech) {
            <span>{{ tech }}</span>
          }
        </div>

        @if (project.hasGithub() || project.hasLiveDemo()) {
          <div class="project-links">
            @if (project.githubUrl) {
              <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i class="fab fa-github"></i>
              </a>
            }
            @if (project.liveUrl) {
              <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                <i class="fas fa-external-link-alt"></i>
              </a>
            }
          </div>
        }
      </div>
    </article>
  `,
  styles: [`
    .project-card {
      background: var(--bg-secondary);
      border-radius: 4px;
      overflow: hidden;
      height: 100%;
      transition: all 0.3s ease-in-out;
      position: relative;

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 30px -15px var(--shadow-color);

        .project-image img {
          transform: scale(1.05);
          filter: none;
        }
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        box-shadow: 0 0 0 transparent;
        transition: box-shadow 0.3s ease-in-out;
        pointer-events: none;
      }

      &:hover::after {
        box-shadow: 0 0 20px var(--accent-soft);
      }

      .project-image {
        height: 200px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease-in-out;
          filter: grayscale(100%);
        }
      }

      .project-content {
        padding: 1.5rem;
      }

      .project-title {
        color: var(--text-heading);
        font-size: 1.25rem;
        margin: 0 0 0.75rem;
      }

      .project-description {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 0 0 1rem;
      }

      .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;

        span {
          color: var(--text-secondary);
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
        }
      }

      .project-links {
        display: flex;
        gap: 1rem;

        a {
          color: var(--text-primary);
          font-size: 1.25rem;
          transition: all 0.3s ease-in-out;

          &:hover {
            color: var(--accent);
            transform: translateY(-2px);
          }
        }
      }
    }
  `]
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
