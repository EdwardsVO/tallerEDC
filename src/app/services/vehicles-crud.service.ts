import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VehiclesCrudService {


  cars: Observable<Vehicle[]>
  //vehicle: Observable<Vehicle[]>
  vehicleDoc: AngularFirestoreDocument<Vehicle>



  constructor(
    private firestore: AngularFirestore
  ) { 
    this.cars = this.firestore.collection('cars').snapshotChanges().pipe(map(changes => {
      return changes.map(e => {
        const data = e.payload.doc.data() as Vehicle;
        data.owner = e.payload.doc.id;
        return data;
      })
    }))

  }

  async newCar(owner, serial, marca, modelo, year, placa): Promise<void>{
    try{
      await this.firestore.collection('cars').add({
        owner: owner,
        serial: serial,
        marca: marca,
        modelo: modelo,
        year: year,
        placa: placa
      })
    }catch(err){
      console.log(err);
    }
  }

  getCars(){
    //return this.firestore.collection("cars").snapshotChanges();
    return this.cars;
    // this.vehicleDoc = this.firestore.doc(`cars/${car.owner}`);
    // this.vehicleDoc.get();

  }

  // updateCar(id:any, car:Vehicle){
  //   this.vehicleDoc = this.firestore.doc(`cars/${car.owner}`);
  //   return this.vehicleDoc.update(car);
  //   //return this.firestore.collection("cars").doc(car).update(id);
  // }
  // updateCar(id:any, car:any){
  //   return this.firestore.collection("cars").doc(id).update(car);
  // }

  // deleteCar(id){
  //   return this.firestore.collection("cars").doc(id).delete();

  // }

  deleteCar(car:Vehicle){
    this.vehicleDoc = this.firestore.doc(`cars/${car.owner}`);
    this.vehicleDoc.delete();
  }


}
