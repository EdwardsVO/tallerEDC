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
import { OrdersPageComponent } from './pages/manager/orders-page/orders-page.component';
import { ReportsPageComponent } from './pages/manager/reports-page/reports-page.component';
import { AdminGuard } from './guards/admin.guard';
import { Error404Component } from './pages/error404/error404.component';


const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'admin', component: UserPageComponent, canActivate: [AdminGuard]},
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'manager',  component: AppointmentsManagerComponent},
  { path: 'manager/orders',  component: OrdersPageComponent},
  { path: 'manager/reports',  component: ReportsPageComponent},
  { path: 'user/vehicles/register', component: VehicleRegisterComponent, canActivate: [UserGuard] },
  { path: 'user/vehicles', component: VehiclePageComponent, canActivate: [UserGuard] },
  { path: 'user/appointments', component: AppointmentsComponent, canActivate: [UserGuard] },
  { path: 'user',  component: ProfilePageComponent, canActivate: [UserGuard] },
  { path: 'error404', component: Error404Component },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
