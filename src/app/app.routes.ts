import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/home/home.component').then(m => m.HomeComponent),
    title: 'Randy Molina | Full Stack Developer'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
