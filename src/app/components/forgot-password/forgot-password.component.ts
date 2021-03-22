import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AuthService]

})


export class ForgotPasswordComponent implements OnInit {

  
    userEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  


  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onReset(){
    
  
    try{
      const email = this.userEmail.value;
      this.authSvc.resetPassword(email);
      window.alert('El correo ha sido enviado');
      this.router.navigate(['/login']);
    }catch(error){
      console.log(error)
    }
  }
  


  
}

