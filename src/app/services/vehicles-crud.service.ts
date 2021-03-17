import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VehiclesCrudService {


  cars: Observable<Vehicle[]>

  

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
