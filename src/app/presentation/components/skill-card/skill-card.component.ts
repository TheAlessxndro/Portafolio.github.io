import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../domain/skills/entities/skill.entity';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skill-card">
      <div class="skill-icon">
        <i [class]="skill.icon"></i>
      </div>
      <h3 class="skill-title">{{ skill.category }}</h3>
      <div class="skill-items">
        @for (item of skill.items; track item) {
          <span class="skill-tag">{{ item }}</span>
        }
      </div>
    </div>
  `,
  styles: [`
    .skill-card {
      background: var(--bg-secondary);
      padding: 2rem;
      border-radius: 4px;
      height: 100%;
      transition: all 0.3s ease-in-out;
      border: 1px solid transparent;

      &:hover {
        transform: translateY(-8px);
        border-color: var(--accent);
        box-shadow: 0 10px 30px -15px var(--shadow-color),
                    0 0 15px var(--accent-soft);
      }

      .skill-icon {
        font-size: 2.5rem;
        color: var(--accent);
        margin-bottom: 1rem;
      }

      .skill-title {
        color: var(--text-heading);
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }

      .skill-items {
        display: flex;
        flex-wrap: wrap;
        gap: 0.625rem;
      }

      .skill-tag {
        display: inline-block;
        padding: 0.35rem 0.75rem;
        background: var(--accent-soft);
        color: var(--accent);
        border-radius: 4px;
        font-size: 0.85rem;
        font-family: 'Fira Code', monospace;
        transition: all 0.3s ease-in-out;

        &:hover {
          background: rgba(100, 255, 218, 0.2);
          transform: translateY(-2px);
        }
      }
    }
  `]
})
export class SkillCardComponent {
  @Input({ required: true }) skill!: Skill;
}
