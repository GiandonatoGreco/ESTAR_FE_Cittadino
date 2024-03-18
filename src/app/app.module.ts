import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
// DAK
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesignAngularKitModule } from 'design-angular-kit';
//directives
import { HighlightDirective } from './directives/highlight.directive';
// components
import { AppComponent } from './app.component';
import { BtnComponent } from './components/btn/btn.component';
import { ChipComponent } from './components/chip/chip.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ChangeDoctorComponent } from './pages/change-doctor/change-doctor.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CustomAutocompleteComponent } from './components/custom-autocomplete/custom-autocomplete.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { CustomMapComponent } from './components/custom-map/custom-map.component';
import { TableComponent } from './components/tables/table/table.component';

// modals
import ModalNotificationComponent from './components/modals/modal-notification/modal-notification.component';
import { ModalConfirmComponent } from './components/modals/modal-confirm/modal-confirm.component';
import { FooterComponent } from './components/footer/footer.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { FaqComponent } from './pages/faq/faq.component';
import { IconComponent } from './components/icon/icon.component';
import { AllIconsComponent } from './components/all-icons/all-icons.component';
//leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { TableDoctorsComponent } from './components/tables/table-doctors/table-doctors.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ModalProfileComponent } from './components/modals/modal-profile/modal-profile.component';


@NgModule({
  // components & directives
  declarations: [
    AppComponent,
    BtnComponent,
    ChipComponent,
    HighlightDirective,
    HeaderComponent,
    NotFoundComponent,
    AuthComponent,
    ChangeDoctorComponent,
    DoctorDetailsComponent,
    HomepageComponent,
    CustomAutocompleteComponent,
    AccordionComponent,
    CustomMapComponent,
    TableComponent,
    ModalNotificationComponent,
    ModalConfirmComponent,
    FooterComponent,
    BarChartComponent,
    PieChartComponent,
    PaginationComponent,
    LoaderComponent,
    DashboardComponent,
    DocumentsComponent,
    FaqComponent,
    IconComponent,
    AllIconsComponent,
    TableDoctorsComponent,
    ProfileComponent,
    ModalProfileComponent,
  ],
  // modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Necessario per il funzionamento della libreria
    BrowserAnimationsModule, // Necessario per il funzionamento della libreria
    DesignAngularKitModule.forRoot(),
    FormsModule,
    NgxChartsModule,
    LeafletModule,
    LeafletMarkerClusterModule,
  ],
  // services
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
