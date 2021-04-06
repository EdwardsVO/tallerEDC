import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userRole: string;
  userName: string;
  clientNav: boolean;
  adminNav: boolean;
  mechNav: boolean;
  managerNav: boolean;

  @ViewChild('drawer') drawer: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor( private _afs: AngularFirestore, private _authService: AuthService, private _router: Router,private breakpointObserver: BreakpointObserver) { }

  closeSideNav() {
    if (this.drawer._mode=='over') {
      this.drawer.close();
    }
  }

  ngOnInit(): void {
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

  
  logOut():void{
    this._authService.logOut().then(
      ()=>{
        this._router.navigate[''];
      })
  }


}

