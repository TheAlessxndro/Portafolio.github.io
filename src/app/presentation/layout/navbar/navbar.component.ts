import { Component, inject, signal, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileFacade } from '../../../application/profile/profile.facade';
import { ThemeFacade } from '../../../application/theme/theme.facade';

interface NavItem {
  number: string;
  label: string;
  href: string;
  isRoute?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="container">
        <a routerLink="/" class="brand">{{ initials() }}</a>

        <button
          class="menu-toggle"
          [class.active]="isMobileMenuOpen()"
          (click)="toggleMobileMenu()"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="nav-menu" [class.open]="isMobileMenuOpen()">
          <ul class="nav-links">
            @for (item of navItems; track item.href) {
              <li>
                @if (item.isRoute) {
                  <a
                    [routerLink]="item.href"
                    routerLinkActive="active"
                    class="nav-link"
                    (click)="closeMobileMenu()"
                  >
                    <span class="number">{{ item.number }}.</span>
                    {{ item.label }}
                  </a>
                } @else {
                  <a
                    [href]="item.href"
                    class="nav-link"
                    (click)="onAnchorClick($event, item.href)"
                  >
                    <span class="number">{{ item.number }}.</span>
                    {{ item.label }}
                  </a>
                }
              </li>
            }
          </ul>

          <div class="nav-actions">
            <button
              class="theme-toggle"
              (click)="toggleTheme()"
              [attr.aria-label]="themeFacade.toggleLabel()"
            >
              <i [class]="themeFacade.toggleIcon()"></i>
            </button>

            <a
              [href]="cvUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-resume"
            >
              Descargar CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 300;
      padding: 1rem 2rem;
      background: var(--navbar-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: all 0.3s ease-in-out;

      &.scrolled {
        padding: 0.5rem 2rem;
        box-shadow: var(--navbar-shadow);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .brand {
        color: var(--accent);
        font-weight: 700;
        font-size: 1.5rem;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: var(--accent-hover);
        }
      }

      .menu-toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 28px;
        height: 20px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 10;

        span {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--accent);
          transition: all 0.3s ease-in-out;
        }

        &.active {
          span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          span:nth-child(2) {
            opacity: 0;
          }
          span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
          }
        }
      }

      .nav-menu {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .nav-links {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 0.5rem;
      }

      .nav-link {
        color: var(--text-primary);
        text-decoration: none;
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        transition: color 0.3s;
        position: relative;

        .number {
          color: var(--accent);
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          margin-right: 0.25rem;
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: all 0.3s ease-in-out;
          transform: translateX(-50%);
        }

        &:hover, &.active {
          color: var(--accent);

          &::after {
            width: 80%;
          }
        }
      }

      .nav-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .theme-toggle {
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: all 0.3s ease-in-out;
        border-radius: 50%;

        &:hover {
          color: var(--accent);
          background: var(--accent-soft);
        }
      }

      .btn-resume {
        padding: 0.5rem 1rem;
        border: 1px solid var(--accent);
        color: var(--accent);
        text-decoration: none;
        border-radius: 4px;
        font-size: 0.9rem;
        transition: all 0.3s ease-in-out;

        &:hover {
          background: var(--accent-soft);
          box-shadow: 0 0 10px var(--accent-glow);
        }
      }
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;

        .menu-toggle {
          display: flex;
        }

        .nav-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 75%;
          max-width: 300px;
          height: 100vh;
          background: var(--bg-secondary);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: right 0.3s ease-in-out;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);

          &.open {
            right: 0;
          }
        }

        .nav-links {
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }

        .nav-link {
          font-size: 1.1rem;
          padding: 0.75rem 1rem;
        }

        .nav-actions {
          margin-top: 2rem;
          flex-direction: column;
        }
      }
    }
  `]
})
export class NavbarComponent {
  private readonly profileFacade = inject(ProfileFacade);
  readonly themeFacade = inject(ThemeFacade);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isScrolled = signal(false);
  readonly isMobileMenuOpen = signal(false);

  readonly initials = this.profileFacade.initials;
  readonly cvUrl = this.profileFacade.cvUrl;

  readonly navItems: NavItem[] = [
    { number: '01', label: 'Sobre Mí', href: '#about' },
    { number: '02', label: 'Skills', href: '#skills' },
    { number: '03', label: 'Portafolio', href: '#portfolio' },
    { number: '04', label: 'Contacto', href: '#contact' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeFacade.toggle();
  }

  onAnchorClick(event: Event, href: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (href.startsWith('#')) {
      event.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      this.closeMobileMenu();
    }
  }
}
