import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tech-filter">
      <button
        class="filter-btn"
        [class.active]="!selectedTech"
        (click)="onFilterChange(null)"
      >
        Todos
      </button>

      @for (tech of technologies; track tech) {
        <button
          class="filter-btn"
          [class.active]="selectedTech === tech"
          (click)="onFilterChange(tech)"
        >
          {{ tech }}
        </button>
      }
    </div>
  `,
  styles: [`
    .tech-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2rem;

      .filter-btn {
        padding: 0.5rem 1rem;
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        &.active {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
        }
      }
    }
  `]
})
export class TechFilterComponent {
  @Input() technologies: string[] = [];
  @Input() selectedTech: string | null = null;

  @Output() filterChange = new EventEmitter<string | null>();

  onFilterChange(tech: string | null): void {
    this.filterChange.emit(tech);
  }
}
