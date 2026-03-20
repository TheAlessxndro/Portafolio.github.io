import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './presentation/layout/navbar/navbar.component';
import { FooterComponent } from './presentation/layout/footer/footer.component';
import { ScrollToTopComponent } from './presentation/layout/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent],
  template: `
    <app-navbar />
    <router-outlet />
    <app-footer />
    <app-scroll-to-top />
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class App {}
