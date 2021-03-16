import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user';
import firebase from 'firebase';
import { UsersComponent } from '../components/users/users.component';



@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url = 'https://talleredc-8704c-default-rtdb.firebaseio.com/users';
  db = firebase.firestore();
  

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private _afs: AngularFirestore) {  
  }

  async newUser(name, email, phone, role): Promise<void>{
    try{
      await this.db.collection('users').doc(email).set({
        name: name,
        email: email,
        phone: phone,
        role: role,
        cars: {
          car1: {},
          car2: {},
          car3: {}
        }
      })
    }catch(err){
      console.log(err);
    }
  }

}
