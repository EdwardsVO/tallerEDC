import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/client/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VehiclePageComponent } from './pages/vehicle-page/vehicle-page.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { VehicleRegisterComponent } from './components/vehicle-register/vehicle-register.component';
import { UserGuard } from './guards/user.guard';
import { AppointmentsManagerComponent } from './pages/manager/appointments-manager/appointments-manager.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'admin', component: UserPageComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'manager',  component: AppointmentsManagerComponent},
  { path: 'user/vehicles/register', component: VehicleRegisterComponent, canActivate: [UserGuard] },
  { path: 'user/vehicles', component: VehiclePageComponent, canActivate: [UserGuard] },
  { path: 'user/appointments', component: AppointmentsComponent, canActivate: [UserGuard] },
  { path: 'user',  component: ProfilePageComponent, canActivate: [UserGuard] },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
