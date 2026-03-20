import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioFacade } from '../../../../../application/portfolio/portfolio.facade';
import { SectionTitleComponent } from '../../../../../shared/ui/section-title/section-title.component';
import { ProjectCardComponent } from '../../../../components/project-card/project-card.component';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    SectionTitleComponent,
    ProjectCardComponent,
    AnimateOnScrollDirective
  ],
  template: `
    <section id="portfolio" class="portfolio section">
      <div class="container">
        <app-section-title title="Cosas que he construido" number="03" appAnimateOnScroll />

        <div class="projects-grid">
          @for (project of projects(); track project.id; let i = $index) {
            <div appAnimateOnScroll [delay]="(i + 1) * 100">
              <app-project-card [project]="project" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio {
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
    }

    @media (max-width: 992px) {
      .portfolio .projects-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .portfolio .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PortfolioComponent {
  private readonly portfolioFacade = inject(PortfolioFacade);

  readonly projects = this.portfolioFacade.projects;
}
