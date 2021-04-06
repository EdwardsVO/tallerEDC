import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import {map} from 'rxjs/operators';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class VehiclesCrudService {


  cars: Observable<Vehicle[]>
  vehicleDoc: AngularFirestoreDocument<Vehicle>
  carId: string;
  appointmentID: string;
  carsCollection: AngularFirestoreCollection<Vehicle>;
  lastAppointment: string = ''



  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase,
  ) {
    this.cars = this.firestore.collection('cars').snapshotChanges().pipe(map(changes => {
      return changes.map(e => {
        const data = e.payload.doc.data() as Vehicle;
        data.owner = e.payload.doc.id;
        return data;
      })
    }))

  }

  async newCar(id2, owner, ownerName, ownerEmail, serial, brand, model, year, plate, date, photo, needsReparation, appointmentConfirmed, repaired, timesRepaired, appointmentDate, appointmentHour, alertManager, disabled): Promise<void> {
    try {
      const { id } = await this.firestore.collection('cars').add({
        id2: id2,
        lastAppointment: '',
        owner: owner,
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        serial: serial,
        brand: brand,
        model: model,
        year: year,
        plate: plate,
        initDate: date,
        photo: photo,
        needsReparation: needsReparation,
        appointmentConfirmed: appointmentConfirmed,
        repaired: false,
        timesRepaired: timesRepaired,
        appointmentDate: appointmentDate,
        appointmentHour: appointmentHour,
        alertManager: alertManager,
        disabled: disabled,
        //url: url
      })

      this.carId = id
      this.getCarId2(this.carId)
    } catch (err) {
      console.log(err);
    }
  }

  getCars() {
    return this.firestore.collection("cars").snapshotChanges();
  }

  // getCarsPhotos(numberItems) {
  //   return this.db.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  getCarId2(id) {
    this.firestore.collection("cars").doc(id).update({
      id2: id
    })
  }


  updateCar(car: any, id: any) {
    return this.firestore.collection("cars").doc(id).update(car);
  }

  updateCarPhoto(id:any, photo:any){
    this.firestore.collection("cars").doc(id).update({
      photo: photo
    })
  }

  updateCarDisabledStatus(id:any, disabled:any){
    this.firestore.collection("cars").doc(id).update({
      disabled: disabled
    })
  }

  // deleteCar(car: Vehicle) {
  //   this.vehicleDoc = this.firestore.doc(`cars/${car.owner}`);
  //   this.vehicleDoc.delete();
  // }

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

  updateCarAppointmentDate(id: string, aDate) {
    this.firestore.collection('cars').doc(id).update({
      appointmentDate: aDate
    })
  }
  updateCarAppointmentHour(id: string, aHour) {
    this.firestore.collection('cars').doc(id).update({
      appointmentHour: aHour
    })
  }
  updateCarAppointmentStatus(id: string, status) {
    this.firestore.collection('cars').doc(id).update({
      appointmentConfirmed: status
    })
  }

  updateCarOwner(id:string, owner){
    this.firestore.collection('cars').doc(id).update({
      owner: owner
    })
  }
  updateCarOwnerName(id:string, owner){
    this.firestore.collection('cars').doc(id).update({
      ownerName: owner
    })
  }
  alertManager(id: string, alert) {
    this.firestore.collection('cars').doc(id).update({
      alertManager: alert
    })
  }

  async closeAppointments(id: string, aID: string, price) {
    var timesR=0;

      this.firestore.collection('cars').doc(id).get().subscribe(x=>{
      var timesRe = x.get('timesRepaired');
      if(timesRe > 0){
        timesR = timesRe;
        timesR ++;
      }
      else{
        timesR++;
      }
      
          this.firestore.collection('cars').doc(id).update({
            appointmentConfirmed: false,
            appointmentDate: '',
            appointmentHour: '',
            needsReparation: false,
            repaired: false,
            reason: '',
            timesRepaired: timesR
          })
      
          this.firestore.collection('appointments').doc(aID).update({
            totalPriceService: price,
            repaired: false,
            needsReparation: false,
          })
    });
  }

  async newAppointment(carId, appointmentDate,repaired, carBrand, carModel, carPlate, carYear, carColor, carKm, carGas,
    extraTire, keys, gato,  tools, stereo, scratches, mechName, repairs, diagnostic, procedures, repuestos, totalPriceService, reason, needsReparation, ownerEmail, ownerName, owner): Promise<void> {
    try {
        const {id} = await this.firestore.collection('appointments').add({
        carId: carId,
        appointmentDate: appointmentDate,
        appointmentID: "",
        repaired: false,
        carBrand: carBrand,
        carModel: carModel,
        carPlate: carPlate,
        carYear:carYear,
        carColor:carColor,
        carKm:carKm,
        carGas:carGas,
        extraTire: extraTire,
        keys: keys,
        tools: tools,
        gato: gato,
        scratches: scratches,
        stereo: stereo,
        mechName: mechName,
        repairs: repairs,
        diagnostic: diagnostic,
        procedures: procedures,
        repuestos: repuestos,
        totalPriceService: totalPriceService,
        reason: reason,
        needsReparation: needsReparation,
        ownerEmail: ownerEmail,
        ownerName: ownerName,
        owner: owner
      })
      this.lastAppointment = id;
      this.setLastAppointment(carId, id);
      this.firestore.collection('appointments').doc(this.lastAppointment).update({
        appointmentID: this.lastAppointment 
      })
    }
    catch(err) {
      console.log(err);
    }
  }

  setLastAppointment(carId, lastAppointment) {
    this.firestore.collection('cars').doc(carId).update({
      lastAppointment: lastAppointment,
    })
  }

  setAppointmentReason(carId, reason){
    return this.firestore.collection('cars').doc(carId).update({
      reason: reason,
    })
  }

}

