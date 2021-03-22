import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
  providers:[AuthService],
})
export class EmailConfirmationComponent implements OnInit {
 
  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {}

  


}
