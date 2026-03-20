import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsFacade } from '../../../../../application/skills/skills.facade';
import { SectionTitleComponent } from '../../../../../shared/ui/section-title/section-title.component';
import { SkillCardComponent } from '../../../../components/skill-card/skill-card.component';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, SkillCardComponent, AnimateOnScrollDirective],
  template: `
    <section id="skills" class="skills section">
      <div class="container">
        <app-section-title title="Mis Habilidades" number="02" appAnimateOnScroll />

        <div class="skills-grid">
          @for (skill of skills(); track skill.id; let i = $index) {
            <div appAnimateOnScroll [delay]="i * 100">
              <app-skill-card [skill]="skill" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills {
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .skills-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
    }

    @media (max-width: 992px) {
      .skills .skills-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .skills .skills-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SkillsComponent {
  private readonly skillsFacade = inject(SkillsFacade);

  readonly skills = this.skillsFacade.skills;
}
