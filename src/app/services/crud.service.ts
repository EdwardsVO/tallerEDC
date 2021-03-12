import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url = 'https://talleredc-8704c-default-rtdb.firebaseio.com/users'
  users: Observable<User[]>;

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private readonly afs: AngularFirestore) { 
    this.usersCollection = afs.collection<User>('users')
  }

  onDeleteUser(userId: string): Promise<void>{
    return new Promise (async (resolve, reject) => {
      try {
        const result =  await this.usersCollection.doc(userId).delete();
        resolve(result)
      } catch (err) {
        reject(err.message)
      }
    });
  }  

  onCreateUser(user: User, userId: string): Promise<void>{
    return new Promise( async (resolve, reject) => {
      try {
        const id = userId || this.afs.createId();
        const data = {id, ...user};
        const result = this.usersCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    })
  }  

  getUser(userId: string): void{  
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as User))
    );
  }
}
