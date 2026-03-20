import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="tag"
      [class.active]="active"
      [class.clickable]="clickable"
      (click)="handleClick()"
    >
      {{ label }}
    </span>
  `,
  styles: [`
    .tag {
      display: inline-block;
      padding: 0.3rem 0.75rem;
      background: var(--accent-soft);
      color: var(--accent);
      border-radius: 4px;
      font-size: 0.85rem;
      font-family: 'Fira Code', monospace;
      transition: all 0.3s ease-in-out;

      &.clickable {
        cursor: pointer;

        &:hover {
          background: rgba(100, 255, 218, 0.2);
          transform: translateY(-2px);
        }
      }

      &.active {
        background: var(--accent);
        color: var(--bg-primary);
      }
    }
  `]
})
export class TagComponent {
  @Input({ required: true }) label!: string;
  @Input() active = false;
  @Input() clickable = false;

  @Output() tagClick = new EventEmitter<string>();

  handleClick(): void {
    if (this.clickable) {
      this.tagClick.emit(this.label);
    }
  }
}
