import { Component, OnInit } from '@angular/core';
import {CrudContactService} from './services/crud-contact.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';



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

  

  constructor(crudcontactservice:CrudContactService){}


   

  ngOnInit(): void {
  }

  

  

}
