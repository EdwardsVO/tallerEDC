import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  name: string ='sebas';
  id: string;

  constructor(private _fb: FormBuilder ,private _authService: AuthService, private _db: CrudService) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.authForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async handleRegistration(): Promise<void> {
    try{
      await this._authService.registerNewUser(this.authForm.get('email').value, this.authForm.get('password').value)
      this._db.writeUserData(this.name, this.authForm.get('email').value)
    }
    catch(err) {
      console.log(err);
      console.log(this.authForm.get('email'));
      
    }
  }

}
