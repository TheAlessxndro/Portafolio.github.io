import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProfileFacade } from '../../../../../application/profile/profile.facade';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <p class="hero-greeting">Hola, mi nombre es</p>
            <h1 class="hero-name">{{ name() }}.</h1>
            <h2 class="hero-subtitle">{{ subtitle() }}</h2>
            <p class="hero-description">{{ description() }}</p>
            <a href="#portfolio" class="btn-cta" (click)="scrollToPortfolio($event)">
              Ver mis proyectos
            </a>
          </div>

          <div class="hero-image">
            <div class="image-wrapper">
              <img [src]="profileImage()" [alt]="name()" />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 6rem 0 4rem;

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .hero-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
      }

      .hero-greeting {
        color: var(--accent);
        font-size: 1.1rem;
        font-family: 'Fira Code', monospace;
        margin-bottom: 1rem;
      }

      .hero-name {
        font-size: clamp(2.5rem, 8vw, 4.5rem);
        font-weight: 800;
        color: var(--text-heading);
        line-height: 1.1;
        margin: 0 0 0.5rem;
      }

      .hero-subtitle {
        font-size: clamp(1.5rem, 5vw, 3rem);
        font-weight: 600;
        color: var(--text-secondary);
        line-height: 1.2;
        margin: 0 0 1.5rem;
      }

      .hero-description {
        font-size: 1.15rem;
        color: var(--text-secondary);
        max-width: 540px;
        line-height: 1.7;
        margin-bottom: 2rem;
      }

      .btn-cta {
        display: inline-block;
        padding: 1rem 2rem;
        border: 1px solid var(--accent);
        color: var(--accent);
        text-decoration: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        transition: all 0.3s ease-in-out;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: var(--accent-soft);
          transition: width 0.3s ease-in-out;
          z-index: -1;
        }

        &:hover {
          box-shadow: 0 0 20px var(--accent-glow);

          &::before {
            width: 100%;
          }
        }
      }

      .hero-image {
        display: flex;
        justify-content: center;

        .image-wrapper {
          position: relative;
          max-width: 320px;

          &::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            width: 100%;
            height: 100%;
            border: 2px solid var(--accent);
            border-radius: 8px;
            z-index: -1;
            transition: all 0.3s ease-in-out;
          }

          &:hover::before {
            top: 15px;
            left: 15px;
          }

          img {
            width: 100%;
            border-radius: 8px;
            filter: grayscale(100%) contrast(1);
            transition: all 0.3s ease-in-out;
            border: 2px solid var(--accent);

            &:hover {
              filter: none;
              box-shadow: 0 0 25px var(--accent-glow);
            }
          }
        }
      }
    }

    @media (max-width: 992px) {
      .hero {
        .hero-content {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .hero-description {
          margin-left: auto;
          margin-right: auto;
        }

        .hero-image {
          order: -1;
          margin-bottom: 2rem;

          .image-wrapper {
            max-width: 250px;
          }
        }
      }
    }

    @media (max-width: 576px) {
      .hero {
        padding: 5rem 0 3rem;
      }
    }
  `]
})
export class HeroComponent {
  private readonly profileFacade = inject(ProfileFacade);
  private readonly platformId = inject(PLATFORM_ID);

  readonly name = this.profileFacade.name;
  readonly subtitle = this.profileFacade.subtitle;
  readonly description = this.profileFacade.description;
  readonly profileImage = this.profileFacade.profileImage;

  scrollToPortfolio(event: Event): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector('#portfolio');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
