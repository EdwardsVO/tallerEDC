import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import firebase from 'firebase'
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() sendFormEvent = new EventEmitter;
  authForm: FormGroup 
  user: firebase.User;
  prueba: string;


  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router, private _db: CrudService) {
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
  
  async handleGoogleLogin():Promise<void> {
    try{
      await this._authService.loginWithGoogle();
      this.startProfilePage()
    } catch(err){
      console.log(err);
    }
  }

  async handleMailLogin(): Promise<void>{
    try{
      await this._authService.loginWithEmail(this.authForm.get('email').value, this.authForm.get('password').value)
      this.startProfilePage();
    }catch(err){
      console.log(err);
    }
  }
  
  async  startProfilePage(): Promise<void>{
    try{
      this._db.readUsers();
      await this._authService.getCurrentUser().subscribe(
        user => {
          this.user = user;
          this.prueba = user.uid;
          console.log(this.prueba);
          this._router.navigate(['/user'], {queryParams: {login: 'true'}, queryParamsHandling: 'merge'
        })})
      }
    catch(err){
      console.log(err)
    } 
  }

}