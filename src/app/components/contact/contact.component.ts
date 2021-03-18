import { Component, OnInit } from '@angular/core';
CrudContactService
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import { CrudContactService } from 'src/app/services/crud-contact.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  

  getValues(val){
    console.warn(val)
  }
  
  contact: string;
  name: string;
  email: string;
  phone: number  ;
  mensaje: string;

  message: string;

  constructor( public crudcontactservice:CrudContactService){}

  createMsj(){

   let Get ={};
   Get ['name'] = this.name;
   Get['email'] = this.email;
   Get['phone'] = this.phone;
   Get['mensaje'] = this.mensaje;

    this.crudcontactservice.contactMsj(Get).then(res => {

      this.name = "";
      this.email = "";
      this.phone = undefined;
      this.mensaje = "";

      console.log(res);

      this.message = "Mensaje enviado!";
      alert(this.message)

    }).catch(error => {
      console.log(error);
    });

  }
   

  ngOnInit(): void {
  }

  

  

}
