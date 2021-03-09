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
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { TestimoniosComponent } from './components/testimonios/testimonios.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/client/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LandingPageComponent,
    CarouselComponent,
    NosotrosComponent,
    TestimoniosComponent,
    LocationComponent,
    LoginComponent,
    LoginPageComponent

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
