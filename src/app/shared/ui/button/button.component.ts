import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [class]="buttonClasses"
      [disabled]="disabled"
      (click)="handleClick($event)"
    >
      @if (icon && iconPosition === 'left') {
        <i [class]="icon"></i>
      }
      <ng-content></ng-content>
      @if (icon && iconPosition === 'right') {
        <i [class]="icon"></i>
      }
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: inherit;
      font-weight: 500;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      text-decoration: none;
      outline: none;
      position: relative;
      overflow: hidden;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }

      // Sizes
      &.btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }

      &.btn-md {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }

      &.btn-lg {
        padding: 1rem 2rem;
        font-size: 1.125rem;
      }

      // Variants
      &.btn-primary {
        background: var(--accent);
        color: var(--bg-primary);
        border: none;

        &:hover:not(:disabled) {
          background: var(--accent-hover);
          box-shadow: 0 0 20px var(--accent-glow);
        }
      }

      &.btn-secondary {
        background: var(--bg-secondary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);

        &:hover:not(:disabled) {
          border-color: var(--accent);
          color: var(--accent);
        }
      }

      &.btn-outline {
        background: transparent;
        color: var(--accent);
        border: 1px solid var(--accent);

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

        &:hover:not(:disabled)::before {
          width: 100%;
        }

        &:hover:not(:disabled) {
          box-shadow: 0 0 15px var(--accent-glow);
        }
      }

      &.btn-ghost {
        background: transparent;
        color: var(--text-primary);
        border: none;

        &:hover:not(:disabled) {
          color: var(--accent);
          background: var(--accent-soft);
        }
      }
    }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'outline';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';

  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return `btn-${this.variant} btn-${this.size}`;
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
