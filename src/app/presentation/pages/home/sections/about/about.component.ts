import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFacade } from '../../../../../application/profile/profile.facade';
import { SectionTitleComponent } from '../../../../../shared/ui/section-title/section-title.component';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, AnimateOnScrollDirective],
  template: `
    <section id="about" class="about section">
      <div class="container">
        <app-section-title title="Sobre Mí" number="01" appAnimateOnScroll />

        <div class="about-content">
          <div class="about-text" appAnimateOnScroll [delay]="100">
            <p>
              Soy un desarrollador de software apasionado con un fuerte enfoque en
              <strong>PHP</strong> y el desarrollo web. A lo largo de mi carrera, he tenido
              la oportunidad de trabajar en diversos proyectos con diferentes clientes,
              construyendo una variedad de sistemas a la medida que resuelven problemas reales.
            </p>
            <p>
              Mi interés principal radica en crear soluciones eficientes y bien estructuradas,
              desde el backend hasta la interfaz de usuario. Disfruto enfrentando nuevos desafíos
              y aprendiendo tecnologías que me permitan mejorar la calidad de mis entregas.
            </p>
            <p>Aquí hay algunas tecnologías con las que he estado trabajando recientemente:</p>

            <ul class="tech-list">
              @for (tech of recentTechnologies(); track tech) {
                <li>{{ tech }}</li>
              }
            </ul>
          </div>

          <div class="about-image" appAnimateOnScroll [delay]="200">
            <img
              src="https://media.tenor.com/Bpbu2-YNL6cAAAAM/hacker-pupper-dog.gif"
              alt="Coding GIF"
              class="gif"
            />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .about-content {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 3rem;
        align-items: start;
      }

      .about-text {
        p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 1rem;

          strong {
            color: var(--text-heading);
          }
        }
      }

      .tech-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(140px, 200px));
        gap: 0.5rem 1rem;
        margin-top: 1.5rem;
        padding: 0;
        list-style: none;

        li {
          position: relative;
          padding-left: 1.25rem;
          color: var(--text-secondary);
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;

          &::before {
            content: '▹';
            position: absolute;
            left: 0;
            color: var(--accent);
          }
        }
      }

      .about-image {
        display: flex;
        justify-content: center;

        .gif {
          max-width: 280px;
          border-radius: 8px;
          filter: grayscale(100%);
          transition: filter 0.3s ease-in-out;

          &:hover {
            filter: none;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .about {
        .about-content {
          grid-template-columns: 1fr;
        }

        .about-image {
          order: -1;
          margin-bottom: 1rem;

          .gif {
            max-width: 200px;
          }
        }

        .tech-list {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  `]
})
export class AboutComponent {
  private readonly profileFacade = inject(ProfileFacade);

  readonly recentTechnologies = this.profileFacade.recentTechnologies;
}
