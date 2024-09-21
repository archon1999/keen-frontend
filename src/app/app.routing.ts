import { Routes } from "@angular/router";
import { AuthGuard } from "@app/modules/pages/authentication/auth.guards";

export const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.routing'), canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule) },
  { path: '**', loadComponent: () => import('./modules/pages/miscellaneous/error/error.component').then(c => c.ErrorComponent) },
];
