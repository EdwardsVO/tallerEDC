import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import {map} from 'rxjs/operators';
import firebase from 'firebase';



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

  async newCar(id2, owner, ownerName, ownerEmail, serial, brand, model, year, placa, date, photo, needsReparation, appointmentConfirmed, repaired, appointmentDate, appointmentHour, alertManager, disabled): Promise<void> {
    try {
      const { id } = await this.firestore.collection('cars').add({
        id2: id2,
        owner: owner,
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        serial: serial,
        brand: brand,
        model: model,
        year: year,
        plate: placa,
        initDate: date,
        photo: photo,
        needsReparation: needsReparation,
        appointmentConfirmed: appointmentConfirmed,
        repaired: repaired,
        appointmentDate: appointmentDate,
        appointmentHour: appointmentHour,
        alertManager: alertManager,
        disabled: disabled
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

  alertManager(id: string, alert) {
    this.firestore.collection('cars').doc(id).update({
      alertManager: alert
    })
  }

  closeAppointments(id: string, appointmentConfirmed, appointmentDate, appointmentHour, needsReparation) {
    this.firestore.collection('cars').doc(id).update({
      appointmentConfirmed: appointmentConfirmed,
      appointmentDate: appointmentDate,
      appointmentHour: appointmentHour,
      needsReparation: needsReparation
    })
  }

}
