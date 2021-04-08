import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoginComponent} from 'src/app/components/login/login.component'
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from "src/app/services/crud.service";




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authForm: FormGroup;
  email: string;
  id: string;
  role: string = 'client';
  moneySpent: string;
  carsRepaired: number;
  date: string;



  constructor(private _fb: FormBuilder ,private _authService: AuthService, private _db: CrudService, private _firestore: AngularFirestore, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.createRegistrationForm();

  }

  createRegistrationForm(): void {
    this.authForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  formatDate(){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toDateString()
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
          this.date = this.formatDate(),
          )
    this._router.navigate(['/profile']);

    })
    }catch(err) {
      console.log(err);
    }
    this._router.navigate(['/profile']);
  }
}
