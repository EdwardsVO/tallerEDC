import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AboutComponent } from './components/about/about.component';
import { TestimoniosComponent } from './components/testimonios/testimonios.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/client/login-page/login-page.component';
import { ContactComponent } from './components/contact/contact.component';
import {MatButtonModule} from '@angular/material/button';
import { AppointmentsComponent } from './pages/client/appointments/appointments.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProfileStatusComponent } from './components/profile-status/profile-status.component';
import { ProfileVehicleComponent } from './components/profile-vehicle/profile-vehicle.component';
import { VehicleRegisterComponent } from './components/vehicle-register/vehicle-register.component';
import { VehiclePageComponent } from './pages/vehicle-page/vehicle-page.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterComponent } from './components/register/register.component';
import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UsersComponent } from './components/users/users.component';
import {MatSelectModule} from '@angular/material/select';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    CarouselComponent,
    LandingPageComponent,
    ProfileComponent,
    ProfilePageComponent,
    AboutComponent,
    TestimoniosComponent,
    LocationComponent,
    LoginComponent,
    LoginPageComponent,
    AppointmentsComponent,
    ContactComponent,
    ProfileStatusComponent,
    ProfileVehicleComponent,
    VehicleRegisterComponent,
    VehiclePageComponent,
    VehiclesComponent,
    RegisterPageComponent,
    RegisterComponent,
    UserPageComponent,
    UserSearchComponent,
    UsersComponent,
    MainNavbarComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
