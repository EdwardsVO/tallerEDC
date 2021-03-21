import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';



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

    // this.carsCollection = firestore.collection<Vehicle>('cars');
    // this.cars = this.carsCollection.valueChanges();

    //const racesCollection: AngularFirestoreCollection<Race>;




  }

  async newCar(id2, owner, serial, marca, modelo, year, placa): Promise<void>{
    try{
      const {id} = await this.firestore.collection('cars').add({
        //await this.firestore.collection('cars').add({
          id2: id2,
          owner: owner,
          serial: serial,
          marca: marca,
          modelo: modelo,
          year: year,
          placa: placa,
        })

        this.carId = id
        this.getCarId2(this.carId)


      // this.getCarId()
      //console.log(id)
    }catch(err){
      console.log(err);
    }
  }

  getCars(){
    //return this.cars;
    return this.firestore.collection("cars").snapshotChanges();
  }

  // getCarId() {





  //   // return this.firestore.collection("cars").snapshotChanges().pipe(map(changes => {
  //   //   return changes.map(a => {
  //   //     const data = a.payload.doc.data() as Vehicle;
  //   //     data.id2 = a.payload.doc.id;
  //   //     return data;
  //   //   });
  //   // }))


  // }

  getCarId2(id){
    this.firestore.collection("cars").doc(id).update({
      id2: id
    })
    //return id;
  }

  // async updateCar(car:any){
  //   try{
  //   await this.firestore.collection('cars').doc(car.id2).update({
  //     serial: car.serial,
  //     marca: car.marca,
  //     modelo: car.modelo,
  //     year: car.year,
  //     placa: car.placa,
  //   })
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  updateCar(car:any, id: any){
    return this.firestore.collection("cars").doc(id).update(car);
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

  getUsersCars(userId) {
    const search = this.firestore.collection('cars', ref => ref.where("owner", "==", userId));
    return search;
    }


}
