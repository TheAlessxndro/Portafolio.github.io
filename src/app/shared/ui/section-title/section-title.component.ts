import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="section-title">
      @if (number) {
        <span class="number">{{ number }}.</span>
      }
      {{ title }}
    </h2>
  `,
  styles: [`
    .section-title {
      display: flex;
      align-items: center;
      margin-bottom: 2.5rem;
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 600;
      color: var(--text-heading);
      white-space: nowrap;

      &::after {
        content: '';
        display: block;
        width: 300px;
        max-width: 100%;
        height: 1px;
        background-color: var(--text-secondary);
        margin-left: 1.25rem;
        opacity: 0.5;
      }

      .number {
        color: var(--accent);
        margin-right: 0.625rem;
        font-family: 'Fira Code', monospace;
        font-size: clamp(1.25rem, 3vw, 1.5rem);
        font-weight: 400;
      }
    }

    @media (max-width: 768px) {
      .section-title::after {
        width: 100px;
      }
    }
  `]
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input() number?: string;
}
