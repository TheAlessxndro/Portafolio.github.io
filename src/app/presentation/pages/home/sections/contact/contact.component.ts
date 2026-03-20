import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFacade } from '../../../../../application/profile/profile.facade';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section id="contact" class="contact section">
      <div class="container">
        <div class="contact-content" appAnimateOnScroll>
          <p class="contact-label">04. ¿Qué sigue?</p>
          <h2 class="contact-title">Ponte en Contacto</h2>
          <p class="contact-description">
            Actualmente estoy buscando nuevas oportunidades y colaboraciones.
            Si tienes un proyecto en mente o simplemente quieres charlar sobre tecnología,
            ¡no dudes en escribirme!
          </p>
          <a [href]="emailLink()" class="btn-contact">
            Saludar
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      text-align: center;
      padding-bottom: 6rem;

      .container {
        max-width: 700px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .contact-content {
        padding: 2rem 0;
      }

      .contact-label {
        color: var(--accent);
        font-family: 'Fira Code', monospace;
        font-size: 1rem;
        margin-bottom: 1rem;
      }

      .contact-title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 600;
        color: var(--text-heading);
        margin: 0 0 1.5rem;
      }

      .contact-description {
        color: var(--text-secondary);
        font-size: 1.1rem;
        line-height: 1.7;
        max-width: 600px;
        margin: 0 auto 2.5rem;
      }

      .btn-contact {
        display: inline-block;
        padding: 1.25rem 2.5rem;
        border: 1px solid var(--accent);
        color: var(--accent);
        text-decoration: none;
        border-radius: 4px;
        font-size: 1.1rem;
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
          box-shadow: 0 0 25px var(--accent-glow);

          &::before {
            width: 100%;
          }
        }
      }
    }
  `]
})
export class ContactComponent {
  private readonly profileFacade = inject(ProfileFacade);

  readonly email = this.profileFacade.email;

  emailLink(): string {
    return this.email().mailtoLink;
  }
}
