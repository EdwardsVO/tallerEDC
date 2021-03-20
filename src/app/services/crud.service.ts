import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url = 'https://talleredc-8704c-default-rtdb.firebaseio.com/users';
  db = firebase.firestore();


  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>
  userDoc: AngularFirestoreDocument<User>;

  constructor(private _afs: AngularFirestore) {

    this.usersCollection = this._afs.collection('users');

    this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
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

  getUsers(){
    return this.users;
  }

  async updateUserProfile(id, name, email, phone,gender,age){
    try{
    await this.db.collection('users').doc(id).update({
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      age: age
    })
    } catch(err) {
      console.log(err);
    }
  }

  async saveUserRole(userID){
    try{
      await this._afs.collection('users').doc(userID).snapshotChanges().subscribe(x =>{
        localStorage.setItem('role', x.payload.get('role'));
      }) 
    } 
    catch(err){
      console.log(err);
      localStorage.removeItem('role');
    }
  }

} 

