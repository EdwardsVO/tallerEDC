import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VehiclesCrudService {


  cars: Observable<Vehicle[]>
  vehicleDoc: AngularFirestoreDocument<Vehicle>
  carId: string;
  carsCollection: AngularFirestoreCollection<Vehicle>;



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

  async newCar(id2, owner, serial, marca, modelo, year, placa, fecha, needsReparation, appointmentConfirmed, repaired): Promise<void>{
    try{
      const {id} = await this.firestore.collection('cars').add({
          id2: id2,
          owner: owner,
          serial: serial,
          marca: marca,
          modelo: modelo,
          year: year,
          placa: placa,
          fecha: fecha,
          needsReparation: needsReparation,
          appointmentConfirmed: appointmentConfirmed,
          repaired: repaired
        })

        this.carId = id
        this.getCarId2(this.carId)
    }catch(err){
      console.log(err);
    }
  }

  getCars(){
    return this.firestore.collection("cars").snapshotChanges();
  }

  getCarId2(id){
    this.firestore.collection("cars").doc(id).update({
      id2: id
    })
  }

  getSerial(serial){

    this.firestore.collection("cars", ref => ref.where("serial", "==", serial))
    .get()
    .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
              //console.log("Document data:", doc.data());
              return true
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }

        });
    })


  }

  updateCar(car:any, id: any){
    return this.firestore.collection("cars").doc(id).update(car);
  }

  deleteCar(car:Vehicle){
    this.vehicleDoc = this.firestore.doc(`cars/${car.owner}`);
    this.vehicleDoc.delete();
  }

  getUsersCars(userId) {
    return this.firestore.collection('cars', ref => ref.where("owner", "==", userId));
    }

    updateCarStatus(id: string, needsReparation) {
      this.firestore.collection('cars').doc(id).update({
        needsReparation: needsReparation
      })
    }

    appointmentConfirmed(id: string, appointmentConfirmed) {
      this.firestore.collection('cars').doc(id).update({
        appointmentConfirmed: appointmentConfirmed
      })
    }
}
