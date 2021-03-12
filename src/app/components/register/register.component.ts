import { Component, OnInit } from '@angular/core';
import {LoginComponent} from 'src/app/components/login/login.component'
import { CrudService } from "src/app/services/crud.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  CrudService: CrudService;
  LoginComponent: LoginComponent;

  constructor() { }

  ngOnInit(): void {
  }

  // userToDB() {
  //   let id = this.LoginComponent.prueba;
  //   this.CrudService.postRequest(id);
  //   console.log('Se creo el usuario: '+id);
  // }

}
