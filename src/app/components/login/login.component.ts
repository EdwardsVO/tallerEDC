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
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';

import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  currentUser: string;
  currentRole: string;
  roleLoad: boolean = false;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private _fb: FormBuilder, private _router: Router, private modalService: NgbModal, private _authService: AuthService, private _db: CrudService, private _afs: AngularFirestore) {
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

  async handleGoogleLogin(): Promise<void> {
    try {
      await this._authService.loginWithGoogle();

      this._authService.getCurrentUser().subscribe(
        user => {

          this.id = user.uid;
          this.name = user.displayName;
          this.email = user.email;
          this.phone = user.phoneNumber;
          this.role

          this._afs.collection('users').doc(this.id).ref.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
              this._db.newUser(
                this.id,
                this.name,
                this.email,
                this.phone,
                this.role)
            }
          });
          }
      )
      this.startProfilePage()
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrentRole(): Promise<void> {
    await this._authService.getCurrentUser().subscribe(x => {
      this.currentUser = x.uid;
      this._db.saveUserRole(this.currentUser);
      this._afs.collection('users').doc(this.currentUser).snapshotChanges().subscribe(x => {
        this.currentRole = x.payload.get('role')
        this.roleLoad = true;
        this.startProfilePage();
      })
    })

  }

  async handleMailLogin(): Promise<void> {
    try {
      await this._authService.loginWithEmail(this.authForm.get('email').value, this.authForm.get('password').value)
      this.getCurrentRole();
    } catch (err) {
      console.log(err);
    }
  }

  async startProfilePage(): Promise<void> {


    try {
      await this._authService.getCurrentUser().subscribe(
        user => {
          this.user = user;
          this.prueba = user.uid;
          if (this.currentRole === 'client') {
            this._router.navigate(['/user'], { queryParams: { login: 'true' }, queryParamsHandling: 'merge' })
          }
          if (this.currentRole === 'admin') {
            this._router.navigate(['/admin'], { queryParams: { login: 'true' }, queryParamsHandling: 'merge' })
          }
          if (this.currentRole === 'mechanic') {
            this._router.navigate(['/mechanic'], { queryParams: { login: 'true' }, queryParamsHandling: 'merge' })
          }
          
          if (this.currentRole === 'manager') {
            this._router.navigate(['/manager'], { queryParams: { login: 'true' }, queryParamsHandling: 'merge' })
          }
        })
    }
    catch (err) {
      console.log(err)
    }
  }



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    try {
      await this._authService.registerNewUser(this.authForm.get('email').value, this.authForm.get('password').value)
      this._authService.getCurrentUser().subscribe(res => {
        this.id = res.uid
        this._db.newUser(
          this.id,
          this.authForm.get('name').value,
          this.authForm.get('email').value,
          this.authForm.get('phone').value,
          this.role,
        )
        this._router.navigate(['/user'], { queryParams: { login: 'true' }, queryParamsHandling: 'merge' })
        this.modalService.dismissAll()

      })
    } catch (err) {
      console.log(err);
      console.log(this.authForm.get('email'));
    }
  }
}


