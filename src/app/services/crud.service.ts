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

  async newUser(id, name, email, phone, role, date): Promise<void>{
    try{
      await this.db.collection('users').doc(id).set({
        id: id,
        name: name,
        email: email,
        phone: phone,
        role: role,
        date: date
      })
      this.updateCarsRepaired(id,0);
      this.updateMoneySpent(id,0);
    }catch(err){
      console.log(err);
    }
  }

  async updateCarsRepaired(id, carsR){
    await this.db.collection('users').doc(id).update({
      carsRepaired: carsR
    })
  }

  async updateMoneySpent(id, cR){
    await this.db.collection('users').doc(id).update({
      carsRepaired: cR
    })
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

  setProfilePic(userId, url) {
    this._afs.collection('users').doc(userId).update({
      photo: url
    })
  }

    totalMoneySpent(id, money){
    var cont = firebase.firestore.FieldValue.increment(money);
    console.log(cont);
    try{
        this._afs.collection('users').doc(id).update({
        moneySpent: cont
      })
    } catch(err) {
      console.log(err);
    }
  }
} 

