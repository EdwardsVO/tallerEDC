import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {
  userLog: firebase.User = null;
  useRole: string;
  userRole: string;
  userName: string;
  clientNav: boolean;
  adminNav: boolean;
  mechNav: boolean;
  managerNav: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _authService: AuthService, private _router: Router, private _afs: AngularFirestore) {}

  ngOnInit(): void {
    this._authService.getCurrentUser().subscribe( 
      user => {
        this.userLog = user;
      }
      )

      this._authService.getCurrentUser().subscribe( x => {
        this._afs.collection('users').doc(x.uid).snapshotChanges().subscribe( x =>{
          this.userRole = x.payload.get('role');
          if(this.userRole === 'client'){
            this.clientNav = true;
          }
          if(this.userRole === 'admin'){
            this.adminNav = true;
          }
          if(this.userRole === 'mechanic'){
            this.mechNav = true;
          }
          if(this.userRole === 'manager'){
            this.managerNav = true;
          }
          this.userName = x.payload.get('name');
        })
      })
  }


  toHome(){
    document.getElementById("inicio").scrollIntoView({block: 'end',behavior:"smooth"});
  }
  toAbout(){
    document.getElementById("about").scrollIntoView({block: 'end',behavior:"smooth"});

  }
  toLocation(){
    document.getElementById("location").scrollIntoView({block: 'center',behavior:"smooth"});

  }
  toContact(){
    document.getElementById("contact").scrollIntoView({block: 'center',behavior:"smooth"});

  }

  logOut():void{
    this._authService.logOut().then(
      ()=>{
        this._router.navigate[''];
      })
  }
}
