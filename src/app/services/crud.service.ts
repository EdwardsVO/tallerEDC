import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user';
import firebase from 'firebase';
import { UsersComponent } from '../components/users/users.component';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url = 'https://talleredc-8704c-default-rtdb.firebaseio.com/users';
  db = firebase.firestore();
  

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>

  constructor(private _afs: AngularFirestore) { 
    this.users = this._afs.collection('users').valueChanges(); 
  }

  async newUser(id, name, email, phone, role): Promise<void>{
    try{
      await this.db.collection('users').doc(id).set({
        id: id,
        name: name,
        email: email,
        phone: phone,
        role: role,
      })
    }catch(err){
      console.log(err);
    }
  }

  getUsers(){
    return this.users;
  }

}
