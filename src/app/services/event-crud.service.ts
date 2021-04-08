import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EventCrudService {

  

  constructor(public fireservices:AngularFirestore, private firestore: AngularFirestore) { }

  newEvent(id, title, start){
    this.firestore.collection('events').add({
        id: id,
        title: title,
        start: start,
    })

  }

  


}