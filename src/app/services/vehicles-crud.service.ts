import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class VehiclesCrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getCars(){
    return this.firestore.collection("cars").snapshotChanges();

  }

  createCar(car:any){
    return this.firestore.collection("cars").add(car);

  }

  updateCar(id:any, car:any){
    return this.firestore.collection("cars").doc(id).update(car);
  }

  deleteCar(id:any){
    return this.firestore.collection("cars").doc(id).delete();

  }

  
}
