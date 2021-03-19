import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminCrudService {

  db = firebase.firestore();

  constructor() { }

  async updateUser(user){
    try{
    await this.db.collection('users').doc(user.id).update({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    })
    } catch(err) {
      console.log(err);
    }
  }
}
