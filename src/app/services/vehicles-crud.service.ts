import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { map } from 'rxjs/operators';


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

  async newCar(id2, owner, ownerName, ownerEmail, serial, marca, modelo, year, placa, fecha, needsReparation, appointmentConfirmed, repaired, appointmentDate, appointmentHour, alertManager): Promise<void> {
    try {
      const { id } = await this.firestore.collection('cars').add({
        id2: id2,
        owner: owner,
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        serial: serial,
        brand: marca,
        model: modelo,
        year: year,
        plate: placa,
        initDate: fecha,
        needsReparation: needsReparation,
        appointmentConfirmed: appointmentConfirmed,
        repaired: repaired,
        appointmentDate: appointmentDate,
        appointmentHour: appointmentHour,
        alertManager: alertManager,
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

  getSerial(serial) {

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

  updateCar(car: any, id: any) {
    return this.firestore.collection("cars").doc(id).update(car);
  }

  deleteCar(car: Vehicle) {
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

  async newAppointment(mechName,carYear, carBrand, carModel, carPlate, initConditions, repairs, totalPriceService): Promise<void> {
    try {
      await this.firestore.collection('appointments').add({
        mechName: mechName,
        carYear: carYear,
        carBrand: carBrand,
        carModel: carModel,
        carPlate: carPlate,
        initConditions: initConditions,
        repairs: repairs,
        totalPriceService: totalPriceService,
      })
    }
    catch {

    }
  }
}

