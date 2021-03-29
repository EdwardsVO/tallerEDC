import { Component, OnInit } from '@angular/core';
CrudContactService
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import { CrudContactService } from 'src/app/services/crud-contact.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  name: string;
  email: string;
  phone: number  ;
  message: string;
  FormData: FormGroup;

  
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_nq5o7n4', 'template_k3j4hbv', e.target as HTMLFormElement,  'user_mS3TbPNqwHVFgfafqXvBr')
      .then((result: EmailJSResponseStatus) => {
        this.toastr.success('¡Mensaje enviado!', "LISTO")
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  
  
 
  

  constructor( public crudcontactservice:CrudContactService, private builder: FormBuilder, private toastr: ToastrService){}



  ngOnInit(): void {
    this.FormData = this.builder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    })
  }

  

  

}
