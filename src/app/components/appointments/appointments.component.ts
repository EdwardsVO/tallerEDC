import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VehiclesCrudService } from '../../services/vehicles-crud.service';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

// ARRAYS TO STORE FIRESTORE DATA AND FETCH IT
  cars = [];
  appointments = [];

  carId: string;
  userId: string;



  constructor(private _firestore: AngularFirestore, private _vehicleSvc: VehiclesCrudService, private _authSvc: AuthService) { }

  ngOnInit(): void {

    this.getCars();

    this.getAppointments();

  }

  // FUNCTION TO GET THE CARS THAT BELONG TO THE CURRENT USER

  getCars() {

    this._firestore.collection('cars', ref => ref.where("owner", "==", localStorage.getItem('user'))).snapshotChanges().subscribe(res => {
      this.cars = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          serial: e.payload.doc.data().serial,
          brand: e.payload.doc.data().marca,
          model: e.payload.doc.data().modelo,
          year: e.payload.doc.data().year,
          plate: e.payload.doc.data().placa,
          reparation: e.payload.doc.data().needsReparation,
        }
      })
    })
  }

  // FUNCTION TO MAKE AN APPOINTMENT. SETS "needsReparation" ATTRIBUTE TO TRUE IN THE DATABASE

    makeAppointment(carId: string) {
      this._vehicleSvc.updateCarStatus(carId, true);
    }

// FUNCTION TO CANCEL AN APPOINTMENT. SETS "needsReparation" ATTRIBUTE TO FALSE IN THE DATABASE

    cancelAppointment(carId) {
      this._vehicleSvc.updateCarStatus(carId, false);
    }

// FUNCTION TO GET ALL APPOINTMENT FROM THE DATABASE

    getAppointments() {

      this.userId = localStorage.getItem('user');
      this._firestore.collection('cars', ref => ref.where("owner", "==", this.userId)).snapshotChanges().subscribe(res => {
            this.appointments = res.map((e: any) => {
              return {
                id: e.payload.doc.id,
                serial: e.payload.doc.data().serial,
                brand: e.payload.doc.data().marca,
                model: e.payload.doc.data().modelo,
                year: e.payload.doc.data().year,
                plate: e.payload.doc.data().placa,
                reparation: e.payload.doc.data().needsReparation,
                appointmentDate: e.payload.doc.data().appointmentDate,
                appointmentConfirmed: e.payload.doc.data().appointmentConfirmed,
                appointmentHour: e.payload.doc.data().appointmentHour,
              }
            })
          })
        }


      appointmentConfirmed(carId) {
        this._vehicleSvc.appointmentConfirmed(carId, true);
      }
}

