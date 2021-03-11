import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {
  userLog: firebase.User = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._authService.getCurrentUser().subscribe( 
      user => {
        this.userLog = user;
      }
    )
  }

  logOut():void{
    this._authService.logOut().then(
      ()=>{
        this._router.navigate[''];
      })
  }

  toHome(){
    document.getElementById("inicio").scrollIntoView({behavior:"smooth"});
  }
  toAbout(){
    document.getElementById("about").scrollIntoView({behavior:"smooth"});

  }
  toLocation(){
    document.getElementById("location").scrollIntoView({behavior:"smooth"});

  }
  toContact(){
    document.getElementById("contact").scrollIntoView({behavior:"smooth"});

  }

}
