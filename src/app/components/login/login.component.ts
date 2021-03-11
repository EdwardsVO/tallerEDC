import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import firebase from 'firebase'
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() sendFormEvent = new EventEmitter;
  authForm: FormGroup 
  user: firebase.User;


  constructor(private _fb: FormBuilder, private authService: AuthService, private _router: Router) {
    this.authForm = this.authForm = this._fb.group({
      displayName: '',
      email: '',
      password: ''
    })
   }
  ngOnInit(): void {
  this.createAuthForm();
  }
  
  createAuthForm(): void {
    this.authForm = this._fb.group({
      displayName: '',
      email: '',
      password: ''
    })
  }
  
  handleGoogleLogin():void {
    this.authService.loginWithGoogle();
    let user = this.authService.getCurrentUser().subscribe(
      user => {
        this.user = user;
        this._router.navigate(['/user:'+user.uid])
      }
    )
  }
}
