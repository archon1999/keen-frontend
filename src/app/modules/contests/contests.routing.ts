import { Route } from '@angular/router';
import { ContestsComponent } from "@app/modules/contests/contests.component";

export default [
  {
    path: 'contests',
    component: ContestsComponent,
    title: 'Contests',
    // canActivate: [AuthGuard],
  },
] satisfies Route[];
