import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/client/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { User } from './models/user'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VehiclePageComponent } from './pages/vehicle-page/vehicle-page.component';
import { AppointmentsComponent } from './pages/client/appointments/appointments.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'admin', component: UserPageComponent },
  { path: 'user/vehicles', component: VehiclePageComponent },
  { path: 'user/calls', component: AppointmentsComponent },
  // { path: 'user', component: UserPageComponent },
  { path: 'user',  component: ProfilePageComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
