import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class CrudContactService {

  constructor(public fireservices:AngularFirestore) { }

  contactMsj(Get){


    return this.fireservices.collection('contact').add(Get);

  }


}
