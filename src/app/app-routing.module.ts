import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { adminGuard, authGuard, notAuthGuard } from './auth/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { MapComponent } from './pages/map/map.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { routes as utilsRoutes } from '../utils/routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${utilsRoutes.dashboard.path}`,
  },
  {
    path: `${utilsRoutes.dashboard.path}`,
    component: DashboardComponent,
  },
  {
    path: `${utilsRoutes.documents.path}`,
    component: DocumentsComponent,
  },
  {
    path: `${utilsRoutes.doctors.path}`,
    component: MapComponent,
    canActivate: [authGuard],
  },
  {
    path: `${utilsRoutes.doctors.path}/:id`,
    component: DoctorDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: `${utilsRoutes.faq.path}`,
    component: FaqComponent,
  },
  // TODO remove from here
  {
    path: `${utilsRoutes.homepage.path}`,
    component: HomepageComponent,
  },
  // TODO to here
  {
    path: '404',
    component: NotFoundComponent,
  },
  // must be last!
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
