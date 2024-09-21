import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.routing') },
  { path: '', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule) },
  { path: '**', loadComponent: () => import('./modules/pages/miscellaneous/error/error.component').then(c => c.ErrorComponent) },
];
