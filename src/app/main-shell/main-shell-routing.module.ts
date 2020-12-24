import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalComponent } from './legal/legal.component';
import { AuthGuard } from '../guards/auth.guard';
import { MainShellComponent } from './main-shell/main-shell.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    component: MainShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create/create.module').then((m) => m.CreateModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'post-detail',
        loadChildren: () =>
          import('./post-detail/post-detail.module').then(
            (m) => m.PostDetailModule
          ),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'terms',
        component: TermsComponent,
      },
      {
        path: 'legal',
        component: LegalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainShellRoutingModule {}
