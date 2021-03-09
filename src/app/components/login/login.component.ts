import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() sendFormEvent = new EventEmitter;
  authForm: FormGroup 


  constructor(private _fb: FormBuilder, private authService: AuthService) {
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
  }
}
