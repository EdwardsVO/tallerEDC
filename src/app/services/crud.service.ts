import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url = 'https://talleredc-8704c-default-rtdb.firebaseio.com/users';
  db = firebase.firestore();
  user: any;
  

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>

  constructor(private _afs: AngularFirestore) { 

    this.users = this._afs.collection('users').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
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

 
}