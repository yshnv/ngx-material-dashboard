import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./splash/splash.module').then((x) => x.SplashModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((x) => x.PagesModule),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (x) => x.PageNotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
