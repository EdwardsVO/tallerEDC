import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLog: firebase.User = null;

  constructor(private _authService: AuthService, private _router: Router) { }


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

