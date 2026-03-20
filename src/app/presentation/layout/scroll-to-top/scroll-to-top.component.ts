import { Component, signal, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="scroll-to-top"
      [class.visible]="isVisible()"
      (click)="scrollToTop()"
      aria-label="Volver arriba"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  `,
  styles: [`
    .scroll-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: var(--accent);
      color: var(--bg-primary);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease-in-out;
      z-index: 200;
      box-shadow: 0 4px 15px var(--accent-glow);

      &.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      &:hover {
        background: var(--text-heading);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px var(--shadow-color);
      }

      &:active {
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .scroll-to-top {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class ScrollToTopComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isVisible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isVisible.set(window.scrollY > 300);
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
