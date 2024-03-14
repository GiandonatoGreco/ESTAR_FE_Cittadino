import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard, notAuthGuard } from './auth/auth.guard';
import { LandingComponent } from './auth/landing.component';
import { ChangeDoctorComponent } from './pages/change-doctor/change-doctor.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { routes as utilsRoutes } from '../utils/routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProfileComponent } from 'pages/profile/profile.component';
import { PrivateSiteComponent } from 'private-site/private-site.component';

const routes: Routes = [
  {
    path: utilsRoutes.landing.path,
    component: LandingComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: '',
    component: PrivateSiteComponent,
    canActivate: [authGuard],
    children: [
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
        component: ChangeDoctorComponent,
      },
      {
        path: `${utilsRoutes.doctors.path}/:id`,
        component: DoctorDetailsComponent,
      },
      {
        path: `${utilsRoutes.faq.path}`,
        component: FaqComponent,
      },
      {
        path: `${utilsRoutes.profile.path}`,
        component: ProfileComponent,
      },
      // TODO remove from here
      {
        path: `${utilsRoutes.homepage.path}`,
        component: HomepageComponent,
      },
      // TODO to here
      {
        path: utilsRoutes.notFound.path,
        component: NotFoundComponent,
      },
      // must be last!
      {
        path: '**',
        redirectTo: utilsRoutes.notFound.path,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
