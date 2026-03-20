import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFacade } from '../../../application/profile/profile.facade';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="social-links">
          @for (link of socialLinks(); track link.platform) {
            <a
              [href]="link.url"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="link.label"
            >
              <i [class]="link.icon"></i>
            </a>
          }
        </div>
        <p class="credit">
          Diseñado & Construido por {{ name() }}
        </p>
        <p class="tech">
          Hecho con Angular + DDD
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-secondary);
      padding: 2rem 0;
      text-align: center;

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      .social-links {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1rem;

        a {
          color: var(--text-secondary);
          font-size: 1.5rem;
          transition: all 0.3s ease-in-out;

          &:hover {
            color: var(--accent);
            transform: translateY(-3px);
          }
        }
      }

      .credit {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
      }

      .tech {
        color: var(--text-secondary);
        font-size: 0.8rem;
        font-family: 'Fira Code', monospace;
        opacity: 0.7;
        margin: 0;
      }
    }
  `]
})
export class FooterComponent {
  private readonly profileFacade = inject(ProfileFacade);

  readonly name = this.profileFacade.name;
  readonly socialLinks = this.profileFacade.socialLinks;
}
