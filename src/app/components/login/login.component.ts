import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import firebase from 'firebase'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { CrudService } from 'src/app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  name: string;
  email: string;
  id: string;
  phone: string = '';
  role: string = 'client';
  closeResult = '';



  constructor(private _fb: FormBuilder, private _router: Router,private modalService: NgbModal ,private _authService: AuthService, private _db: CrudService) {
   }
   
   

  ngOnInit(): void {
  this.createAuthForm();
  this.createRegistrationForm();
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

      this._authService.getCurrentUser().subscribe(
        user => {

          this.id = user.uid;
          this.name = user.displayName;
          this.email = user.email;
          this.phone = user.phoneNumber;
          this.role

          this._db.newUser(
            this.id, 
            this.name, 
            this.email, 
            this.phone, 
            this.role)
        }
      )

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



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  createRegistrationForm(): void {
    this.authForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required] 
    })
  }

  async handleRegistration(): Promise<void> {
    try{
      await this._authService.registerNewUser(this.authForm.get('email').value, this.authForm.get('password').value)
      this._authService.getCurrentUser().subscribe( res => {
        this.id = res.uid
        this._db.newUser(
        this.id,
        this.authForm.get('name').value, 
        this.authForm.get('email').value,
        this.authForm.get('phone').value,
        this.role,
      )
    })
    }catch(err) {
      console.log(err);
      console.log(this.authForm.get('email'));
    }
  }
}


