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

  async newCar(id, owner, serial, marca, modelo, year, placa, fecha): Promise<void>{
    try{
      await this.firestore.collection('cars').doc(id).set({
        id: id,
        owner: owner,
        serial: serial,
        marca: marca,
        modelo: modelo,
        year: year,
        placa: placa,
        fecha: fecha,
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

  
  updateCar(id:any, car:any){
    return this.firestore.collection("cars").doc(id).update(car);
  }

  

  // deleteCar(car:Vehicle){
  //   this.vehicleDoc = this.firestore.doc(`cars/${car.owner}`);
  //   this.vehicleDoc.delete();
  // }

  


}
