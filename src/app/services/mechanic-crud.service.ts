import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MechanicCrudService {

  constructor(private _firestore: AngularFirestore) { }

  confirmWork(appointmentId, mechName){
    this._firestore.collection('appointments').doc(appointmentId).update({
      mechName: mechName,
    })
  }

}
